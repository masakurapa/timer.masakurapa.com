<h2>Setting</h2>
<div class="repeat-wrapper">
    <div class="header">Repeat Count</div>
    <div>
        <input
            type="number"
            class="input-number"
            bind:value={$repeat}
            min="{NUMBER_MIN}"
            max="{REPEAT_MAX}"
            disabled={isTimerStarted}
            on:change={(e) => onChangeRepeat(e.target.value)}
        >
    </div>
</div>

<div class="timer-wrapper header">
    <div class="text-wrapper">Title</div>
    <div class="number-wrapper">Hour</div>
    <div class="number-wrapper">Min</div>
    <div class="number-wrapper">Sec</div>
</div>

{#each $timerSettings as obj, i}
    <div class="timer-wrapper">
        <div class="text-wrapper">
            <input
                type="text"
                class="input-text"
                bind:value={obj.title}
                disabled={isTimerStarted}
            >
        </div>
        <div class="number-wrapper">
            <input
                type="number"
                class="input-number"
                bind:value={obj.hour}
                min="{NUMBER_MIN}"
                max="{HOUR_MAX}"
                disabled={isTimerStarted}
                on:change={(e) => onChangeHour(e.target.value, i)}
            >&nbsp;:&nbsp;
        </div>
        <div class="number-wrapper">
            <input
                type="number"
                class="input-number"
                bind:value={obj.minute}
                min="{NUMBER_MIN}"
                max="{MINUTE_MAX}"
                disabled={isTimerStarted}
                on:change={(e) => onChangeMinute(e.target.value, i)}
            >&nbsp;:&nbsp;
        </div>
        <div class="number-wrapper">
            <input
                type="number"
                class="input-number"
                bind:value={obj.second}
                min="{NUMBER_MIN}"
                max="{SECOND_MAX}"
                disabled={isTimerStarted}
                on:change={(e) => onChangeSecond(e.target.value, i)}
            >
        </div>

        <button
            class="add-above-btn"
            disabled={isTimerStarted}
            on:click="{() => addAbove(i)}"
        ><i class="fas fa-plus-circle"></i> <i class="fas fa-arrow-up"></i></button>
        <button
            class="add-below-btn"
            disabled={isTimerStarted}
            on:click="{() => addBelow(i)}"
        ><i class="fas fa-plus-circle"></i> <i class="fas fa-arrow-down"></i></button>
        <button
            class="remove-btn"
            disabled={isTimerStarted || $timerSettings.length === 1}
            on:click="{() => remove(i)}"
        ><i class="fas fa-minus-circle"></i></button>
    </div>
{/each}

<script>
    import { onMount } from 'svelte';
    import { repeat, timerSettings } from './store.js';

    export let isTimerStarted = false;

    // 数値エリアの最小値（今は全部同じだから共通にしておく
    const NUMBER_MIN = 0;
    // 繰り返し回数の最大値
    const REPEAT_MAX = 100;
    // タイマー(時)の最大値
    const HOUR_MAX = 24;
    // タイマー(分)の最大値
    const MINUTE_MAX = 59;
    // タイマー(秒)の最大値
    const SECOND_MAX = 59;

    // タイマーの設定オブジェクト
    const timerObj = {
        title: '',
        time: 0,
        hour: 0,
        minute: 0,
        second: 0,
    };

    // マウント時にデフォルト値として一個の空タイマーをセット
    onMount(() => {
        timerSettings.set([Object.assign({}, timerObj)]);
    });

    // 繰り返し回数のonChangeイベント
    const onChangeRepeat = (val) => {
        if (val.length === 0) {
            repeat.set(NUMBER_MIN);
            return;
        }
        const nval = parseInt(val, 10);
        if (val < NUMBER_MIN) {
            repeat.set(NUMBER_MIN);
        } else if (val > HOUR_MAX) {
            repeat.set(REPEAT_MAX);
        } else {
            repeat.set(val);
        }
    };

    // タイマー(時)のonChangeイベント
    const onChangeHour = (val, index) => {
        setTime(val, index, 'hour', NUMBER_MIN, HOUR_MAX);
    };

    // タイマー(分)のonChangeイベント
    const onChangeMinute = (val, index) => {
        setTime(val, index, 'minute', NUMBER_MIN, MINUTE_MAX);
    };

    // タイマー(秒)のonChangeイベント
    const onChangeSecond = (val, index) => {
        setTime(val, index, 'second', NUMBER_MIN, SECOND_MAX);
    };

    // タイマーを設定
    const setTime = (val, index, key, min, max) => {
        if (typeof val === 'string' && val.length === 0) {
            $timerSettings[index][key] = min;
            return;
        }
        const nval = parseInt(val, 10);
        if (val < min) {
            $timerSettings[index][key] = min;
        } else if (val > max) {
            $timerSettings[index][key] = max;
        } else {
            $timerSettings[index][key] = val;
        }
    }

    // 上に追加
    const addAbove = (i) => {
        timerSettings.update(settings => {
            settings.splice(i, 0, Object.assign({}, timerObj));
            return settings;
        });
    };

    // 下に追加
    const addBelow = (i) => {
        timerSettings.update(settings => {
            settings.splice(i + 1, 0, Object.assign({}, timerObj));
            return settings;
        });
    };

    // 指定行のタイマー設定を削除
    const remove = (i) => {
        timerSettings.update(settings => {
            settings.splice(i, 1);
            return settings;
        });
    };
</script>

<style>
    /* 全体のレイアウト */
    .repeat-wrapper {
        margin-bottom: 20px;
    }
    .timer-wrapper {
        display: flex;
    }
    .header {
        font-weight: bold;
        margin-bottom: 8px;
    }
    .text-wrapper {
        width: 300px;
        margin-right: 16px;
    }
    .number-wrapper {
        width: 70px;
    }

    /* 入力フォーム系 */
    input {
        padding: 8px;
        height: 40px;
        border-radius: 8px;
    }
    input:focus {
        outline: none;
    }

    .input-text {
        width: 100%;
    }
    .input-number {
        text-align: center;
    }

    /* ボタン系 */
    button {
        padding: 8px;
        height: 40px;
        border-radius: 8px;
        background-color: #FFFFFF;
        border: none;
        outline: none;
    }
    button:forcus {
        background-color: #FFFFFF;
    }
    button:disabled {
        color: #999999;
    }
    button:not(:disabled):active {
        background-color: #FFFFFF;
    }

    .add-above-btn {
        margin-right: 8px;
        color: #1E90FF;
    }
    .add-below-btn {
        margin-right: 8px;
        color: #1E90FF;
    }
    .remove-btn {
        color: #DC143C;
    }
</style>
