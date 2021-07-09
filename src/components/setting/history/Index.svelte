<div class="wrapper">
    <h3>Local Settings</h3>
    <div>
        {#if localTimerSetting && localTimerSetting.settings.length > 0}
            {#each localTimerSetting.settings as data, idx (data.key)}
                <div class="setting-row">
                    <div class="icon-text-wrapper">
                        <div class="using-mark-wrapper">
                            {#if idx === $currentSettingPosition}
                                <i class="fas fa-hand-point-right fa-2x"></i>
                            {/if}
                        </div>
                        <div class="setting-name-wrapper">{data.name}</div>
                    </div>
                    <div class="btn-wrapper">
                        {#if !$isTimerRunning}
                            <button class="load-btn" on:click="{() => onClickLoadLocalSetting(idx)}">Load</button>
                            <div class="trash-btn-wrapper" on:click="{() => onClickRemoveLocalSetting(idx)}">
                                <i class="fas fa-trash-alt fa-2x"></i>
                            </div>
                        {/if}
                    </div>
                </div>
            {/each}
        {:else}
            <div class="no-settings">No Settings</div>
        {/if}
    </div>
</div>

<div class="wrapper">
    <h3>Shared Settings</h3>
    <div class="legend">
        <div class="legend-row">
            <div class="legend-owner-mark-wrapper"><i class="fas fa-user-edit"></i></div>
            <div class="legend-text">This is the setting you have shared. (editable)</div>
        </div>
        <div class="legend-row">
            <div class="legend-owner-mark-wrapper"><i class="fas fa-history"></i></div>
            <div class="legend-text">This is the access history of the settings managed by others.</div>
        </div>
    </div>

    <div>
        {#if sharedTimerSetting && sharedTimerSetting.settings.length > 0}
            {#each sharedTimerSetting.settings as data, idx (data.key)}
                <div class="setting-row">
                    <div class="icon-text-wrapper">
                        <div class="using-mark-wrapper">
                            <i class="fas fa-hand-point-right fa-2x"></i>
                        </div>
                        <div class="owner-mark-wrapper">
                            {#if data.owner}
                                <i class="fas fa-user-edit fa-2x"></i>
                            {:else}
                                <i class="fas fa-history fa-2x"></i>
                            {/if}
                        </div>
                        <div class="setting-name-wrapper">{data.name}</div>
                    </div>
                    <div class="btn-wrapper">
                        <button class="load-btn">Load</button>
                        <button class="copy-btn">Copy URL</button>
                        <div class="trash-btn-wrapper">
                            <i class="fas fa-trash-alt fa-2x"></i>
                        </div>
                    </div>
                </div>
            {/each}
        {:else}
            <div class="no-settings">No Settings</div>
        {/if}
    </div>
</div>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { StorageLocalTimerSetting } from '../../../types/local_timer';
    import type { StorageSharedTimerSetting } from '../../../types/shared_timer';

    import {
        currentSettingPosition,
        settingKey,
        settingName,
        colorSetting,
        timerSettings,
    } from '../../../store/setting';
    import {
        isTimerRunning,
    } from '../../../store/state';
    import {
        getTimerSetting,
        removeTimerSetting,
        saveTimerSettingKey,
     } from '../../../storage';

     // ローカルストレージに保存されたローカル設定
    let localTimerSetting: StorageLocalTimerSetting;
     // ローカルストレージに保存されたシェア設定
     let sharedTimerSetting: StorageSharedTimerSetting = {
         settings: [
            {key: 'hoge1', name: '996da063-5b6e-42c6-8d87-acf464e95fa7', owner: true},
            {key: 'hoge2', name: '996da063-5b6e-42c6-8d87-acf464e95fa7', owner: false},
        ],
     };

     onMount(() => {
        localTimerSetting = getTimerSetting();
     });

     // ローカルストレージの設定を削除
     const onClickRemoveLocalSetting = (no: number): void => {
        const setting = localTimerSetting.settings[no];
        if (!confirm(`Delete '${setting.name}'.\nAre you sure?`)) {
            return;
        }

        removeTimerSetting(no);
        currentSettingPosition.set(null);
        localTimerSetting = getTimerSetting();
     };

     // ローカルストレージの設定を読み込み
     const onClickLoadLocalSetting = (no: number): void => {
        const setting = localTimerSetting.settings[no];
        currentSettingPosition.set(no);
        settingKey.set(setting.key);
        settingName.set(setting.name);
        colorSetting.set(setting.colorSetting);
        timerSettings.set(setting.timerSettings);

        // 最後にアクセスした設定のキーを保存しておく
        saveTimerSettingKey(setting.key);
     };
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        max-width: 600px;
    }

    .no-settings {
        min-height: 50px;
        line-height: 50px;
        border: 1px solid #000000;
        padding: 12px;
        border-radius: 8px;
    }

    .setting-row {
        display: flex;
        min-height: 50px;
        border: 1px solid #000000;
        background-color: #FFFFFF;
        padding: 12px;
    }
    .setting-row:first-child {
        border-radius: 8px 8px 0 0;
    }
    .setting-row:not(:first-child) {
        border-top: none;
    }
    .setting-row:last-child {
        border-radius: 0 0 8px 8px;
    }
    .setting-row:only-child {
        border-radius: 8px;
    }

    .icon-text-wrapper {
        display: flex;
        align-items: center;
    }

    .using-mark-wrapper {
        width: 32px;
        margin-right: 12px;
        color: #00AE95;
    }
    .owner-mark-wrapper {
        width: 32px;
        margin-right: 12px;
        color: #87ceeb;
    }
    .setting-name-wrapper {
        margin-right: 12px;
        word-break: break-all;
    }

    .btn-wrapper {
        display: flex;
        margin-left: auto;
        align-items: center;
    }
    .trash-btn-wrapper {
        cursor: pointer;
        color: #DC143C;
    }

    .load-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 60px;
        height: 40px;
        margin-right: 12px;
    }
    .copy-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 80px;
        height: 40px;
        margin-right: 12px;
    }

    button:hover {
        background-color: #DDDDDD;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }

    /**
     * 凡例
     */
    .legend {
        margin-bottom: 12px;
        font-size: 16px;
    }
    .legend-row {
        display: flex;
    }
    .legend-row:first-child {
        margin-bottom: 4px;
    }
    .legend-owner-mark-wrapper {
        color: #87ceeb;
        width: 24px;
    }
    .legend-text {
        color: #666666;
    }

    @media (max-width: 500px) {
        .setting-row {
            display: block;
        }
        .icon-text-wrapper {
            margin-bottom: 12px;
        }
        .btn-wrapper {
            justify-content: flex-end;
        }
    }
</style>
