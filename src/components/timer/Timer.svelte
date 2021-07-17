<div class="wrapper">
    <div class="phase-title">
        {#if hasCurrentSetting}
            {getTitle($timerSettings[$currentTimerPosition].title, $currentTimerPosition)}
        {/if}
    </div>

    <div class="timer">
        {padding(totalTime.hour)}:{padding(totalTime.minute)}:{padding(totalTime.second)}
    </div>

    <div class="next-phase">
        {#if hasNextSetting}
            <div>Next:</div>
            <div>({padding(nextSetting.timer.hour)}:{padding(nextSetting.timer.minute)}:{padding(nextSetting.timer.second)})</div>
            {getTitle(nextSetting.title, $currentTimerPosition + 1)}
        {/if}
    </div>
</div>

<script lang="ts">
    import type { Timer } from '../../types/local_timer';
    import { timerSettings } from '../../store/setting';
    import {
        isTimerRunning,
        isTimeUp,
        isTimeUpAll,
        currentTimerPosition,
        timerSecondsRemaining,
    } from '../../store/timer';
    import {
        padding,
        calcTotalSeconds,
        totalSecondsToTimer,
    } from '../../util';

    // タイマーの表示内容
    let totalTime: Timer = { hour: 0, minute: 0, second: 0 };

    // タイマーのカウントダウンに必要な変数
    let interval: NodeJS.Timeout;
    let switching = false;

    // タイマーの開始
    const start = (): void => {
        isTimeUp.set(false);

        interval = setInterval((): void => {
            // タイマーの設定移行処理
            // 移行時に1秒スリープを入れるため一度戻す
            if (switching) {
                switching = false;
                return;
            }

            const index = $currentTimerPosition;

            // 1つのタイマーが終わったことを検知したら
            // タイマー設定の位置をずらして次のタイマーに移動する
            if ($isTimeUp) {
                isTimeUp.set(false);
                // 時間切れの場合の処理で、次のタイマー設定があることは保証されている
                currentTimerPosition.set(index + 1);
                return;
            }

            // 最小値が0になるようにデクリメント
            timerSecondsRemaining.update(sec => {
                return sec - 1 < 0 ? 0 : sec - 1;
            });
            if ($timerSecondsRemaining > 0) {
                return;
            }

            // ここから時間切れの場合の処理

            // 次のタイマー設定が無い場合はタイマーを止めて終わり
            if (index + 1 === $timerSettings.length) {
                clearInterval(interval);
                isTimeUpAll.set(true);
                return;
            }

            // 次のタイマー設定がある場合は
            // タイマーの設定移行処理のためにフラグをたてる
            switching = true;
            isTimeUp.set(true);
        }, 1000);
    };

    // タイマーの停止
    const stop = (): void => {
        clearInterval(interval);
    };

    // タイトルを返します
    const getTitle = (title: string, pos: number): string => {
        return title !== '' ? title: `#Phase ${pos + 1}`;
    };

    // タイマー設定が更新されたら現在位置の設定秒数を計算用の変数に詰め直す
    timerSettings.subscribe(settings => {
        // 現在行が設定に見つからなければ先頭に戻してしまう
        // currentTimerPositionのsubscribeが処理を拾うので、処理の重複を避けるために現在位置だけ変える
        if (typeof settings[$currentTimerPosition] === 'undefined') {
            currentTimerPosition.set(0);
            return;
        }
        timerSecondsRemaining.set(calcTotalSeconds(settings[$currentTimerPosition].timer));
        totalTime = settings[$currentTimerPosition].timer;
    });

    // タイマー設定位置が更新されたら、更新後の設定位置の設定秒数を計算用の変数に詰め直す
    currentTimerPosition.subscribe(pos => {
        // 現在行が設定に見つからなければ合計秒数をリセットして終わり
        if (typeof $timerSettings[pos] === 'undefined') {
            totalTime = { hour: 0, minute: 0, second: 0 };
            timerSecondsRemaining.set(0);
            return;
        }
        timerSecondsRemaining.set(calcTotalSeconds($timerSettings[pos].timer));
        totalTime = $timerSettings[pos].timer;
    });

    // タイマーの残り秒数が更新されたら、合計時間を再計算し直す
    timerSecondsRemaining.subscribe(sec => {
        totalTime = totalSecondsToTimer(sec);
    });

    // タイマーが開始されたことを検知してカウントダウンを開始する
    isTimerRunning.subscribe(flag => {
        if (flag === false) {
            stop();
            return;
        }
        start();
    })

    // 現在の位置に設定情報がある場合にtrueを返します
    $: hasCurrentSetting = typeof $timerSettings[$currentTimerPosition] !== 'undefined';
    // 次の位置に設定情報がある場合にtrueを返します
    $: hasNextSetting = typeof $timerSettings[$currentTimerPosition + 1] !== 'undefined';
    // 次の位置の設定情報
    $: nextSetting = $timerSettings[$currentTimerPosition + 1];
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
    }

    .phase-title {
        font-size: 40px;
        min-height: 60px;
        word-wrap: break-word;
    }

    .timer {
        font-size: 120px;
    }

    .next-phase {
        min-height: 32px;
        font-size: 20px;
        padding-left: 20px;
        word-wrap: break-word;
        display: flex;
        align-items: center;
    }

    .next-phase > div {
        margin-right: 12px;
    }

    @media screen and (max-width: 550px) {
        .phase-title {
            font-size: 28px;
        }
        .timer {
            font-size: 80px;
        }
        .next-phase {
            font-size: 16px;
        }
    }
</style>
