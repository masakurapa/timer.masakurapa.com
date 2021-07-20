<h3>保存済みの設定</h3>
<div>
    {#if personalTimerSettings.length > 0}
        {#each personalTimerSettings as data, idx (data.key)}
            <div class="setting-row">
                <div class="icon-text-wrapper">
                    <div
                        class="using-wrapper"
                        class:unclickable="{$isTimerRunning}"
                        on:click="{() => onClickLoadSetting(idx)}"
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
                        <div class="copy-url-wrapper" on:click="{() => onClickCopyURL(data.key)}">
                            <i class="far fa-copy fa-2x"></i>
                        </div>
                        <div class="unlink-wrapper" on:click="{() => onClickUnlinkSetting(idx)}">
                            <i class="fas fa-unlink fa-2x"></i>
                        </div>
                    {/if}

                    {#if !$isTimerRunning}
                        <div class="trash-btn-wrapper" on:click="{() => onClickRemoveSetting(idx)}">
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

<MessageBox message="{message}" show={showMessageBox}/>

<script lang="ts">
    import type {
        PersonalTimerSetting,
    } from '../../../types/local_timer';

    import { deleteSetting } from '../../../api/api';

    import {
        currentPersonalSettingPosition,
        resetAll,
        switchPersonalSetting,
        uid,
        usePersonalSetting,
    } from '../../../store/storage';
    import { isTimerRunning } from '../../../store/timer';
    import {
        personalTimerSetting,
        resetPersonalTimerSetting,
    } from '../../../store/setting';
    import {
        getTimerSetting,
        removeTimerSetting,
        saveTimerSetting,
        saveTimerSettingKey,
    } from '../../../storage';

    import CopyUrl from '../CopyURL.svelte';
    import MessageBox from '../MessageBox.svelte';

    /** タイマー設定のリスト */
    export let personalTimerSettings: PersonalTimerSetting[] = [];

    // メッセージボックスに表示するメッセージ
    let message = '';
    // メッセージボックスの表示判定
    let showMessageBox = false;

    // メッセージを1秒表示させる
    const showMessage = (text: string): void => {
        message = text;
        showMessageBox = true;
        setTimeout((): void => {
            showMessageBox = false;
            message = '';
        }, 1000);
     };

     // 設定を読み込み
     const onClickLoadSetting = async (no: number): Promise<void> => {
        if ($isTimerRunning) {
            return;
        }

        // 現在の選択位置と同じなら設定解除する
        if (no === $currentPersonalSettingPosition) {
            resetPersonalTimerSetting();
            resetAll();
            // 最後にアクセスした設定のキーを保存しておく
            saveTimerSettingKey('');

            showMessage('Removed !!!!!');
            return;
        }

        const setting = personalTimerSettings[no];
        personalTimerSetting.set(setting);

        switchPersonalSetting(no);

        // 最後にアクセスした設定のキーを保存しておく
        saveTimerSettingKey(setting.key);

        showMessage('Loaded !!!!!');
     };

     // 設定を削除
     const onClickRemoveSetting = async (no: number): Promise<void> => {
        const setting = personalTimerSettings[no];
        if (!confirm(`Delete '${setting.name}'.\nAre you sure?`)) {
            return;
        }

        // 共有済みの設定も削除する
        // エラーは無視
        if (setting.shared) {
            await deleteSetting($uid, setting.key);
        }

        // ローカルストレージの設定を削除
        removeTimerSetting(no);
        // ローカルストレージの情報を上書き
        personalTimerSettings = getTimerSetting().settings;

        // 個人設定を使っていれば現在位置を再設定
        if (!$usePersonalSetting) {
            return;
        }

        // 現在読み込まれている設定が削除対象の場合
        // キーと設定名を削除しておく
        if (no === $currentPersonalSettingPosition) {
            $personalTimerSetting.key = '';
            $personalTimerSetting.name = '';

            saveTimerSettingKey('');
        }

        const key = $personalTimerSetting.key;
        let pos = -1;
        for (let i = 0; i < personalTimerSettings.length; i++) {
            if (personalTimerSettings[i].key === key) {
                pos = i;
                break;
            }
        }

        currentPersonalSettingPosition.set(pos);

     };

     // シェア済みのURLを無効化する
     const onClickUnlinkSetting = async (no: number): Promise<void> => {
        if ($isTimerRunning) {
            return;
        }

        const setting = personalTimerSettings[no];
        if (!confirm(`Unlink '${setting.name}'.\nAre you sure?`)) {
            return;
        }

        const resp = await deleteSetting($uid, setting.key);
        if (!resp.isSuccess()) {
            alert(resp.errors().join('\n'));
            return;
        }

        // シェアフラグをoff
        setting.shared = false;
        saveTimerSetting(no, setting);

        // ローカルストレージの情報を上書き
        personalTimerSettings = getTimerSetting().settings;

        showMessage('Unlinked !!!!!');
     };

     // URLをクリップボードにURLをコピーする
     const onClickCopyURL = (key: string): void => {
        const elm = document.getElementById('clipboard');
        if (elm === null) {
            return;
        }

        const app = new CopyUrl({
            target: elm,
            props: { key },
        });
        app.$destroy();

        // メッセージを1秒表示させる
        showMessage('Copied !!!!!');
     };
</script>

<style>
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
