<div class="wrapper header">
    <div class="text-wrapper">Title</div>
    <div class="number-wrapper">Hour</div>
    <div class="number-wrapper">Min</div>
    <div class="number-wrapper">Sec</div>
    <div class="btn-wrapper">&nbsp;</div>
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
            <NumberBox
                value={$timerSettings[i].hour}
                min="0"
                max="24"
                on:change={e => onChangeTime(e, i, 'hour')}
            />&nbsp;:&nbsp;
        </div>
        <div class="number-wrapper">
            <NumberBox
                value={$timerSettings[i].minute}
                min="0"
                max="59"
                on:change={e => onChangeTime(e, i, 'minute')}
            />&nbsp;:&nbsp;
        </div>
        <div class="number-wrapper">
            <NumberBox
                value={$timerSettings[i].second}
                min="0"
                max="59"
                on:change={e => onChangeTime(e, i, 'second')}
            />&nbsp;:&nbsp;
        </div>

        <div class="btn-wrapper">
            <button
                class="remove-btn"
                disabled={$isTimerStarting || $timerSettings.length === 1}
                on:click="{() => remove(i)}"
            ><i class="fas fa-minus-circle fa-2x"></i></button>
        </div>
    </div>
{/each}

<div class="wrapper">
    <div class="text-wrapper">Total Time:</div>
    <div class="number-wrapper total">{totalHour}&nbsp;:&nbsp;</div>
    <div class="number-wrapper total">{totalMinute}&nbsp;:&nbsp;</div>
    <div class="number-wrapper total">{totalSecond}&nbsp;&nbsp;&nbsp;</div>
    <div class="btn-wrapper">&nbsp;</div>
</div>

<button
    class="add-btn"
    disabled={$isTimerStarting}
    on:click="{add}"
><i class="fas fa-plus-circle fa-2x"></i></button>

<script>
    import { onMount } from 'svelte';
    import { timerSettings, isTimerStarting } from '../store.js';
    import { padding, calcTotalSec, totalSecToHMS } from '../util.js';

    import NumberBox from './NumberBox.svelte';
    import Title from './Timer/Title.svelte';

    let totalHour = '00';
    let totalMinute = '00';
    let totalSecond = '00';

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

    // タイマーのonChangeイベント
    const onChangeTime = (e, index, key) => {
        $timerSettings[index][key] = e.detail.value;

        // タイマー値の再計算
        timerSettings.update(settings => {
            settings.forEach(t => {
                t.time = calcTotalSec(t.hour, t.minute, t.second);
            });
            return settings;
        });

        calculateTotal();
    };

    // 一番下に設定を追加
    const add = () => {
        timerSettings.update(settings => {
            settings.splice(settings.length + 1, 0, Object.assign({}, timerObj));
            return settings;
        });
    };

    // 指定行のタイマー設定を削除
    const remove = (i) => {
        timerSettings.update(settings => {
            settings.splice(i, 1);
            return settings;
        });
        calculateTotal();
    };

    // 合計時間を求める
    const calculateTotal = () => {
        let total = 0;
        $timerSettings.forEach(t => {
            total += calcTotalSec(t.hour, t.minute, t.second);
        });
        const t = totalSecToHMS(total);
        totalHour = padding(t.hour);
        totalMinute = padding(t.minute);
        totalSecond = padding(t.second);
    };
</script>

<style>
    /* 全体のレイアウト */
    .wrapper {
        display: flex;
        margin-bottom: 8px;
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
    .btn-wrapper {
        width: 40px;
    }

    .total {
        text-align: center;
    }

    /* ボタン系 */
    button {
        height: 40px;
        padding: 0px;
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

    .add-btn {
        color: #1E90FF;
    }
    .remove-btn {
        color: #DC143C;
    }

    @media screen and (max-width: 480px) {
        .text-wrapper {
            width: 130px;
            margin-right: 8px;
        }
        .number-wrapper {
            width: 60px;
        }
    }
</style>
