<h2>Setting</h2>
<div class="wrapper">

{#each $timerSettings as _, i}
    <div class="setting-wrapper">
        <div class="form-wrapper title-wrapper">
            <div class="current-wrapper">
                {#if $timerIndex === i}
                    <i class="fas fa-angle-double-right fa-2x"></i>
                {/if}
            </div>
            <Title
                value={$timerSettings[i].title}
                index={i}
            >Title:</Title>
        </div>
        <div class="form-wrapper number-wrapper">
            <NumberBox
                min="{0}"
                max="{24}"
                value="{$timerSettings[i].hour}"
                index={i}
                key="hour"
            >Hour:</NumberBox>
        </div>
        <div class="form-wrapper number-wrapper">
            <NumberBox
                min="{0}"
                max="{59}"
                value="{$timerSettings[i].minute}"
                index={i}
                key="minute"
            >Minute:</NumberBox>
        </div>
        <div class="form-wrapper number-wrapper">
            <NumberBox
                min="{0}"
                max="{59}"
                value="{$timerSettings[i].second}"
                index={i}
                key="second"
            >Second:</NumberBox>
        </div>

        <div class="flex-end-wrapper">
            <div class="first-btn"><ClearSetting index={i}/></div>
            <div><RemoveSetting index={i}/></div>
        </div>
    </div>
{/each}

    <div class="flex-end-wrapper"><Total/></div>
    <div class="flex-end-wrapper">
        <div class="first-btn"><AddSetting/></div>
        <div><RemoveAllSetting/></div>
    </div>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import * as axios from 'axios';

    import {
        timerIndex,
        timerSettings,
    } from '../../store';
    import { calcTotalSec } from '../../util';
    import {
        getCurrent,
        getTimerSetting,
    } from '../../storage';
    import { getDefaultTimerSetting } from './storage';
    import type { timerSetting, storageTimerSetting } from '../../types';

    import AddSetting from './Button/AddSetting.svelte';
    import ClearSetting from './Button/ClearSetting.svelte';
    import RemoveAllSetting from './Button/RemoveAllSetting.svelte';
    import RemoveSetting from './Button/RemoveSetting.svelte';
    import NumberBox from './Input/NumberBox.svelte';
    import Title from './Input/Title.svelte';
    import Total from './Total/Index.svelte';

    // タイマー設定のデフォルト値を設定します
    const setDefaultTimerSetting = () => {
        timerSettings.set([getDefaultTimerSetting()]);
    };

    // 共有された設定情報を取得して設定します
    const setSharedTimerSetting = async (id: string) => {
        try {
            const resp = await axios.default.get<string>(`https://timer.masakurapa.com/share/${id}.json`);
            if (resp.status !== 200) {
                setDefaultTimerSetting();
                return;
            }

            const body: storageTimerSetting = JSON.parse(resp.data);
            const objs: timerSetting[] = [];
            body.settings.forEach((t: timerSetting) => {
                const obj = getDefaultTimerSetting();
                obj.title = t.title;
                obj.hour = t.hour;
                obj.minute = t.minute;
                obj.second = t.second;
                obj.time = calcTotalSec(t.hour, t.minute, t.second);
                objs.push(obj);
            });
            timerSettings.set(objs);
        } catch (err) {
            // エラー時はデフォルト設定を利用
            console.error(err);
            setDefaultTimerSetting();
        }
    };

    onMount(async () => {
        const idx = getCurrent();
        const storage = getTimerSetting();

        // getパラメータ
        const parmas = (new URL(document.location.toString())).searchParams;

        // Getパラメータなし、ローカルストレージの情報なしなら、デフォルト値として一個の空タイマーをセット
        if (!parmas.has('id') && storage[idx] === undefined) {
            setDefaultTimerSetting();
            return;
        }

        // getパラメータがあれば優先して使う、なければローカルストレージの情報を使う
        if (parmas.has('id')) {
            await setSharedTimerSetting(parmas.get('id'))
            return;
        }

        // getパラメータがなければローカルストレージの情報を詰め直す
        const objs: timerSetting[] = [];
        storage[idx].settings.forEach((t: timerSetting) => {
            const obj = getDefaultTimerSetting();
            obj.title = t.title;
            obj.hour = t.hour;
            obj.minute = t.minute;
            obj.second = t.second;
            obj.time = calcTotalSec(t.hour, t.minute, t.second);
            objs.push(obj);
        });
        timerSettings.set(objs);
    });
</script>

<style>
    .wrapper {
        max-width: 600px;
    }
    .setting-wrapper {
        margin-bottom: 16px;
        border-bottom: 0.5px dotted #888888;
    }
    .form-wrapper {
        margin-bottom: 8px;
        padding: 4px;
        align-items: center;
    }
    .title-wrapper {
        display: flex;
    }
    .number-wrapper {
        margin-left: 32px;
    }
    .current-wrapper {
        width: 32px;
        color: #228B22;
    }

    .flex-end-wrapper {
        display: flex;
        margin-bottom: 16px;
        justify-content: flex-end;
    }
    .first-btn {
        margin-right: 32px;
    }
</style>
