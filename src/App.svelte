<script>
    // タイマーの設定オブジェクト
    const timerObj = {
        title: '',
        time: 0,
        hour: 0,
        minute: 0,
        second: 0,
    };

    // ループさせるタイマーのリスト
    // デフォルトはは一個の空タイマーをセット
    let timers = [Object.assign({}, timerObj)];
    // setInterval/clearIntervalするためのオブジェクトの保持
    let interval;
    // 設定を繰り返す数
    let repeat = 0;
    // 繰り返した数
    let repeatCount = 0;
    // タイマー設定の位置
    let index = 0;
    // タイマーの表示用テキスト
    let timerText = '00:00:00';
    // タイマー開始／停止のフラグ
    let isTimerStarted = false;

    // reactive
    $: {
        const t = timers[index];
        const baseTime = (t.hour * 60 * 60) + (t.minute * 60) + t.second - t.time;
        const h = Math.floor((baseTime) / (60 * 60));
        const m = Math.floor((baseTime - (h * 60 * 60)) / 60);
        const s = (baseTime - (h * 60 * 60) - (m * 60));
        timerText = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // タイマーの開始
    const start = () => {
        isTimerStarted = true;
        interval = setInterval(() => {
            const t = timers[index];
            const baseTime = (t.hour * 60 * 60) + (t.minute * 60) + t.second;

            if (t.time + 1 > baseTime) {
                next();
                return;
            }

            timers[index].time = t.time + 1;
        }, 1000);
    }

    // 次のタイマーに行くための処理
    const next = () => {
        // 一周したらループ数をカウントアップ
        if (index + 1 === timers.length) {
            // ただしループの上限に達してたらタイマーは止めて次のステップに進まない
            if (repeatCount === repeat) {
                stop();
                return;
            }

            repeatCount = repeatCount + 1;
        }

        // 次のタイマー設定に移動する
        // 自分のカウントアップ値はとりあえずクリア
        timers[index].time = 0;
        // タイマー設定の位置をずらす
        index = index + 1 === timers.length ? 0 : index + 1;
    }

    // タイマーの一時停止
    const stop = () => {
        clearInterval(interval)
        isTimerStarted = false;
    };

    // タイマーをクリア
    const clear = () => {
        stop();
        repeatCount = 0;
        index = 0;
        timers.forEach(t => {
            t.time = 0;
        });
        timers = timers;
    }

    // 上に追加
    const addAbove = (i) => {
        timers.splice(i, 0, Object.assign({}, timerObj))
        timers = timers;
    };

    // 下に追加
    const addBelow = (i) => {
        timers.splice(i + 1, 0, Object.assign({}, timerObj))
        timers = timers;
    };

    // 指定行のタイマー設定を削除
    const remove = (i) => {
        timers.splice(i, 1)
        timers = timers;
    };
</script>

<main>
    <div>Repeat: {repeatCount}</div>
    <div class="title">{timers[index].title}</div>
    <div class="timer">{timerText}</div>

    {#if !isTimerStarted}
        <button on:click="{start}">start</button>
    {:else}
        <button on:click="{stop}">stop</button>
    {/if}
    <button on:click="{clear}" disabled={isTimerStarted}>clear</button>

    <hr>
    <h2>Setting</h2>
    <div>
        Repeat Count: <input type="number" max="23" min="0" disabled={isTimerStarted} bind:value={repeat}>
    </div>

    <div class="setting">
        <div class="head input-text">Title</div>
        <div class="head input-number">Hour</div>
        <div class="head input-number">Minute</div>
        <div class="head input-number">Second</div>
    </div>

    {#each timers as obj, i}
        <div class="setting">
            <div class="input-text">
                <input type="text" disabled={isTimerStarted} bind:value={obj.title}>
            </div>
            <div class="input-number">
                <input type="number" max="99" min="0" disabled={isTimerStarted} bind:value={obj.hour}>&nbsp;:&nbsp;
            </div>
            <div class="input-number">
                <input type="number" max="59" min="0" disabled={isTimerStarted} bind:value={obj.minute}>&nbsp;:&nbsp;
            </div>
            <div class="input-number">
                <input type="number" max="59" min="0" disabled={isTimerStarted} bind:value={obj.second}>
            </div>

            <button disabled={isTimerStarted} on:click="{() => addAbove(i)}">add above↑</button>
            <button disabled={isTimerStarted} on:click="{() => addBelow(i)}">add below↓</button>
            <button
                on:click="{() => remove(i)}"
                disabled={isTimerStarted || timers.length === 1}
            >remove</button>
        </div>
    {/each}
</main>

<style>
    main {
        padding: 1em;
        width: 100%;
    }

    .title {
        font-size: 30px;
    }
    .timer {
        font-size: 100px;
    }

    .setting {
        display: flex;
    }
    .head {
        font-weight: bold;
    }
    .input-text {
        width: 200px;
    }
    .input-number {
        width: 80px;
    }
</style>
