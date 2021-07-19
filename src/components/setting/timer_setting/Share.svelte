<Collapse key="share-setting" open>
    <span slot="header">Save Setting</span>

    <div slot="content">
        <div class="setting-name-wrapper">
            <div class="label">Setting Name:</div>
            <div class="input-name-wrapper">
                <input type="text" class="setting-name" bind:value="{$personalTimerSetting.name}" >

                {#if showShareBtn }
                    <div class="share-button-wrapper" on:click="{onClickSaveShareSetting}">
                        <i class="fas fa-share-square fa-2x"></i>
                    </div>
                {/if}
            </div>
        </div>

        <div class="button-wrapper">
            {#if !saved}
                <button
                    class="save-btn"
                    on:click="{onClickSaveLocalStorage}"
                >
                    Save Setting
                </button>
            {:else}
                <button
                    class="save-btn"
                    on:click="{onClickOverwriteLocalStorage}"
                >
                    Overwrite Setting
                </button>
            {/if}
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

        switchPersonalSetting(pos, timerSettingKey);
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

        showMessage('Shared !!!!!');
    };

    //保存済みの設定の場合true
    $: saved = !$usePersonalSetting || $personalTimerSetting.key !== '';

    // シェアボタンを表示する場合true
    // 個人設定利用時で、ローカルストレージに保存済みの場合だけ
    $: showShareBtn = $usePersonalSetting && $personalTimerSetting.key !== '';
</script>

<style>
    .setting-name-wrapper {
        margin-bottom: 12px;
    }
    .button-wrapper {
        display: flex;
        margin-bottom: 12px;
    }
    .share-button-wrapper {
        margin-left: 4px;
        width: 32px;
        color: #1E90FF;
        cursor: pointer;
    }

    .input-name-wrapper {
        display: flex;
        align-items: center;
    }

    .save-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 200px;
    }

    button:hover {
        background-color: #DDDDDD;
    }
    button:disabled {
        background-color: #999999;
        cursor: default;
    }

    .label {
        margin-bottom: 4px;
    }

    @media (max-width: 500px) {
        .save-btn {
            width: 150px;
            min-width: 150px;
        }
        .setting-name {
            width: 250px;
        }
    }
</style>
