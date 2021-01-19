<button
    disabled={$isTimerStarting}
    on:click="{clear}"
><i class="fas fa-eraser fa-2x"></i></button>

<script lang="ts">
    import {
        timerSettings,
        isTimerStarting,
    } from '../../../store';
    import { getDefaultTimerSetting, storeTimerSettings } from '../storage';

    export let index: number;

    const clear = (): void => {
        timerSettings.update(settings => {
            settings[index] = getDefaultTimerSetting();
            return settings;
        });
        storeTimerSettings($timerSettings);
    };
</script>

<style>
    /* ボタン系 */
    button {
        height: 40px;
        padding: 0px;
        background-color: #FFFFFF;
        border: none;
        outline: none;
        cursor: pointer;
        color: #FFB833;
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
