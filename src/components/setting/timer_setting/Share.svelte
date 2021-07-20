<Collapse key="share-setting" open={$personalTimerSetting.owner}>
    <span slot="header">設定の保存・共有</span>

    <div slot="content">
        <div class="setting-name-wrapper">
            <input
                type="text"
                placeholder="設定名"
                class="setting-name"
                bind:value="{$personalTimerSetting.name}"
            >
        </div>

        <div class="button-group">
            <div class="button-wrapper">
                {#if showSaveBtn}
                    <div
                        class="btn"
                        on:click="{onClickSaveLocalStorage}"
                    >
                        <i class="far fa-save fa-2x"></i>設定を保存
                    </div>
                {:else}
                    <div
                        class="btn"
                        on:click="{onClickOverwriteLocalStorage}"
                    >
                        <i class="far fa-save fa-2x"></i>設定を上書き
                    </div>
                {/if}
            </div>
            <div class="button-wrapper">
                {#if showShareBtn}
                    <div
                        class="btn"
                        on:click="{onClickSaveShareSetting}"
                    >
                        <i class="far fa-share-square fa-2x"></i>設定の共有
                    </div>
                {:else}
                    <div
                        class="btn"
                        on:click="{onClickCopyURL}"
                    >
                        <i class="fas fa-link fa-2x"></i>URLをコピー
                    </div>
                {/if}

            </div>
        </div>
    </div>
</Collapse>

<MessageBox message="{message}" show="{showMessageBox}"></MessageBox>

<script lang="ts">
    import { v4 as uuidv4 } from 'uuid';

    import { saveSetting } from '../../../api/api';

    import {
        personalTimerSetting,
    } from '../../../store/setting';
    import {
        uid,
        currentPersonalSettingPosition,
        usePersonalSetting,
        switchPersonalSetting,
    } from '../../../store/storage';
    import {
        addTimerSetting,
        saveTimerSetting,
        saveTimerSettingKey,
    } from '../../../storage';

    import Collapse from './Collapse.svelte';
    import MessageBox from '../MessageBox.svelte';
    import CopyUrl from '../CopyURL.svelte';

    // メッセージボックスの制御用
    let message = '';
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

    // ローカルストレージに新規保存する
    const addPersonalSetting = (): void => {
        const timerSettingKey = uuidv4();
        $personalTimerSetting.key = timerSettingKey;
        if ($personalTimerSetting.name === '') {
            $personalTimerSetting.name = timerSettingKey;
        }

        const pos = addTimerSetting($personalTimerSetting);
        saveTimerSettingKey(timerSettingKey);

        switchPersonalSetting(pos);
    };

    // ローカルストレージに新規保存する
    const onClickSaveLocalStorage = (): void => {
        addPersonalSetting();
        showMessage('Saved !!!!!');
    };

    // ローカルストレージの設定を上書きする
    const onClickOverwriteLocalStorage = async (): Promise<void> => {
        if ($personalTimerSetting.name === '') {
            $personalTimerSetting.name = $personalTimerSetting.key;
        }

        const setting = $personalTimerSetting;
        saveTimerSetting($currentPersonalSettingPosition, setting);

        // 共有済みの設定も更新する
        if (setting.shared) {
            const resp = await saveSetting($uid, setting);
            if (!resp.isSuccess()) {
                alert(resp.errors().join('\n'));
                return;
            }
        }

        showMessage('Saved !!!!!');
    };

    // 設定をシェアする
    const onClickSaveShareSetting = async (): Promise<void> => {
        // ローカルストレージに未保存なら先に保存する
        if ($personalTimerSetting.key === '') {
            addPersonalSetting();
        }

        $personalTimerSetting.shared = true;
        const setting = $personalTimerSetting;

        const resp = await saveSetting($uid, setting);
        if (!resp.isSuccess()) {
            alert(resp.errors().join('\n'));
            return;
        }

        saveTimerSetting($currentPersonalSettingPosition, setting);

        copyURL();
        showMessage('Shared !!!!!');
    };

     // URLをクリップボードにURLをコピーする
    const copyURL = (): void => {
        const elm = document.getElementById('clipboard');
        if (elm === null) {
            return;
        }

        const app = new CopyUrl({
            target: elm,
            props: {
                key: $personalTimerSetting.key,
            },
        });
        app.$destroy();
     };

     // 個人設定のURLをクリップボードにURLをコピーする
     const onClickCopyURL = (): void => {
        copyURL();
        showMessage('Copied !!!!!');
     };

     // 新規保存可能な状態の場合true
     $: showSaveBtn = !$usePersonalSetting || $personalTimerSetting.key === '';

     // シェアボタンを表示する場合はtrue
     $: showShareBtn = $usePersonalSetting
        && $personalTimerSetting.shared === false;
</script>

<style>
    .setting-name-wrapper {
        margin-bottom: 12px;
    }

    .setting-name {
        height: 32px;
        width: 90%;
    }

    .button-group {
        display: flex;
        width: 100%;
        padding: 4px 0;
        border-top: 1px solid #AAAAAA;
        border-bottom: 1px solid #AAAAAA;
    }
    .button-wrapper {
        width: calc(100% / 2);
        padding: 0 4px;
    }

    .btn i {
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
    }

    .btn {
        display: flex;
        width: 100%;
        height: 50px;
        border-radius: 8px;
        cursor: pointer;
        justify-content: center;
        align-items: center;
    }
    .btn:hover {
        background-color: #DDDDDD;
    }
    .btn:disabled {
        background-color: #999999;
        cursor: default;
    }
</style>
