<h3>アクセス履歴</h3>
<div class="wrapper">
    {#if timerHistories.length > 0}
        {#each timerHistories as data, idx (data.key)}
            <div class="setting-row">
                <div class="icon-text-wrapper">
                    <div
                        class="using-wrapper"
                        class:unclickable="{$isTimerRunning}"
                        on:click="{() => onClickLoadSetting(idx)}"
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
                    <div class="copy-url-wrapper" on:click="{() => onClickCopyURL(data.key)}">
                        <i class="fas fa-link fa-2x"></i>
                    </div>
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
        SharedTimerHistory,
    } from '$lib/types/local_timer';

    import { getSetting } from '$lib/api/api';

    import {
        personalTimerSetting,
        resetPersonalTimerSetting,
    } from '$lib/store/setting';
    import {
        uid,
        currentSharedSettingPosition,
        usePersonalSetting,
        switchSharedSetting,
        resetAll,
    } from '$lib/store/storage';
    import { isTimerRunning } from '$lib/store/timer';

    import {
        getTimerSetting,
        removeSharedTimerHistory,
        saveTimerSettingKey,
    } from '$lib/storage';

    import CopyUrl from '$lib/components/setting/CopyURL.svelte';
    import MessageBox from '$lib/components/setting/MessageBox.svelte';

    // メッセージボックスに表示するメッセージ
    let message = '';
    // メッセージボックスの表示判定
    let showMessageBox = false;

    /** タイマー設定のリスト */
    export let timerHistories: SharedTimerHistory[] = [];

    // メッセージを1秒表示させる
    const showMessage = (text: string): void => {
        message = text;
        showMessageBox = true;
        setTimeout((): void => {
            showMessageBox = false;
            message = '';
        }, 1500);
     };

     // 共有設定を読み込み
     const onClickLoadSetting = async (no: number): Promise<void> => {
        if ($isTimerRunning) {
            return;
        }

        // 現在の選択位置と同じなら設定解除する
        if (no === $currentSharedSettingPosition) {
            resetPersonalTimerSetting();
            resetAll();
            // 最後にアクセスした設定のキーを保存しておく
            saveTimerSettingKey('');

            showMessage('削除しました！！');
            return;
        }

        const setting = timerHistories[no];

        const resp = await getSetting($uid, setting.key);
        if (!resp.isSuccess() || resp.data === null) {
            alert(resp.errors().join('\n'));
            return;
        }

        personalTimerSetting.set(resp.data.setting);
        switchSharedSetting(no);

        // 最後にアクセスした設定のキーを保存しておく
        saveTimerSettingKey(setting.key);

        showMessage('設定を反映しました！');
     };

     // 共有設定を削除
     const onClickRemoveSetting = (no: number): void => {
        const setting = timerHistories[no];
        if (!confirm(`履歴から'${setting.name}'を削除します。\nよろしいですか？`)) {
            return;
        }

        // 共有設定を使っていれば現在位置を再設定
        if ($usePersonalSetting) {
            return;
        }

        // 現在読み込まれている設定が削除対象の場合
        // キーと設定名を削除しておく
        if (no === $currentSharedSettingPosition) {
            $personalTimerSetting.key = '';
            $personalTimerSetting.name = '';

            saveTimerSettingKey('');
        }

        removeSharedTimerHistory(no);
        // ローカルストレージの情報を上書き
        timerHistories = getTimerSetting().histories;

        const key = $personalTimerSetting.key;
        let pos = -1;
        for (let i = 0; i < timerHistories.length; i++) {
            if (timerHistories[i].key === key) {
                pos = i;
                break;
            }
        }
        currentSharedSettingPosition.set(pos);
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

    .copy-url-wrapper {
        width: 28px;
        margin-right: 12px;
        color: #87ceeb;
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
        margin-left: 24px;
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
