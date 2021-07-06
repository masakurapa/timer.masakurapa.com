<div class="wrapper">
    <div class="phase-title">Phase Title</div>

    <div class="timer">
        {padding(totalTime.hour)}:{padding(totalTime.minute)}:{padding(totalTime.second)}
    </div>

    <div class="next-phase">
        {#if hasNextSetting}
            <div>Next:</div>
            <div>(00:00:00)</div>
            <div>Next Phase Title</div>
        {/if}
    </div>
</div>

<script lang="ts">
    import type { Timer } from '../../types/local_timer';
    import { timerSettings } from '../../store/setting';
    import {
        isTimerRunning,
        currentTimerPosition,
        timerSecondsRemaining,
    } from '../../store/state';
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
    let timeUp = false;
    let finished = false;

    // タイマーの開始
    const start = (): void => {
        timeUp = false;

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
            if (timeUp) {
                timeUp = false;
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
                finished = true;
                return;
            }

            // 次のタイマー設定がある場合は
            // タイマーの設定移行処理のためにフラグをたてる
            switching = true;
            timeUp = true;
        }, 1000);
    };

    // タイマーの停止
    const stop = (): void => {
        clearInterval(interval);
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

    // 次の位置に設定情報がある場合にtrueを返します
    $: hasNextSetting = typeof $timerSettings[$currentTimerPosition + 1] !== 'undefined';
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
    }

    .phase-title {
        font-size: 40px;
        word-wrap: break-word;
    }

    .timer {
        font-size: 120px;
    }

    .next-phase {
        height: 32px;
        font-size: 20px;
        padding-left: 20px;
        word-wrap: break-word;
        display: flex;
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
