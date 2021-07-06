<div class="wrapper">
    <h3>Color & Switching seconds</h3>

    <div class="input-wrapper">
        <div class="label">Running:</div>
        <input type="text" class="color-input" bind:value="{$colorSetting.runningColor}">
        <div class="color-preview" style="background-color: {$colorSetting.runningColor}"></div>
    </div>
    <div class="multi-input-wrapper">
        <div class="input-color-wrapper">
            <div class="label">Warning:</div>
            <input type="text" class="color-input" bind:value="{$colorSetting.warning1Color}">
            <div class="color-preview" style="background-color: {$colorSetting.warning1Color}"></div>
        </div>
        <div class="input-seconds-wrapper">
            Switch with <input type="text" class="seconds-input" bind:value="{$colorSetting.warning1Seconds}"> seconds remaining.
        </div>
    </div>
    <div class="multi-input-wrapper">
        <div class="input-color-wrapper">
            <div class="label">Danger:</div>
            <input type="text" class="color-input" bind:value="{$colorSetting.warning2Color}">
            <div class="color-preview" style="background-color: {$colorSetting.warning2Color}"></div>
        </div>
        <div class="input-seconds-wrapper">
            Switch with <input type="text" class="seconds-input" bind:value="{$colorSetting.warning2Seconds}"> seconds remaining.
        </div>
    </div>
    <div class="input-wrapper">
        <div class="label">Finish:</div>
        <input type="text" class="color-input" bind:value="{$colorSetting.finishColor}">
        <div class="color-preview" style="background-color: {$colorSetting.finishColor}"></div>
    </div>
</div>

<script lang="ts">
    import { colorSetting } from '../../../store/setting';
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        border: 1px solid #000000;
        border-radius: 8px;
        padding: 12px;
        max-width: 600px;
    }
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
        margin: 0 4px;
    }
    .color-preview {
        width: 32px;
        height: 32px;
        margin-left: 4px;
        border: 1px solid #000000;
        border-radius: 8px;
    }
</style>
