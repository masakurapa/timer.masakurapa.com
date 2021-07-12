<div class="wrapper">
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

    <h3>My Settings</h3>
    <div>
        {#if timerSetting && timerSetting.settings.length > 0}
            {#each timerSetting.settings as data, idx (data.key)}
                <div class="setting-row">
                    <div class="icon-text-wrapper">
                        <div
                            class="using-wrapper"
                            class:unclickable="{$isTimerRunning}"
                            on:click="{() => onClickLoadPersonalSetting(idx)}"
                        >
                            {#if $usePersonalSetting && idx === $currentPersonalSettingPosition}
                                <i class="fas fa-check-square fa-2x"></i>
                            {:else}
                                <i class="far fa-square fa-2x"></i>
                            {/if}
                        </div>
                        <div class="setting-name-wrapper">{data.name}</div>
                        <div class="shared-mark-wrapper">
                            {#if data.shared}
                                <i class="fas fa-users"></i>
                            {/if}
                        </div>
                    </div>
                    <div class="btn-wrapper">
                        {#if data.shared}
                            <div class="copy-url-wrapper" on:click="{() => onClickCopyPersonalSettingURL(idx)}">
                                <i class="far fa-copy fa-2x"></i>
                            </div>
                            <div class="unlink-wrapper" on:click="{() => onClickUnlinkPersonalSetting(idx)}">
                                <i class="fas fa-unlink fa-2x"></i>
                            </div>
                        {/if}

                        {#if !$isTimerRunning}
                            <div class="trash-btn-wrapper" on:click="{() => onClickRemovePersonalSetting(idx)}">
                                <i class="far fa-trash-alt fa-2x"></i>
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
    <div>
        {#if timerSetting && timerSetting.histories.length > 0}
            {#each timerSetting.histories as data, idx (data.key)}
                <div class="setting-row">
                    <div class="icon-text-wrapper">
                        <div
                            class="using-wrapper"
                            class:unclickable="{$isTimerRunning}"
                            on:click="{() => onClickLoadSharedSetting(idx)}"
                        >
                            {#if !$usePersonalSetting && idx === $currentSharedSettingPosition}
                                <i class="fas fa-check-square fa-2x"></i>
                            {:else}
                                <i class="far fa-square fa-2x"></i>
                            {/if}
                        </div>
                        <div class="setting-name-wrapper">{data.name}</div>
                    </div>
                    <div class="btn-wrapper">
                        <div class="copy-url-wrapper" on:click="{() => onClickCopySharedSettingURL(idx)}">
                            <i class="far fa-copy fa-2x"></i>
                        </div>
                        {#if !$isTimerRunning}
                            <div class="trash-btn-wrapper" on:click="{() => onClickRemoveSharedSetting(idx)}">
                                <i class="far fa-trash-alt fa-2x"></i>
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

<MessageBox message="{message}" show={showMessageBox}/>

<script lang="ts">
    import { onMount } from 'svelte';

    import type {
        StorageTimerSetting,
    } from '../../../types/local_timer';
    import {
        settingName,
        setTimerSetting,
        resetSettings,
    } from '../../../store/setting';
    import {
        currentPersonalSettingKey,
        currentPersonalSettingPosition,
        currentSharedSettingKey,
        currentSharedSettingPosition,
        usePersonalSetting,
        switchPersonalSetting,
        switchSharedSetting,
        resetAll,
    } from '../../../store/storage';
    import { isTimerRunning } from '../../../store/timer';
    import {
        getTimerSetting,
        removeTimerSetting,
        removeSharedTimerHistory,
        saveTimerSettingKey,
saveTimerSetting,
     } from '../../../storage';

    import CopyUrl from '../CopyURL.svelte';
    import MessageBox from '../MessageBox.svelte';

    // メッセージボックスに表示するメッセージ
    let message = '';
    // メッセージボックスの表示判定
    let showMessageBox = false;

     // ローカルストレージに保存されたタイマー設定
    let timerSetting: StorageTimerSetting;

     onMount(() => {
        timerSetting = getTimerSetting();
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
     const onClickRemovePersonalSetting = (no: number): void => {
        const setting = timerSetting.settings[no];
        if (!confirm(`Delete '${setting.name}'.\nAre you sure?`)) {
            return;
        }

        removeTimerSetting(no);
        timerSetting = getTimerSetting();

        // 個人設定を使っていれば現在位置を再設定
        if (!$usePersonalSetting) {
            return;
        }

        // 現在読み込まれている設定が削除対象の場合
        // キーと設定名を削除しておく
        if (no === $currentPersonalSettingPosition) {
            currentPersonalSettingKey.set(null);
            settingName.set('');
        }

        const key = $currentPersonalSettingKey;
        let pos: number = null;
        for (let i = 0; i < timerSetting.settings.length; i++) {
            if (timerSetting.settings[i].key === key) {
                pos = i;
                break;
            }
        }
        currentPersonalSettingPosition.set(pos);
     };

     // ローカルストレージの設定を読み込み
     const onClickLoadPersonalSetting = (no: number): void => {
        if ($isTimerRunning) {
            return;
        }

        // 現在の選択位置と同じなら設定解除する
        if (no === $currentPersonalSettingPosition) {
            resetSettings();
            resetAll();
            // 最後にアクセスした設定のキーを保存しておく
            saveTimerSettingKey('');

            showMessage('Removed !!!!!');
            return;
        }

        const setting = timerSetting.settings[no];
        setTimerSetting(setting);

        switchPersonalSetting(no, setting.key);

        // 最後にアクセスした設定のキーを保存しておく
        saveTimerSettingKey(setting.key);

        showMessage('Loaded !!!!!');
     };

     // シェア済みのURLを無効化する
     const onClickUnlinkPersonalSetting = (no: number): void => {
        if ($isTimerRunning) {
            return;
        }

        const setting = timerSetting.settings[no];
        if (!confirm(`Unlink '${setting.name}'.\nAre you sure?`)) {
            return;
        }

        // TODO: APIを実行してURLを削除

        // シェアフラグをoff
        saveTimerSetting(no, {
            key: setting.key,
            name: setting.name,
            colorSetting: setting.colorSetting,
            timerSettings: setting.timerSettings,
            shared: false,
        });
        timerSetting = getTimerSetting();

        showMessage('Unlinked !!!!!');
     };

     // 共有設定を削除
     const onClickRemoveSharedSetting = (no: number): void => {
        const setting = timerSetting.histories[no];
        if (!confirm(`Delete '${setting.name}'.\nAre you sure?`)) {
            return;
        }

        // TODO シェア済みならAPIを実行して共有設定を削除

        // 共有設定を使っていれば現在位置を再設定
        if ($usePersonalSetting) {
            return;
        }

        // 現在読み込まれている設定が削除対象の場合
        // キーと設定名を削除しておく
        if (no === $currentSharedSettingPosition) {
            currentSharedSettingKey.set(null);
        }

        removeSharedTimerHistory(no);
        timerSetting = getTimerSetting();

        const key = $currentSharedSettingKey;
        let pos: number = null;
        for (let i = 0; i < timerSetting.histories.length; i++) {
            if (timerSetting.histories[i].key === key) {
                pos = i;
                break;
            }
        }
        currentSharedSettingPosition.set(pos);
     };

     // 共有設定を読み込み
     const onClickLoadSharedSetting = (no: number): void => {
        if ($isTimerRunning) {
            return;
        }

        // 現在の選択位置と同じなら設定解除する
        if (no === $currentSharedSettingPosition) {
            resetSettings();
            resetAll();
            // 最後にアクセスした設定のキーを保存しておく
            saveTimerSettingKey('');

            showMessage('Removed !!!!!');
            return;
        }

        const setting = timerSetting.histories[no];

        // TODO: API通信して設定を持ってくる
        // setTimerSetting();
        settingName.set(setting.name);

        switchSharedSetting(no, setting.key);

        // 最後にアクセスした設定のキーを保存しておく
        saveTimerSettingKey(setting.key);

        showMessage('Loaded !!!!!');
     };

     // URLをクリップボードにURLをコピーする
     const copyURL = (key: string): void => {
        const app = new CopyUrl({
            target: document.getElementById('clipboard'),
            props: { key },
        });
        app.$destroy();

        // メッセージを1秒表示させる
        showMessage('Copied !!!!!');
     };

     // 個人設定のURLをクリップボードにURLをコピーする
     const onClickCopyPersonalSettingURL = (no: number): void => {
        const setting = timerSetting.settings[no];
        copyURL(setting.key);
     };

     // 共有設定のURLをクリップボードにURLをコピーする
     const onClickCopySharedSettingURL = (no: number): void => {
        const setting = timerSetting.histories[no];
        copyURL(setting.key);
     };
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        max-width: 800px;
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
        margin-right: 12px;
    }

    .using-wrapper {
        width: 28px;
        margin-right: 12px;
        color: #00AE95;
        cursor: pointer;
    }
    .unclickable {
        cursor: default;
    }

    .shared-mark-wrapper {
        width: 20px;
        color: #87ceeb;
    }
    .copy-url-wrapper {
        width: 28px;
        margin-right: 12px;
        color: #87ceeb;
        cursor: pointer;
    }
    .unlink-wrapper {
        width: 32px;
        margin-right: 24px;
        color: #DC143C;
        cursor: pointer;
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
            margin-right: 0;
        }
        .using-wrapper {
            margin-right: 8px;
        }
        .btn-wrapper {
            justify-content: flex-end;
        }
    }
</style>
