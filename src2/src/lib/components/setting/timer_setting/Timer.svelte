<h2>タイマーの設定 <span class="annotation">(最大{maxTimerSetting}件)</span></h2>

<div class="wrapper">
    <div class="total">
        <div>合計</div>
        <div>{padding(totalTime.hour)}:{padding(totalTime.minute)}:{padding(totalTime.second)}</div>
    </div>

    <div>
        <div class="setting-add-wrapper" class:hide={disabled}>
            <div class="setting-add-btn-wrapper" class:disable-add-btn="{!canAddSetting}" on:click="{() => addTimerSetting(0)}">
                <i class="fas fa-plus-circle fa-2x"></i>
            </div>
        </div>

        {#each $personalTimerSetting.timerSettings as data, idx (idx)}
            <div class="setting-row">
                <div class="setting-row-number">#{idx + 1}</div>
                <div class="setting-row-icon-wrapper">
                    {#if !disabled}
                        <div
                            class="setting-row-remove-btn"
                            class:hide={$personalTimerSetting.timerSettings.length === 1}
                            on:click="{() => onClickRemoveSetting(idx)}"
                        >
                            <i class="fas fa-times fa-2x"></i>
                        </div>
                    {:else}
                        {#if idx === $currentTimerPosition}
                            <div class="now-mark-wrapper">
                                <i class="fas fa-hand-point-right fa-2x"></i>
                            </div>
                        {/if}
                    {/if}
                </div>
                <div class="setting-row-input-wrapper">
                    <div
                        class="clear-btn-wrapper"
                        class:hide={disabled}
                        on:click="{() => onClickEraseSetting(idx)}"
                    >
                        <i class="fas fa-eraser fa-2x"></i>
                    </div>

                    <div class="setting-row-input-group">
                        <div class="setting-row-input-label timer-title">タイトル</div>
                        <div class="setting-row-input-text timer-title-input">
                            <input
                                type="text"
                                class="setting-row-input-title"
                                placeholder="タイトル (50文字)"
                                maxlength="50"
                                bind:value="{data.title}"
                                {disabled}
                            >
                        </div>
                    </div>
                    <div class="setting-row-input-group">
                        <div class="setting-row-input-label">時</div>
                        <div class="setting-row-input-number">
                            <input
                                type="tel"
                                min="0"
                                max="24"
                                value="{data.timer.hour}"
                                on:change="{event => onChangeHour(event, idx) }"
                                {disabled}
                            >
                        </div>
                        <div class="setting-row-input-range">
                            <input
                                type="range"
                                min="0"
                                max="24"
                                step="1"
                                bind:value="{data.timer.hour}"
                                {disabled}
                            >
                        </div>
                    </div>
                    <div class="setting-row-input-group">
                        <div class="setting-row-input-label">分</div>
                        <div class="setting-row-input-number">
                            <input
                                type="tel"
                                min="0"
                                max="59"
                                bind:value="{data.timer.minute}"
                                on:change="{event => onChangeMinute(event, idx) }"
                                {disabled}
                            >
                        </div>
                        <div class="setting-row-input-range">
                            <input
                                type="range"
                                min="0"
                                max="59"
                                step="1"
                                bind:value="{data.timer.minute}"
                                {disabled}
                            >
                        </div>
                    </div>
                    <div class="setting-row-input-group">
                        <div class="setting-row-input-label">秒</div>
                        <div class="setting-row-input-number">
                            <input
                                type="tel"
                                min="0"
                                max="59"
                                bind:value="{data.timer.second}"
                                on:change="{event => onChangeSecond(event, idx) }"
                                {disabled}
                            >
                        </div>
                        <div class="setting-row-input-range">
                            <input
                                type="range"
                                min="0"
                                max="59"
                                step="1"
                                bind:value="{data.timer.second}"
                                {disabled}
                            >
                        </div>
                    </div>
                </div>
            </div>

            <div class="setting-add-wrapper" class:hide={disabled}>
                <div class="setting-add-btn-wrapper" class:disable-add-btn="{!canAddSetting}" on:click="{() => addTimerSetting(idx + 1)}">
                    <i class="fas fa-plus-circle fa-2x"></i>
                </div>
            </div>
        {/each}
    </div>
</div>

<script lang="ts">
    import { onMount } from 'svelte';

    import type {
        TimerSetting,
        Timer,
    } from '$lib/types/local_timer';
    import type { InputEvent } from '$lib/types/event';

    import { personalTimerSetting } from '$lib/store/setting';
    import { isTimerRunning, currentTimerPosition } from '$lib/store/timer';
    import { padding, calcTotalTime, adjustNumber } from '$lib/util';

    // タイマー設定の最大件数
    const maxTimerSetting = 30;

    // 全タイマーの合計時間
    let totalTime: Timer = { hour: 0, minute: 0, second: 0 };

    /**
     * 指定位置にタイマーの設定を追加します
     */
    const addTimerSetting = (no: number): void => {
        if (!canAddSetting) {
            return;
        }

        personalTimerSetting.update(setting => {
            const defaultTimerSetting: TimerSetting = {
                title: '',
                timer: { hour: 0, minute: 0, second: 0 },
            };

            if (no === 0) {
                setting.timerSettings.unshift(defaultTimerSetting);
            } else if (no === setting.timerSettings.length) {
                setting.timerSettings.push(defaultTimerSetting);
            } else {
                setting.timerSettings.splice(no, 0, defaultTimerSetting);
            }
            return setting;
        });
    };

    /**
     * 指定位置のタイマー設定をデフォルト値に戻します
     */
    const onClickEraseSetting = (no: number): void => {
        personalTimerSetting.update(setting => {
            setting.timerSettings[no].title = '';
            setting.timerSettings[no].timer = { hour: 0, minute: 0, second: 0 };
            return setting;
        });
    }

    /**
     * 指定位置のタイマー設定を削除します
     */
     const onClickRemoveSetting = (no: number): void => {
        personalTimerSetting.update(setting => {
            setting.timerSettings.splice(no, 1);
            return setting;
        });
    }

    const onChangeHour = (event: InputEvent, no: number): void => {
        const hour = adjustNumber(event.currentTarget.value, 0, 24);
        event.currentTarget.value = hour.toString();
        personalTimerSetting.update(setting => {
            setting.timerSettings[no].timer.hour = hour;
            return setting;
        });
    };

    const onChangeMinute = (event: InputEvent, no: number): void => {
        const minute = adjustNumber(event.currentTarget.value, 0, 59);
        event.currentTarget.value = minute.toString();
        personalTimerSetting.update(setting => {
            setting.timerSettings[no].timer.minute = minute;
            return setting;
        });
    };

    const onChangeSecond = (event: InputEvent, no: number): void => {
        const second = adjustNumber(event.currentTarget.value, 0, 59);
        event.currentTarget.value = second.toString();
        personalTimerSetting.update(setting => {
            setting.timerSettings[no].timer.second = second;
            return setting;
        });
    };

    // タイマー設定は最低1つ存在するようにするため
    // マウント時に設定が空なら先頭に行を追加しておく
    onMount(() => {
        if ($personalTimerSetting.timerSettings.length === 0) {
            addTimerSetting(0);
        }
    });

    personalTimerSetting.subscribe(setting => {
        // 空に変更されていたら最低一つ存在するようにするため、先頭に行を追加
        if (setting.timerSettings.length === 0) {
            addTimerSetting(0);
        }

        // 全設定の合計時間を求める
        totalTime = calcTotalTime(setting.timerSettings);
    });

    $: disabled = $isTimerRunning === true;

    // タイマー設定が追加可能かのフラグ
    $: canAddSetting = $personalTimerSetting.timerSettings.length < maxTimerSetting;
</script>

<style>
    .wrapper {
        max-width: 800px;
    }
    .hide {
        display: none !important;
    }
    .annotation {
        font-size: 12px;
        font-weight: normal;
    }

    /**
     * 合計時間
     */
    .total {
        display: flex;
        justify-content: space-between;
        height: 32px;
        line-height: 32px;
        width: 240px;
        margin-left: auto;
        margin-bottom: 16px;
        padding: 8px;
        border: 1px solid #000000;
        border-radius: 8px;
        background-color: #faf0e6;
        font-size: 24px;
        text-align: center;
        position: -webkit-sticky;
        position: sticky;
        top: 20px;
        z-index: 1;
    }

    /**
     * 設定の追加領域
     */
     .setting-add-wrapper {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
     }
     .setting-add-wrapper::after {
        content: '';
        height: 1px;
        background-size: 8px 1px;
        background-image: linear-gradient(to right, #333, #333 3px, transparent 3px, transparent 8px);
        background-repeat: repeat-x;
        flex-grow: 1;
        margin-left: 8px;
    }
     .setting-add-btn-wrapper {
        width: 32px;
        color: #1E90FF;
        cursor: pointer;
    }
    .disable-add-btn {
        color: #DDDDDD;
        cursor: default;
    }

    /**
     * 設定の1行
     */
    .setting-row {
        display: flex;
        padding-left: 8px;
        margin-bottom: 12px;
        align-items: center;
        position: relative;
    }
    .setting-row-number {
        position: absolute;
        top: 0;
    }
    .setting-row-icon-wrapper {
        width: 36px;
    }
    .setting-row-remove-btn {
        color: #DC3545;
        cursor: pointer;
    }
    .now-mark-wrapper {
        color: #00AE95;
    }
    .setting-row-input-wrapper {
        width: 100%;
        border: 1px solid #000000;
        border-radius: 8px;
        background-color: #FFFFFF;
        margin-left: 4px;
        padding: 8px;
        position: relative;
        box-shadow: 4px 4px 8px 0 rgb(50, 50, 50, 0.5);
    }
    .clear-btn-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
        color: #FFB833;
        cursor: pointer;
    }

    .setting-row-input-group {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
    }
    .setting-row-input-text {
        width: 70%;
    }
    .setting-row-input-number {
        width: 60px;
    }
    .setting-row-input-range {
        width: 60%;
    }
    .setting-row-input-group:last-child {
        margin-bottom: 0px;
    }
    .setting-row-input-label {
        width: 90px;
    }
    .setting-row-input-title {
        width: calc(100% - 40px);
    }

    /**
     * スライダー
     */
    input[type=range] {
        width: calc(100% - 48px);
        -webkit-appearance: none;
        border: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 300px;
        height: 1em;
        background: #DDDDDD;
        border: none;
        border-radius: 3px;
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #1976D2;
        margin-top: -5px;
    }
    input[type=range]:disabled::-webkit-slider-thumb {
        background: #EEEEEE;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #CCCCCC;
    }

    @media (max-width: 550px) {
        .timer-title {
            display: none;
        }
        .timer-title-input {
            margin-left: 30px;
            width: 100%;
        }

        .setting-row-input-label {
            width: 30px;
        }
    }
</style>
