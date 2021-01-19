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
            <div class="remove-btn-wrapper">
                <RemoveSetting index={i}/>
            </div>
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

    import AddSetting from './Button/AddSetting.svelte';
    import RemoveSetting from './Button/RemoveSetting.svelte';
    import NumberBox from './Input/NumberBox.svelte';
    import Title from './Input/Title.svelte';
    import Total from './Total/Index.svelte';

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
    });
</script>

<style>
    .wrapper {
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
    .remove-btn-wrapper {
        width: 32px;
        margin-left: 16px;
    }

    .add-setting-wrapper {
        margin: 0 0 16px 32px;
    }
</style>
