<button
    on:click="{start}"
    {disabled}
>START</button>

<script lang="ts">
    import {
        timerSettings,
        isTimerStarting,
        isWindowFocus,
        timerIndex,
        isTimeUp,
        isTimeUpAll,
        isFinish,
        interval,
    } from '../../../store';
    import { calcTotalSec } from '../../../util';

    $: disabled = $isTimerStarting || $isFinish;

    // ここから先のsubscribeはsetInterval()のスコープで使いたい変数たち
    let focus = true;
    isWindowFocus.subscribe(flag => focus = flag);

    let timeUp = false;
    isTimeUp.subscribe(flag => timeUp = flag);

    let intervalNum: number;
    interval.subscribe(num => intervalNum = num);

    let index = 0;
    timerIndex.subscribe(i => index = i);

    // タイマーの開始
    const start = (): void => {
        isTimeUp.set(false);
        isTimerStarting.set(true);

        interval.set(setInterval((): number => {
            const t = $timerSettings[index];

            // 1つのタイマーが終わったことを検知
            if (timeUp) {
                isTimeUp.set(false);

                // カウントダウン用の値は元に戻しておく
                $timerSettings[index].time = calcTotalSec(t.hour, t.minute, t.second);

                // タイマー設定の位置をずらして次のタイマーに移動する
                timerIndex.update(i => {
                    return i + 1 === $timerSettings.length ? 0 : i + 1;
                });
                return;
            }

            // 最小値が0になるようにデクリメント
            const time = t.time - 1 < 0 ? 0 : t.time - 1;
            $timerSettings[index].time = time;

            if (time > 0) {
                return;
            }

            // 時間切れの処理
            // タイマーのウィンドウにフォーカスがないときだけ通知
            if (!focus) {
                Notification.requestPermission().then(() => new Notification('Time is up!!'));
            }

            if (index + 1 === $timerSettings.length) {
                clearInterval(intervalNum);
                isTimerStarting.set(false);
                isTimeUpAll.set(true);
                isFinish.set(true);
                return;
            }

            isTimeUp.set(true);
        }, 1000));
    };
</script>

<style>
    button {
        padding: 8px;
        border: none;
        outline: none;
        color: #FFFFFF;
        width: 200px;
        height: 50px;
        background-color: #1E90FF;
        cursor: pointer;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }
    button:forcus {
        background-color: #1872CC;
    }
    button:not(:disabled):hover {
        background-color: #1872CC;
    }
    button:not(:disabled):active {
        background-color: #1872CC;
    }

    @media screen and (max-width: 480px) {
        button {
            width: 150px;
        }
    }
</style>
