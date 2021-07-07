<div class="wrapper">
    <label class="collapse-btn" for="color-setting-callapse">
        <i class="fas {icon}"></i> Color Settings
    </label>
    <input
        class="collapse-open"
        type="checkbox"
        id="color-setting-callapse"
        aria-hidden="true"
        hidden
        bind:checked={open}
    />

    <div class="collapse-painel">
        <div class="collapse-inner">
            <div class="input-wrapper">
                <div class="label">Running:</div>
                <input type="text" class="color-input" bind:value="{$colorSetting.runningColor}" {disabled}>
                <div class="color-preview" style="background-color: {$colorSetting.runningColor}"></div>
            </div>
            <div class="multi-input-wrapper">
                <div class="input-color-wrapper">
                    <div class="label">Warning:</div>
                    <input type="text" class="color-input" bind:value="{$colorSetting.warning1Color}" {disabled}>
                    <div class="color-preview" style="background-color: {$colorSetting.warning1Color}"></div>
                </div>
                <div class="input-seconds-wrapper">
                    Switch with <input type="number" class="seconds-input" bind:value="{$colorSetting.warning1Seconds}" {disabled}> seconds remaining.
                </div>
            </div>
            <div class="multi-input-wrapper">
                <div class="input-color-wrapper">
                    <div class="label">Danger:</div>
                    <input type="text" class="color-input" bind:value="{$colorSetting.warning2Color}" {disabled}>
                    <div class="color-preview" style="background-color: {$colorSetting.warning2Color}" {disabled}></div>
                </div>
                <div class="input-seconds-wrapper">
                    Switch with <input type="number" class="seconds-input" bind:value="{$colorSetting.warning2Seconds}" {disabled}> seconds remaining.
                </div>
            </div>
            <div class="input-wrapper">
                <div class="label">Finish:</div>
                <input type="text" class="color-input" bind:value="{$colorSetting.finishColor}" {disabled}>
                <div class="color-preview" style="background-color: {$colorSetting.finishColor}" {disabled}></div>
            </div>
        </div>
    </div>
</div>

<script lang="ts">
    import { colorSetting } from '../../../store/setting';
    import { isTimerRunning } from '../../../store/state';

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

    colorSetting.subscribe(setting => {
        if (setting !== null) {
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

    // 設定の開閉管理フラグ
    let open = false;

    $: icon = open ? 'fa-chevron-down' : 'fa-chevron-up';
    $: disabled = $isTimerRunning === true;
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
    }
    .color-preview {
        width: 32px;
        height: 32px;
        margin-left: 4px;
        border: 1px solid #000000;
        border-radius: 8px;
    }

    /**
     * 設定の開閉
     */
     .collapse-open {
        display: none;
    }
    .collapse-painel {
        visibility: hidden;
        max-height: 0;
        opacity: 0;
        transition: max-height .1s,visibility .3s,opacity .3s;
    }
    .collapse-open:checked ~ .collapse-painel {
        max-height: 100%;
        opacity: 100;
        visibility: visible;
    }
    .collapse-btn {
        background: #FFFFFF;
        border-radius: 2px;
        cursor: pointer;
        display: block;
        padding: 5px 10px;
        font-weight: bold;
    }
    .collapse-inner {
        padding-top: 16px;
        background: #FFFFFF;
        /* border-top: dotted 1px #000000; */
    }
</style>
