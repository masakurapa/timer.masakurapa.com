<Collapse key="color-setting">
    <span slot="header">背景色の設定</span>

    <div slot="content">
        <div class="input-wrapper">
            <div class="label">起動中</div>
            <input
                type="text"
                class="color-input"
                value="{colorSetting.runningColor}"
                on:change="{onChangeRunningColor}"
                {disabled}
            >
            <div class="color-preview" style="background-color: {colorSetting.runningColor}"></div>
        </div>
        <div class="multi-input-wrapper">
            <div class="input-color-wrapper">
                <div class="label">警告1</div>
                <input
                    type="text"
                    class="color-input"
                    value="{colorSetting.warning1Color}"
                    on:change="{onChangeWarning1Color}"
                    {disabled}
                >
                <div class="color-preview" style="background-color: {colorSetting.warning1Color}"></div>
            </div>
            <div class="input-seconds-wrapper">
                残り <input
                    type="tel"
                    class="seconds-input"
                    value="{colorSetting.warning1Seconds}"
                    on:change="{onChangeWarning1Seconds}"
                    {disabled}
                > 秒になったら変更
            </div>
        </div>
        <div class="multi-input-wrapper">
            <div class="input-color-wrapper">
                <div class="label">警告2</div>
                <input
                    type="text"
                    class="color-input"
                    value="{colorSetting.warning2Color}"
                    on:change="{onChangeWarning2Color}"
                    {disabled}
                >
                <div class="color-preview" style="background-color: {colorSetting.warning2Color}" {disabled}></div>
            </div>
            <div class="input-seconds-wrapper">
                残り <input
                    type="tel"
                    class="seconds-input"
                    value="{colorSetting.warning2Seconds}"
                    on:change="{onChangeWarning2Seconds}"
                    {disabled}
                > 秒になったら変更
            </div>
        </div>
        <div class="input-wrapper">
            <div class="label">終了</div>
            <input
                type="text"
                class="color-input"
                value="{colorSetting.finishColor}"
                on:change="{onChangeFinishColor}"
                {disabled}
            >
            <div class="color-preview" style="background-color: {colorSetting.finishColor}" {disabled}></div>
        </div>
    </div>
</Collapse>

<script lang="ts">
    import type { ColorSetting } from '$lib/types/local_timer';
    import type { InputEvent } from '$lib/types/event';

    import { personalTimerSetting } from '$lib/store/setting';
    import { isTimerRunning } from '$lib/store/timer';
    import { adjustNumber } from '$lib/util';

    import Collapse from '$lib/components/setting/timer_setting/Collapse.svelte';

    let colorSetting: ColorSetting;
    personalTimerSetting.subscribe(setting => {
        colorSetting = setting.colorSetting;
    });

    const onChangeRunningColor = (event: InputEvent): void => {
        // セミコロンはNG
        if (event.currentTarget.value.indexOf(';') !== -1) {
            event.currentTarget.value = colorSetting.runningColor;
        }
        personalTimerSetting.update(setting => {
            setting.colorSetting.runningColor = event.currentTarget.value;
            return setting;
        });
    };

    const onChangeWarning1Color = (event: InputEvent): void => {
        // セミコロンはNG
        if (event.currentTarget.value.indexOf(';') !== -1) {
            event.currentTarget.value = colorSetting.warning1Color;
        }
        personalTimerSetting.update(setting => {
            setting.colorSetting.warning1Color = event.currentTarget.value;
            return setting;
        });
    };

    const onChangeWarning2Color = (event: InputEvent): void => {
        // セミコロンはNG
        if (event.currentTarget.value.indexOf(';') !== -1) {
            event.currentTarget.value = colorSetting.warning2Color;
        }
        personalTimerSetting.update(setting => {
            setting.colorSetting.warning2Color = event.currentTarget.value;
            return setting;
        });
    };

    const onChangeFinishColor = (event: InputEvent): void => {
        // セミコロンはNG
        if (event.currentTarget.value.indexOf(';') !== -1) {
            event.currentTarget.value = colorSetting.finishColor;
        }
        personalTimerSetting.update(setting => {
            setting.colorSetting.finishColor = event.currentTarget.value;
            return setting;
        });
    };

    const onChangeWarning1Seconds = (event: InputEvent): void => {
        const sec = adjustNumber(event.currentTarget.value, $personalTimerSetting.colorSetting.warning2Seconds + 1);
        event.currentTarget.value = sec.toString();
        personalTimerSetting.update(setting => {
            setting.colorSetting.warning1Seconds = sec;
            return setting;
        });
    };

    const onChangeWarning2Seconds = (event: InputEvent): void => {
        const sec = adjustNumber(event.currentTarget.value, 1);
        event.currentTarget.value = sec.toString();
        personalTimerSetting.update(setting => {
            setting.colorSetting.warning2Seconds = sec;
            return setting;
        });
    };

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

    @media (max-width: 400px) {
        .color-input {
            width: 100px;
        }
    }
</style>
