<Collapse key="share-setting" open>
    <span slot="header">Save Setting</span>

    <div slot="content">
        <div class="setting-name-wrapper">
            <div class="label">Setting Name:</div>
            <input type="text" class="setting-name" bind:value="{$settingName}" >
        </div>

        <div class="button-wrapper">
            {#if $currentSettingPosition === null}
                <button
                    class="save-btn"
                    on:click="{onClickSaveLocalStorage}"
                >
                    Save LocalStorage
                </button>
            {:else}
                <button
                    class="save-btn"
                    on:click="{onClickOverwriteLocalStorage}"
                >
                    Overwrite LocalStorage
                </button>
            {/if}

            <div class="share-button-wrapper">
                {#if $currentSharedSettingPosition === null}
                    <button
                        class="save-btn"
                        on:click="{onClickSaveShareSetting}"
                    >
                        Share Setting
                    </button>
                {:else}
                <button
                    class="save-btn"
                    on:click="{onClickOverwriteSharedStorage}"
                >
                    Overwrite Shared Setting
                </button>
            {/if}
            </div>
        </div>

        <!-- <div class="share-url-wrapper">
            <div class="label">Share URL:</div>
            <input type="text" class="shere-url" value="https://timer.masakurapa.com/?sid=12345" disabled>
            <button class="share-btn">COPY</button>
        </div> -->
    </div>
</Collapse>

<MessageBox message="{message}" show="{showMessageBox}"></MessageBox>

<script lang="ts">
    import { v4 as uuidv4 } from 'uuid';

    import {
        currentSettingPosition,
        currentSharedSettingPosition,
        settingKey,
        settingName,
        colorSetting,
        timerSettings,
    } from '../../../store/setting';
    import {
        addTimerSetting,
        saveTimerSetting,
        addSharedTimerSetting,
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
    const onClickSaveLocalStorage = (): void => {
        const timerSettingKey = uuidv4();
        settingKey.set(timerSettingKey);
        if ($settingName === '') {
            settingName.set(timerSettingKey);
        }

        const pos = addTimerSetting({
            key: timerSettingKey,
            name: $settingName,
            colorSetting: $colorSetting,
            timerSettings: $timerSettings,
        });
        saveTimerSettingKey(timerSettingKey);

        currentSettingPosition.set(pos);

        showMessage('Saved !!!!!');
    };

    // ローカルストレージの設定を上書きする
    const onClickOverwriteLocalStorage = (): void => {
        if ($settingName === '') {
            settingName.set($settingKey);
        }

        saveTimerSetting($currentSettingPosition, {
            key: $settingKey,
            name: $settingName,
            colorSetting: $colorSetting,
            timerSettings: $timerSettings,
        });

        showMessage('Saved !!!!!');
    };

    // 設定をシェアする
    const onClickSaveShareSetting = (): void => {
        const timerSettingKey = uuidv4();
        settingKey.set(timerSettingKey);
        if ($settingName === '') {
            settingName.set(timerSettingKey);
        }

        // TODO: API呼び出しして設定を保存

        // ローカルストレージに追加
        const pos = addSharedTimerSetting({
            key: $settingKey,
            name: $settingName,
            owner: true,
        });

        saveTimerSettingKey(timerSettingKey);
        currentSharedSettingPosition.set(pos);

        showMessage('Shared !!!!!');
    };

    const onClickOverwriteSharedStorage = (): void => {

    };
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
        margin-left: 32px;
    }

    .save-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 200px;
    }
    .share-btn {
        background-color: #FFFFFF;
        color: #000000;
        width: 60px;
        height: 40px;
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
        .shere-url {
            width: 250px;
        }
    }
</style>
