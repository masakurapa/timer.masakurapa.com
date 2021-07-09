<Head/>

<main>
    <Timer/>
    <hr>
    <Setting/>
</main>

<script lang="ts">
    import { onMount } from 'svelte';
    import {
        currentSettingPosition,
        settingKey,
        settingName,
        colorSetting,
        timerSettings,
    } from './store/setting';
     import {
        getTimerSetting,
        getTimerSettingKey,
    } from './storage';

    import Head from './Head.svelte';
    import Timer from './components/timer/Index.svelte';
    import Setting from './components/setting/Index.svelte';

    // マウント時にローカルストレージから設定情報を引っ張ってくる
    onMount((): void => {
        const key = getTimerSettingKey();
        if (key === null || key === '') {
            return;
        }

        const timerSetting = getTimerSetting();
        let no = -1;
        for (let i = 0; i < timerSetting.settings.length; i++) {
            if (timerSetting.settings[i].key === key) {
                no = i;
            }
        }

        if (no === -1) {
            return;
        }

        const setting = timerSetting.settings[no];
        currentSettingPosition.set(no);
        settingKey.set(setting.key);
        settingName.set(setting.name);
        colorSetting.set(setting.colorSetting);
        timerSettings.set(setting.timerSettings);
    });
</script>

<style>
    main {
        padding: 24px;
    }
</style>
