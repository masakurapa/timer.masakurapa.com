<div class="wrapper">
    <div class="setting-name-wrapper">
        <div class="label">Setting Name:</div>
        <input type="text" class="setting-name" bind:value="{$settingName}" >
    </div>

    <div class="button-wrapper">
        <button
            class="save-btn"
            on:click="{saveLocalStorage}"
        >
            {#if $settingKey === ''}
                Save LocalStorage
            {:else}
                Overwrite LocalStorage
            {/if}
        </button>

        <!-- <div class="share-button-wrapper">
            <button
                class="save-btn"
            >
                Share Setting
            </button>
        </div> -->
    </div>

    <!-- <div class="share-url-wrapper">
        <div class="label">Share URL:</div>
        <input type="text" class="shere-url" value="https://timer.masakurapa.com/?sid=12345" disabled>
        <button class="share-btn">COPY</button>
    </div> -->
</div>

<script lang="ts">
    import { v4 as uuidv4 } from 'uuid';
    import {
        currentSettingPosition,
        settingKey,
        settingName,
        colorSetting,
        timerSettings,
    } from '../../../store/setting';
    import {
        addTimerSetting,
        saveTimerSetting,
        saveTimerSettingKey,
     } from '../../../storage';

    // ローカルストレージに保存する
    const saveLocalStorage = (): void => {
        if ($settingKey === '') {
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
        } else {
            if ($settingName === '') {
                settingName.set($settingKey);
            }

            saveTimerSetting($currentSettingPosition, {
                key: $settingKey,
                name: $settingName,
                colorSetting: $colorSetting,
                timerSettings: $timerSettings,
            });
        }

        alert('Saved it!!');
    };

    // 設定が保存可能な状態ではないときにtrueになります
    $: disabledSaveButton = $settingName === '';
</script>

<style>
    .wrapper {
        margin-bottom: 32px;
        border: 1px solid #000000;
        border-radius: 8px;
        padding: 12px;
        max-width: 600px;
    }
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
