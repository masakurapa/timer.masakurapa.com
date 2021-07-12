<Collapse key="share-setting" open>
    <span slot="header">Save Setting</span>

    <div slot="content">
        <div class="setting-name-wrapper">
            <div class="label">Setting Name:</div>
            <input type="text" class="setting-name" bind:value="{$settingName}" >
        </div>

        <div class="button-wrapper">
            {#if !$usePersonalSetting || $currentPersonalSettingPosition === null}
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
                {#if $usePersonalSetting}
                    <button
                        class="save-btn"
                        on:click="{onClickSaveShareSetting}"
                    >
                        Share Setting
                    </button>
                {/if}
            </div>
        </div>
    </div>
</Collapse>

<MessageBox message="{message}" show="{showMessageBox}"></MessageBox>

<script lang="ts">
    import { v4 as uuidv4 } from 'uuid';

    import {
        settingName,
        colorSetting,
        timerSettings,
    } from '../../../store/setting';
    import {
        currentPersonalSettingKey,
        currentPersonalSettingPosition,
        usePersonalSetting,
        switchPersonalSetting,
    } from '../../../store/storage';
    import {
        getTimerSetting,
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
        currentPersonalSettingKey.set(timerSettingKey);

        if ($settingName === '') {
            settingName.set(timerSettingKey);
        }

        const pos = addTimerSetting({
            key: timerSettingKey,
            name: $settingName,
            colorSetting: $colorSetting,
            timerSettings: $timerSettings,
            shared: false,
        });
        saveTimerSettingKey(timerSettingKey);

        switchPersonalSetting(pos, timerSettingKey);
    };

    // ローカルストレージに新規保存する
    const onClickSaveLocalStorage = (): void => {
        addPersonalSetting();
        showMessage('Saved !!!!!');
    };

    // ローカルストレージの設定を上書きする
    const onClickOverwriteLocalStorage = (): void => {
        if ($settingName === '') {
            settingName.set($currentPersonalSettingKey);
        }

        const timer = getTimerSetting();
        const shared = timer.settings[$currentPersonalSettingPosition].shared;

        saveTimerSetting($currentPersonalSettingPosition, {
            shared,
            key: $currentPersonalSettingKey,
            name: $settingName,
            colorSetting: $colorSetting,
            timerSettings: $timerSettings,
        });

        // 共有済みの設定も更新する
        if (shared) {
            // TODO: API呼び出しして設定を保存
        }

        showMessage('Saved !!!!!');
    };

    // 設定をシェアする
    const onClickSaveShareSetting = (): void => {
        // ローカルストレージに未保存なら先に保存する
        if ($currentPersonalSettingKey === null) {
            addPersonalSetting();
        }

        // TODO: API呼び出しして設定を保存

        saveTimerSetting($currentPersonalSettingPosition, {
            key: $currentPersonalSettingKey,
            name: $settingName,
            colorSetting: $colorSetting,
            timerSettings: $timerSettings,
            shared: true,
        });

        showMessage('Shared !!!!!');
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
