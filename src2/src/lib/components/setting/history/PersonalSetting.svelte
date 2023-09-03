<h3>保存済みの設定</h3>
<div class="wrapper">
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
                            <i class="fas fa-link fa-2x"></i>
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
    } from '$lib/types/local_timer';

    import { deleteSetting } from '$lib/api/api';

    import {
        currentPersonalSettingPosition,
        resetAll,
        switchPersonalSetting,
        uid,
        usePersonalSetting,
    } from '$lib/store/storage';
    import { isTimerRunning } from '$lib/store/timer';
    import {
        personalTimerSetting,
        resetPersonalTimerSetting,
    } from '$lib/store/setting';
    import {
        getTimerSetting,
        removeTimerSetting,
        saveTimerSetting,
        saveTimerSettingKey,
    } from '$lib/storage';

    import CopyUrl from '$lib/components/setting/CopyURL.svelte';
    import MessageBox from '$lib/components/setting/MessageBox.svelte';

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
        }, 1500);
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

            showMessage('削除しました！！');
            return;
        }

        const setting = personalTimerSettings[no];
        personalTimerSetting.set(setting);

        switchPersonalSetting(no);

        // 最後にアクセスした設定のキーを保存しておく
        saveTimerSettingKey(setting.key);

        showMessage('設定を反映しました！');
     };

     // 設定を削除
     const onClickRemoveSetting = async (no: number): Promise<void> => {
        const setting = personalTimerSettings[no];
        if (!confirm(`'${setting.name}'を削除します。\nシェア済みの場合はシェアしたURLも使用できなくなります。\nよろしいですか？`)) {
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
        if (!confirm(`'${setting.name}'のシェア済みのURLを削除します。\nよろしいですか？`)) {
            return;
        }

        const resp = await deleteSetting($uid, setting.key);
        if (!resp.isSuccess()) {
            alert(resp.errors().join('\n'));
            return;
        }

        // 今使っている設定のシェア解除の場合は、ストアも書き換える
        if (no === $currentPersonalSettingPosition) {
            $personalTimerSetting.shared = false;
        }

        // シェアフラグをoff
        setting.shared = false;
        saveTimerSetting(no, setting);

        // ローカルストレージの情報を上書き
        personalTimerSettings = getTimerSetting().settings;

        showMessage('URLを削除しました！！');
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
        showMessage('コピーしました！！');
     };
</script>

<style>
    .wrapper {
        box-shadow: 4px 4px 8px 0 rgb(50, 50, 50, 0.5);
        border: 1px solid #000000;
        background-color: #FFFFFF;
        border-radius: 8px;
    }

    .no-settings {
        min-height: 50px;
        line-height: 50px;
        padding: 12px;
        border-radius: 8px;
    }

    .setting-row {
        display: flex;
        align-items: center;
        min-height: 50px;
        padding: 12px;
    }
    .setting-row:not(:first-child) {
        border-top: 1px solid #000000;
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
