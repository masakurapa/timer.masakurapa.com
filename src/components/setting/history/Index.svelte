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
                            {#if idx === $currentSharedSettingPosition}
                                <i class="fas fa-hand-point-right fa-2x"></i>
                            {/if}
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
                        <button class="copy-btn" on:click="{() => onClickCopyURL(idx)}">Copy URL</button>
                        <button class="load-btn" on:click="{() => onClickLoadSharedSetting(idx)}">Load</button>
                        <div class="trash-btn-wrapper" on:click="{() => onClickRemoveSharedSetting(idx)}">
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

<MessageBox message="{message}" show={showMessageBox}/>

<script lang="ts">
    import { onMount } from 'svelte';
    import type { StorageLocalTimerSetting } from '../../../types/local_timer';
    import type { StorageSharedTimerSetting } from '../../../types/shared_timer';

    import {
        currentSettingPosition,
        currentSharedSettingPosition,
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
        getSharedTimerSetting,
        removeSharedTimerSetting,
        saveTimerSettingKey,
     } from '../../../storage';

    import CopyUrl from '../CopyURL.svelte';
    import MessageBox from '../MessageBox.svelte';

    // メッセージボックスに表示するメッセージ
    let message = '';
    // メッセージボックスの表示判定
    let showMessageBox = false;

     // ローカルストレージに保存されたローカル設定
    let localTimerSetting: StorageLocalTimerSetting;
    // ローカルストレージに保存されたシェア設定
    let sharedTimerSetting: StorageSharedTimerSetting;

     onMount(() => {
        localTimerSetting = getTimerSetting();
        sharedTimerSetting = getSharedTimerSetting();
     });

    // メッセージを1秒表示させる
    const showMessage = (text: string): void => {
        message = text;
        showMessageBox = true;
        setTimeout((): void => {
            showMessageBox = false;
            message = '';
        }, 1000);
     };

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
        currentSharedSettingPosition.set(null);
        settingKey.set(setting.key);
        settingName.set(setting.name);
        colorSetting.set(setting.colorSetting);
        timerSettings.set(setting.timerSettings);

        // 最後にアクセスした設定のキーを保存しておく
        saveTimerSettingKey(setting.key);

        showMessage('Loaded !!!!!');
     };

     // シェア用のローカルストレージの設定を削除
     const onClickRemoveSharedSetting = (no: number): void => {
        const setting = sharedTimerSetting.settings[no];
        if (!confirm(`Delete '${setting.name}'.\nAre you sure?`)) {
            return;
        }

        removeSharedTimerSetting(no);
        currentSettingPosition.set(null);
        sharedTimerSetting = getSharedTimerSetting();
     };

     // シェア用のローカルストレージの設定を読み込み
     const onClickLoadSharedSetting = (no: number): void => {
        const setting = sharedTimerSetting.settings[no];
        currentSettingPosition.set(null);
        currentSharedSettingPosition.set(no);

        // TODO: API通信して設定を持ってくる

        settingKey.set(setting.key);
        settingName.set(setting.name);
        // colorSetting.set(setting.colorSetting);
        // timerSettings.set(setting.timerSettings);

        // 最後にアクセスした設定のキーを保存しておく
        saveTimerSettingKey(setting.key);

        showMessage('Loaded !!!!!');
     };

     // クリップボードにURLをコピーする
     const onClickCopyURL = (no: number): void => {
        const setting = sharedTimerSetting.settings[no];
        const app = new CopyUrl({
            target: document.getElementById('clipboard'),
            props: { key: setting.key },
        });
        app.$destroy();

        // メッセージを1秒表示させる
        showMessage('Copied !!!!!');
     };
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        max-width: 600px;
    }
    .hide {
        display: none !important;
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
        align-items: center;
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
        width: 40px;
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
        .using-mark-wrapper {
            margin-right: 8px;
        }
        .owner-mark-wrapper {
            margin-right: 8px;
        }
        .setting-name-wrapper {
            /* width: 250px; */
            margin-right: 0;
        }
        .btn-wrapper {
            justify-content: flex-end;
        }
    }
</style>
