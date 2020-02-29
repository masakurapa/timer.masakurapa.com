<div class="wrapper header">
    <div class="text-wrapper">Title</div>
    <div class="number-wrapper">Hour</div>
    <div class="number-wrapper">Min</div>
    <div class="number-wrapper">Sec</div>
</div>

{#each $timerSettings as obj, i}
    <div class="wrapper">
        <div class="text-wrapper">
            <Title
                value={$timerSettings[i].title}
                on:change={e => onChangeTitle(e, i)}
            />
        </div>
        <div class="number-wrapper">
            <Hour
                value={$timerSettings[i].hour}
                on:change={e => onChangeHour(e, i)}
            />&nbsp;:&nbsp;
        </div>
        <div class="number-wrapper">
            <Minute
                value={$timerSettings[i].minute}
                on:change={e => onChangeMinute(e, i)}
            />&nbsp;:&nbsp;
        </div>
        <div class="number-wrapper">
            <Second
                value={$timerSettings[i].second}
                on:change={e => onChangeSecond(e, i)}
            />
        </div>

        <button
            class="add-above-btn"
            disabled={$isTimerStarting}
            on:click="{() => addAbove(i)}"
        ><i class="fas fa-plus-circle"></i> <i class="fas fa-arrow-up"></i></button>
        <button
            class="add-below-btn"
            disabled={$isTimerStarting}
            on:click="{() => addBelow(i)}"
        ><i class="fas fa-plus-circle"></i> <i class="fas fa-arrow-down"></i></button>
        <button
            class="remove-btn"
            disabled={$isTimerStarting || $timerSettings.length === 1}
            on:click="{() => remove(i)}"
        ><i class="fas fa-minus-circle"></i></button>
    </div>
{/each}

<script>
    import { onMount } from 'svelte';
    import { timerSettings, isTimerStarting } from '../store.js';

    import Hour from './Timer/Hour.svelte';
    import Minute from './Timer/Minute.svelte';
    import Second from './Timer/Second.svelte';
    import Title from './Timer/Title.svelte';

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

    // タイトルのonChangeイベント
    const onChangeTitle = (e, index) => {
        $timerSettings[index].title = e.detail.value;
    };

    // タイマー(時)のonChangeイベント
    const onChangeHour = (e, index) => {
        $timerSettings[index].hour = e.detail.value;
    };

    // タイマー(分)のonChangeイベント
    const onChangeMinute = (e, index) => {
        $timerSettings[index].minute = e.detail.value;
    };

    // タイマー(秒)のonChangeイベント
    const onChangeSecond = (e, index) => {
        $timerSettings[index].second = e.detail.value;
    };

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
    .wrapper {
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

    /* ボタン系 */
    button {
        height: 40px;
        padding: 0px;
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
