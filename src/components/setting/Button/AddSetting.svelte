<svelte:window bind:scrollY={y}/>
<button
    disabled={$isTimerStarting}
    on:click="{add}"
><i class="fas fa-plus-circle fa-2x"></i></button>

<script lang="ts">
    import {
        timerSettings,
        isTimerStarting,
    } from '../../../store';
    import { getDefaultTimerSetting, storeTimerSettings } from '../storage';

    let y: number;

    // 一番下に設定を追加
    const add = (): void => {
        timerSettings.update(settings => {
            settings.splice(settings.length + 1, 0, getDefaultTimerSetting());
            return settings;
        });
        storeTimerSettings($timerSettings);

        // ウィンドウの高さをタイマーの設定領域+α下げる
        y += 400;
    };
</script>

<style>
    button {
        height: 40px;
        padding: 0px;
        background-color: #FFFFFF;
        border: none;
        outline: none;
        cursor: pointer;
        color: #1E90FF;
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
</style>
