<div class="wrapper header">
    <div class="current-wrapper">&nbsp;</div>
    <div class="text-wrapper">Title</div>
    <div class="number-wrapper">Hour</div>
    <div class="number-wrapper">Min</div>
    <div class="number-wrapper">Sec</div>
    <div class="btn-wrapper">&nbsp;</div>
</div>

{#each $timerSettings as _, i}
    <div class="wrapper">
        <div class="current-wrapper">
            {#if $timerIndex === i}
                <i class="fas fa-angle-double-right fa-2x"></i>
            {/if}
        </div>
        <div class="text-wrapper">
            <Title
                value={$timerSettings[i].title}
                on:change={e => onChangeTitle(e, i)}
            />
        </div>
        <div class="number-wrapper">
            <NumberBox
                value={$timerSettings[i].hour}
                min="{0}"
                max="{24}"
                on:change={e => onChangeTime(e, i, 'hour')}
            />&nbsp;:&nbsp;
        </div>
        <div class="number-wrapper">
            <NumberBox
                value={$timerSettings[i].minute}
                min="{0}"
                max="{59}"
                on:change={e => onChangeTime(e, i, 'minute')}
            />&nbsp;:&nbsp;
        </div>
        <div class="number-wrapper">
            <NumberBox
                value={$timerSettings[i].second}
                min="{0}"
                max="{59}"
                on:change={e => onChangeTime(e, i, 'second')}
            />
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

<button
    class="add-btn"
    disabled={$isTimerStarting}
    on:click="{add}"
><i class="fas fa-plus-circle fa-2x"></i></button>

<div class="wrapper">
    <div class="current-wrapper">&nbsp;</div>
    <div class="text-wrapper">Total Time:</div>
    <div class="number-wrapper total">{totalHour}&nbsp;:&nbsp;</div>
    <div class="number-wrapper total">{totalMinute}&nbsp;:&nbsp;</div>
    <div class="number-wrapper total">{totalSecond}&nbsp;&nbsp;&nbsp;</div>
    <div class="btn-wrapper">&nbsp;</div>
</div>

<script lang="ts">
    import type { timerSetting } from '../../types';

    import { onMount } from 'svelte';
    import {
        repeat,
        timerIndex,
        timerSettings,
        isTimerStarting,
    } from '../../store';
    import {
        padding,
        calcTotalSec,
        totalSecToHMS,
    } from '../../util';
    import {
        getCurrent,
        setTimerSettings,
        getTimerSetting,
    } from '../../storage';

    import NumberBox from './NumberBox.svelte';
    import Title from './Timer/Title.svelte';

    let totalHour = '00';
    let totalMinute = '00';
    let totalSecond = '00';

    // タイマーの設定オブジェクト
    const timerObj: timerSetting = {
        title: '',
        time: 0,
        hour: 0,
        minute: 0,
        second: 0,
    };

    onMount(() => {
        const idx = getCurrent();
        const storage = getTimerSetting();

        // ローカルストレージの情報がなければ、デフォルト値として一個の空タイマーをセット
        if (storage[idx] === undefined) {
            timerSettings.set([Object.assign({}, timerObj)]);
            return;
        }

        // ローカルストレージの情報を詰め直す
        const objs: timerSetting[] = [];
        storage[idx].settings.forEach((t: timerSetting) => {
            const obj = Object.assign({}, timerObj);
            obj.title = t.title;
            obj.hour = t.hour;
            obj.minute = t.minute;
            obj.second = t.second;
            obj.time = calcTotalSec(t.hour, t.minute, t.second);
            objs.push(obj);
        });
        timerSettings.set(objs);
        calculateTotal();
    });

    let rep = 0;
    repeat.subscribe(n => {
        if (rep !== n) {
            rep = n;
            calculateTotal();
        }
    });

    // タイトルのonChangeイベント
    const onChangeTitle = (e: any, index: number) => {
        $timerSettings[index].title = e.detail.value;
        setStorage();
    };

    // タイマーのonChangeイベント
    const onChangeTime = (e: any, index: number, key: string) => {
        $timerSettings[index][key] = e.detail.value;
        setStorage();

        // タイマー値の再計算
        timerSettings.update(settings => {
            settings.forEach(t => {
                t.time = calcTotalSec(t.hour, t.minute, t.second);
            });
            return settings;
        });

        calculateTotal();
    };

    // ローカルストレージにタイマー設定を保存する
    const setStorage = (): void => {
        const settings = [];
        $timerSettings.forEach(t => {
            const obj = Object.assign({}, timerObj);
            obj.title = t.title;
            obj.hour = t.hour;
            obj.minute = t.minute;
            obj.second = t.second;
            settings.push(obj);
        });
        setTimerSettings(getCurrent(), settings);
    };

    // 一番下に設定を追加
    const add = (): void => {
        timerSettings.update(settings => {
            settings.splice(settings.length + 1, 0, Object.assign({}, timerObj));
            return settings;
        });
        setStorage();
    };

    // 指定行のタイマー設定を削除
    const remove = (i: number): void => {
        timerSettings.update(settings => {
            settings.splice(i, 1);
            return settings;
        });
        setStorage();
        calculateTotal();

        // 無条件で一番上のタイマーに戻しておく
        timerIndex.set(0);
    };

    // 合計時間を求める
    const calculateTotal = (): void => {
        let total = 0;
        $timerSettings.forEach(t => {
            total += calcTotalSec(t.hour, t.minute, t.second);
        });
        total = total * ($repeat + 1);

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
        padding: 4px;
        align-items: center;
    }
    .header {
        font-weight: bold;
        margin-bottom: 8px;
    }

    .current-wrapper {
        width: 32px;
        color: #228B22;
    }
    .text-wrapper {
        width: 300px;
        margin-right: 16px;
    }
    .number-wrapper {
        width: 70px;
    }
    .btn-wrapper {
        width: 32px;
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
        cursor: pointer;
    }
    button:forcus {
        background-color: #FFFFFF;
    }
    button:disabled {
        color: #999999;
        cursor: default;
    }
    button:not(:disabled):active {
        background-color: #FFFFFF;
    }

    .add-btn {
        color: #1E90FF;
        margin: 0 0 8px 32px;
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
