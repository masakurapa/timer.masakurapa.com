<h2>Timer Setting</h2>

<div class="wrapper">
    <div class="remove-all-btn-wrapper">
        <button class="remove-all-btn" on:click="{onClickRemoveAll}">Remove All</button>
    </div>

    <div class="total">
        Tolal: {padding(totalTime.hour)}:{padding(totalTime.minute)}:{padding(totalTime.second)}
    </div>

    <div>
        <div class="setting-add-wrapper">
            <div class="setting-add-btn-wrapper" on:click="{() => addTimerSetting(0)}">
                <i class="fas fa-plus-circle fa-2x"></i>
            </div>
        </div>

        {#each $timerSettings as setting, idx (idx)}
            <div class="setting-row">
                <div class="setting-row-remove-btn-wrapper" on:click="{() => onClickRemoveSetting(idx)}">
                    <i class="fas fa-times fa-2x"></i>
                </div>
                <div class="setting-row-input-wrapper">
                    <div class="clear-btn-wrapper" on:click="{() => onClickEraseSetting(idx)}">
                        <i class="fas fa-eraser fa-2x"></i>
                    </div>

                    <div class="setting-row-input-group">
                        <div class="setting-row-input-label">Title:</div>
                        <div class="setting-row-input-text">
                            <input type="text" class="setting-row-input-title" bind:value="{setting.title}">
                        </div>
                    </div>
                    <div class="setting-row-input-group">
                        <div class="setting-row-input-label">Hours:</div>
                        <div class="setting-row-input-number">
                            <input type="number" min="0" max="24" bind:value="{setting.timer.hour}">
                        </div>
                        <div class="setting-row-input-range">
                            <input type="range" min="0" max="24" step="1" bind:value="{setting.timer.hour}">
                        </div>
                    </div>
                    <div class="setting-row-input-group">
                        <div class="setting-row-input-label">Minutes:</div>
                        <div class="setting-row-input-number">
                            <input type="number" min="0" max="59" bind:value="{setting.timer.minute}">
                        </div>
                        <div class="setting-row-input-range">
                            <input type="range" min="0" max="59" step="1" bind:value="{setting.timer.minute}">
                        </div>
                    </div>
                    <div class="setting-row-input-group">
                        <div class="setting-row-input-label">Seconds:</div>
                        <div class="setting-row-input-number">
                            <input type="number" min="0" max="59" bind:value="{setting.timer.second}">
                        </div>
                        <div class="setting-row-input-range">
                            <input type="range" min="0" max="59" step="1" bind:value="{setting.timer.second}">
                        </div>
                    </div>
                </div>
            </div>

            <div class="setting-add-wrapper">
                <div class="setting-add-btn-wrapper" on:click="{() => addTimerSetting(idx + 1)}">
                    <i class="fas fa-plus-circle fa-2x"></i>
                </div>
            </div>
        {/each}
    </div>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { TimerSetting, Timer } from '../../../types/local_timer';
    import { timerSettings } from '../../../store/setting';
    import { padding, calcTotalTime } from '../../../util';

    // 全タイマーの合計時間
    let totalTime: Timer = { hour: 0, minute: 0, second: 0 };

    /**
     * 指定位置にタイマーの設定を追加します
     */
    const addTimerSetting = (no: number): void => {
        timerSettings.update(settings => {
            const defaultTimerSetting: TimerSetting = {
                title: '',
                timer: { hour: 0, minute: 0, second: 0 },
            };

            if (no === 0) {
                settings.unshift(defaultTimerSetting);
            } else if (no === settings.length) {
                settings.push(defaultTimerSetting);
            } else {
                settings.splice(no, 0, defaultTimerSetting);
            }
            return settings;
        });
    };

    /**
     * 指定位置のタイマー設定をデフォルト値に戻します
     */
    const onClickEraseSetting = (no: number): void => {
        timerSettings.update(settings => {
            settings[no].title = '';
            settings[no].timer = { hour: 0, minute: 0, second: 0 };
            return settings;
        });
    }

    /**
     * 指定位置のタイマー設定を削除します
     */
     const onClickRemoveSetting = (no: number): void => {
        timerSettings.update(settings => {
            settings.splice(no, 1);
            return settings;
        });
    }

    /**
     * 全てのタイマー設定を削除します
     * タイマー設定は最低1つ存在するようにするため先頭に行を追加します
     */
     const onClickRemoveAll = (): void => {
        if (!confirm('Delete all settings.\nAre you sure?')) {
            return;
        }

        timerSettings.set([]);
        addTimerSetting(0);
    }

    // タイマー設定は最低1つ存在するようにするため
    // マウント時に設定が空なら先頭に行を追加しておく
    onMount(() => {
        if ($timerSettings.length === 0) {
            addTimerSetting(0);
        }
    });

    timerSettings.subscribe(settings => {
        // 全設定の合計時間を求める
        totalTime = calcTotalTime(settings);
    });
</script>

<style>
    .wrapper {
        max-width: 800px;
    }

    /**
     * 合計時間
     */
    .total {
        height: 32px;
        line-height: 32px;
        width: 180px;
        margin-left: auto;
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
     * Remove Allボタン
     */
    .remove-all-btn-wrapper {
        width: 100%;
        text-align: right;
        margin-bottom: 32px;
    }
    .remove-all-btn {
        color: #FFFFFF;
        background-color: #DC3545;
        width: 200px;
    }
    .remove-all-btn:hover {
        background-color: #CB2434;
    }
    .remove-all-btn:disabled {
        background-color: #999999;
        cursor: default;
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

    /**
     * 設定の1行
     */
    .setting-row {
        display: flex;
        padding-left: 12px;
        margin-bottom: 12px;
        align-items: center;
    }
    .setting-row-remove-btn-wrapper {
        width: 32px;
        color: #DC3545;
        cursor: pointer;
    }
    .setting-row-input-wrapper {
        width: 100%;
        min-width: 300px;
        border: 1px solid #000000;
        border-radius: 8px;
        margin-left: 12px;
        padding: 8px;
        position: relative;
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
        width: 50%;
    }
    .setting-row-input-group:last-child {
        margin-bottom: 0px;
    }
    .setting-row-input-label {
        width: 100px;
    }
    .setting-row-input-title {
        width: calc(100% - 40px);
    }

    /**
     * スライダー
     */
    input[type=range] {
        width: 100%;
        -webkit-appearance: none;
        border: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
        width: 300px;
        height: 1em;
        background: #ddd;
        border: none;
        border-radius: 3px;
    }
    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        background: #1976d2;
        margin-top: -5px;
    }
    input[type=range]:disabled::-webkit-slider-thumb {
        background: #eee;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
        background: #ccc;
    }

    @media (max-width: 500px) {
        .remove-all-btn {
            width: 150px;
            min-width: 150px;
        }
    }

    @media (max-width: 550px) {
        input[type=range] {
            width: 100px;
        }
    }
</style>
