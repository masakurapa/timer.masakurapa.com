<main>
    <div>Repeat: {repeatCount}</div>
    <div class="title">{$timerSettings[index] !== undefined ? $timerSettings[index].title : ''}</div>
    <div class="timer">{timerText}</div>

    {#if isPlayAudio}
        <button
            class="start-btn"
            on:click="{pauseAudio}"
        >STOP SOUND</button>
    {:else if !isTimerStarted}
        <button
            class="start-btn"
            on:click="{start}"
        >START</button>
    {:else}
        <button
            class="stop-btn"
            on:click="{stop}"
        >STOP</button>
    {/if}
    <button
        class="reset-btn"
        on:click="{reset}"
        disabled={isTimerStarted}
    >RESET</button>

    <hr>
    <Setting {isTimerStarted}/>
</main>

<audio src="/warning1.mp3" loop bind:this={audio}></audio>

<script>
    import { onMount } from 'svelte';
    import { repeat, timerSettings } from './store.js';
    import Setting from './Setting.svelte';

    // setInterval/clearIntervalするためのオブジェクトの保持
    let interval;
    // 繰り返した数
    let repeatCount = 0;
    // タイマー設定の位置
    let index = 0;
    // タイマーの表示用テキスト
    let timerText = '00:00:00';
    // タイマー開始／停止のフラグ
    let isTimerStarted = false;
    // オーディオの実行中か
    let isPlayAudio = false;
    // ウィンドウにフォーカスがあるかのフラグ
    let focused = true;
    // オーディオ
    let audio;

    // reactive
    $: {
        const t = $timerSettings[index];
        if (t !== undefined) {
            const baseTime = (t.hour * 60 * 60) + (t.minute * 60) + t.second - t.time;
            const h = Math.floor((baseTime) / (60 * 60));
            const m = Math.floor((baseTime - (h * 60 * 60)) / 60);
            const s = (baseTime - (h * 60 * 60) - (m * 60));
            timerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
    }


    window.onfocus = function() {
        focused = true;
    };
    window.onblur = function() {
        focused = false;
    };

    onMount(() => {
        // 通知の許可を求める
        if ('Notification' in window) {
            const permission = Notification.permission;
            if (permission === "denied" || permission === "granted") {
               return;
            }
            Notification.requestPermission();
        }
    });

    // タイマーの開始
    const start = () => {
        pauseAudio();
        isTimerStarted = true;
        interval = setInterval(() => {
            const t = $timerSettings[index];
            const baseTime = (t.hour * 60 * 60) + (t.minute * 60) + t.second;

            if (t.time + 1 > baseTime) {
                // 終了音を流す
                audio.play();
                isPlayAudio = true;

                // タイマーのウィンドウにフォーカスがないときだけ通知
                if (!focused) {
                    Notification.requestPermission().then(() => new Notification('Time is up!!'));
                }
                next();
                return;
            }

            $timerSettings[index].time = t.time + 1;
        }, 1000);
    }

    // 次のタイマーに行くための処理
    const next = () => {
        stop();

        // 一周したらループ数をカウントアップ
        if (index + 1 === $timerSettings.length) {
            // ただしループの上限に達してたらタイマーは止めて次のステップに進まない
            if (repeatCount === parseInt($repeat, 10)) {
                clear();
                return;
            }

            repeatCount = repeatCount + 1;
        }

        // 次のタイマー設定に移動する
        // 自分のカウントアップ値はとりあえずクリア
        $timerSettings[index].time = 0;
        // タイマー設定の位置をずらす
        index = index + 1 === $timerSettings.length ? 0 : index + 1;
    }

    // タイマーの一時停止
    const stop = () => {
        clearInterval(interval)
        isTimerStarted = false;
    };

    // リセット
    const reset = () => {
        pauseAudio();
        clear();
    };

    // タイマーをクリア
    const clear = () => {
        stop();
        repeatCount = 0;
        index = 0;
        timerSettings.update(settings => {
            settings.forEach(t => {
                t.time = 0;
            });
            return settings;
        });
    }

    // 音を止める
    const pauseAudio = () => {
        audio.pause();
        audio.currentTime = 0;
        isPlayAudio = false;
    };
</script>

<style>
    main {
        padding: 16px 16px 52px 16px;

    }

    .title {
        font-size: 30px;
    }
    .timer {
        font-size: 120px;
    }

    /* ボタン系 */
    button {
        padding: 8px;
        height: 40px;
        border-radius: 8px;
        border: none;
        outline: none;
        color: #FFFFFF;
    }
    button:disabled {
        background-color: #999999;
    }

    .start-btn {
        width: 200px;
        height: 50px;
        margin-right: 16px;
        background-color: #1E90FF;
    }
    .start-btn:forcus {
        background-color: #1872CC;
    }
    .start-btn:hover {
        background-color: #1872CC;
    }
    .start-btn:not(:disabled):active {
        background-color: #1872CC;
    }

    .stop-btn {
        width: 200px;
        height: 50px;
        margin-right: 16px;
        background-color: #DC143C;
    }
    .stop-btn:forcus {
        background-color: #CC1237;
    }
    .stop-btn:hover {
        background-color: #CC1237;
    }
    .stop-btn:not(:disabled):active {
        background-color: #CC1237;
    }

    .reset-btn {
        width: 100px;
        height: 50px;
        background-color: #FFB833;
    }
    .reset-btn:forcus {
        background-color: #FFA500;
    }
    .reset-btn:not(:disabled):hover {
        background-color: #FFA500;
    }
    .reset-btn:not(:disabled):active {
        margin-right: 8px;
        background-color: #FFA500;
    }
</style>
