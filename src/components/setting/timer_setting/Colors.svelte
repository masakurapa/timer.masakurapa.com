<Collapse key="color-setting">
    <span slot="header">Collor Settings</span>

    <div slot="content">
        <div class="input-wrapper">
            <div class="label">Running:</div>
            <input type="text" class="color-input" bind:value="{setting.runningColor}" {disabled}>
            <div class="color-preview" style="background-color: {setting.runningColor}"></div>
        </div>
        <div class="multi-input-wrapper">
            <div class="input-color-wrapper">
                <div class="label">Warning:</div>
                <input type="text" class="color-input" bind:value="{setting.warning1Color}" {disabled}>
                <div class="color-preview" style="background-color: {setting.warning1Color}"></div>
            </div>
            <div class="input-seconds-wrapper">
                Switch with <input type="number" class="seconds-input" bind:value="{setting.warning1Seconds}" {disabled}> seconds remaining.
            </div>
        </div>
        <div class="multi-input-wrapper">
            <div class="input-color-wrapper">
                <div class="label">Danger:</div>
                <input type="text" class="color-input" bind:value="{setting.warning2Color}" {disabled}>
                <div class="color-preview" style="background-color: {setting.warning2Color}" {disabled}></div>
            </div>
            <div class="input-seconds-wrapper">
                Switch with <input type="number" class="seconds-input" bind:value="{setting.warning2Seconds}" {disabled}> seconds remaining.
            </div>
        </div>
        <div class="input-wrapper">
            <div class="label">Finish:</div>
            <input type="text" class="color-input" bind:value="{setting.finishColor}" {disabled}>
            <div class="color-preview" style="background-color: {setting.finishColor}" {disabled}></div>
        </div>
    </div>
</Collapse>

<script lang="ts">
    import type { ColorSetting } from '../../../types/local_timer';
    import { colorSetting } from '../../../store/setting';
    import { isTimerRunning } from '../../../store/timer';

    import Collapse from './Collapse.svelte';

    const DEFAULT_BG_COLOR = {
        RUNNING: '#DDFFFF',
        WARNING: '#FFFFCC',
        DANGER: '#FFDDDD',
        FINISH: '#DDFFDD',
    } as const;
    const DEFAULT_SWITCH_SECONDS = {
        WARNING: 30,
        DANGER: 10,
    } as const;

    let setting: ColorSetting;
    colorSetting.subscribe(val => {
        if (val !== null) {
            setting = val;
            return;
        }
        colorSetting.set({
            runningColor: DEFAULT_BG_COLOR.RUNNING,
            warning1Color: DEFAULT_BG_COLOR.WARNING,
            warning2Color: DEFAULT_BG_COLOR.DANGER,
            finishColor: DEFAULT_BG_COLOR.FINISH,
            warning1Seconds: DEFAULT_SWITCH_SECONDS.WARNING,
            warning2Seconds: DEFAULT_SWITCH_SECONDS.DANGER,
        })
    });

    $: disabled = $isTimerRunning === true;
</script>

<style>
    .input-wrapper {
        display: flex;
        margin-bottom: 12px;
        align-items: center;
    }
    .multi-input-wrapper {
        margin-bottom: 12px;
        align-items: center;
    }
    .input-wrapper:last-child {
        margin-bottom: 0px;
    }

    .input-color-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .input-seconds-wrapper {
        padding-left: 72px;
    }

    .label {
        margin-bottom: 4px;
        width: 64px;
    }
    .color-input {
        width: 180px;
        margin-left: 8px;
    }
    .seconds-input {
        width: 60px;
    }
    .color-preview {
        width: 32px;
        height: 32px;
        margin-left: 4px;
        border: 1px solid #000000;
        border-radius: 8px;
    }
</style>
