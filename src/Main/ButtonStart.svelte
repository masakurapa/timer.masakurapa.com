<button
    on:click="{start}"
    disabled="{$isTimerStarting}"
>START</button>


<script>
    import { timerIndex, repeatCount, isTimeUp, interval } from './store.js';
    import { repeat, timerSettings, isTimerStarting, isWindowFocus } from '../store.js';

    let focus = true;
    isWindowFocus.subscribe(flag => {
        focus = flag;
    });

    // タイマーの開始
    const start = () => {
        isTimeUp.set(false);
        isTimerStarting.set(true);

        interval.set(setInterval(() => {
            const index = $timerIndex;
            const t = $timerSettings[index];

            $timerSettings[index].time = t.time + 1;

            const baseTime = (t.hour * 60 * 60) + (t.minute * 60) + t.second;
            if (t.time + 1 > baseTime) {
                isTimeUp.set(true);

                // タイマーのウィンドウにフォーカスがないときだけ通知
                if (!focus) {
                    Notification.requestPermission().then(() => new Notification('Time is up!!'));
                }
                next();
            }
        }, 1000));
    };

    // 次のタイマーに行くための処理
    const next = () => {
        clearInterval($interval);
        isTimerStarting.set(false);

        const index = $timerIndex;

        // 一周したらループ数をカウントアップ
        if (index + 1 === $timerSettings.length) {
            if (parseInt($repeatCount, 10) === parseInt($repeat, 10)) {
                return;
            }
            repeatCount.update(count => count + 1);
        }

        // 次のタイマー設定に移動する
        // 自分のカウントアップ値はとりあえずクリア
        $timerSettings[index].time = 0;
        // タイマー設定の位置をずらす
        timerIndex.update(i => {
            return i + 1 === $timerSettings.length ? 0 : i + 1;
        });
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
    }
    button:disabled {
        background-color: #999999;
    }
    button:forcus {
        background-color: #1872CC;
    }
    button:hover {
        background-color: #1872CC;
    }
    button:not(:disabled):active {
        background-color: #1872CC;
    }

    @media screen and (max-width: 480px) {
        button {
            width: 150px;
            height: 40px;
        }
    }
</style>
