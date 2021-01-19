<h2>Setting</h2>

{#each $timerSettings as _, i}
    <div class="wrapper">
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

        <div class="btn-group">
            <div class="btn-wrapper"><ClearSetting index={i}/></div>
            <div class="btn-wrapper"><RemoveSetting index={i}/></div>
        </div>
    </div>
{/each}

<div class="add-setting-wrapper">
    <AddSetting/>
</div>
<div class="add-setting-wrapper">
    <Total/>
</div>

<script lang="ts">
    import type { timerSetting } from '../../types';

    import { onMount } from 'svelte';
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

    import AddSetting from './Button/AddSetting.svelte';
    import ClearSetting from './Button/ClearSetting.svelte';
    import RemoveSetting from './Button/RemoveSetting.svelte';
    import NumberBox from './Input/NumberBox.svelte';
    import Title from './Input/Title.svelte';
    import Total from './Total/Index.svelte';

    onMount(() => {
        const idx = getCurrent();
        const storage = getTimerSetting();

        // ローカルストレージの情報がなければ、デフォルト値として一個の空タイマーをセット
        if (storage[idx] === undefined) {
            timerSettings.set([getDefaultTimerSetting()]);
            return;
        }

        // ローカルストレージの情報を詰め直す
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
        margin-bottom: 16px;
        border-bottom: 0.5px dotted #888888;
        max-width: 600px;
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

    .btn-group {
        display: flex;
        margin-left: 32px;
        justify-content: flex-end;
    }
    .btn-wrapper {
        width: 32px;
    }
    .btn-wrapper:first-child {
        margin-right: 32px;
    }

    .add-setting-wrapper {
        margin: 0 0 16px 32px;
    }
</style>
