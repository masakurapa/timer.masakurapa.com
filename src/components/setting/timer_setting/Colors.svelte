<div class="wrapper">
    <h3>Color & Switching seconds</h3>

    <div class="input-wrapper">
        <div class="label">Running:</div>
        <input type="text" class="color-input" bind:value="{runningColor}">
        <div class="color-preview" style="background-color: {runningColor}"></div>
    </div>
    <div class="multi-input-wrapper">
        <div class="input-color-wrapper">
            <div class="label">Warning:</div>
            <input type="text" class="color-input" bind:value="{warningColor}">
            <div class="color-preview" style="background-color: {warningColor}"></div>
        </div>
        <div class="input-seconds-wrapper">
            Switch with <input type="text" class="seconds-input" bind:value="{warningSeconds}"> seconds remaining.
        </div>
    </div>
    <div class="multi-input-wrapper">
        <div class="input-color-wrapper">
            <div class="label">Danger:</div>
            <input type="text" class="color-input" bind:value="{dangerColor}">
            <div class="color-preview" style="background-color: {dangerColor}"></div>
        </div>
        <div class="input-seconds-wrapper">
            Switch with <input type="text" class="seconds-input" bind:value="{dangerSeconds}"> seconds remaining.
        </div>
    </div>
    <div class="input-wrapper">
        <div class="label">Finish:</div>
        <input type="text" class="color-input" bind:value="{finishColor}">
        <div class="color-preview" style="background-color: {finishColor}"></div>
    </div>
</div>

<script lang="ts">
    const defaultColor = {
        running: '#DDFFFF',
        warning: '#FFFFCC',
        danger: '#FFDDDD',
        finish: '#DDFFDD',
    };
    const defaultSeconds = {
        warning: 30,
        danger: 10,
    };

    let runningColor = defaultColor.running;
    let warningColor = defaultColor.warning;
    let dangerColor = defaultColor.danger;
    let finishColor = defaultColor.finish;
    let warningSeconds = defaultSeconds.warning;
    let dangerSeconds = defaultSeconds.danger;
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        border: 1px solid #000000;
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
        width: 100px;
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
    }
</style>
