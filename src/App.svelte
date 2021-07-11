<Head/>

<main>
    <Timer/>
    <hr>
    <Setting/>
</main>

<script lang="ts">
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';

    import type { LocalTimerSetting } from './types/local_timer';
    import type { GetSharedTimerSettingResponse } from './types/api';

    import {
        currentSettingPosition,
        currentSharedSettingPosition,
        settingKey,
        settingName,
        colorSetting,
        timerSettings,
    } from './store/setting';
     import {
        getTimerSetting,
        getSharedTimerSetting,
        saveSharedTimerSetting,
        getTimerSettingKey,
        getUID,
        saveUID,
    } from './storage';

    import Head from './Head.svelte';
    import Timer from './components/timer/Index.svelte';
    import Setting from './components/setting/Index.svelte';

    // APIを実行し共有設定を取得
    // 設定が取得できない場合はnullを返却します
    const getSharedSetting = (uid: string, key: string): GetSharedTimerSettingResponse|null => {
        // TODO: APIリクエスト処理
        return null;
    };

    // 設定をstoreに保存
    const setSetting = (setting: LocalTimerSetting): void => {
        settingKey.set(setting.key);
        settingName.set(setting.name);
        colorSetting.set(setting.colorSetting);
        timerSettings.set(setting.timerSettings);
    };

    // ローカルストレージから個人設定を読み込みます
    // 個人設定を読み込めた場合はtrueを返します
    const loadLocalSetting = (key: string): boolean => {
        const timerSetting = getTimerSetting();
        if (timerSetting === null) {
            return false;
        }

        let no = -1;
        for (let i = 0; i < timerSetting.settings.length; i++) {
            if (timerSetting.settings[i].key === key) {
                no = i;
            }
        }

        if (no === -1) {
            return false;
        }

        currentSettingPosition.set(no);
        setSetting(timerSetting.settings[no])
        return true;
    };

    // 共有設定を読み込みます
    const loadSharedSetting = (uid: string, key: string): void => {
        // 共有設定を取得
        const resp = getSharedSetting(uid, key);
        if (resp === null) {
            return;
        }

        const timerSetting = getSharedTimerSetting();
        let no = -1;
        for (let i = 0; i < timerSetting.settings.length; i++) {
            if (timerSetting.settings[i].key === key) {
                no = i;
            }
        }

        // 設定がローカルストレージになければ初回アクセスとみなして、履歴を保存する
        if (no === -1) {
            no = timerSetting.settings.length;
            saveSharedTimerSetting(no, {
                key: resp.setting.key,
                name: resp.setting.name,
                owner: resp.owner,
            });
        }

        currentSharedSettingPosition.set(no);
        setSetting(resp.setting);
    };

    // ローカルストレージからuidを取得
    const getStorageUID = (): string => {
        let id = getUID();
        // uidがなければ発行
        if (id === null || id === '') {
            id = uuidv4();
            saveUID(id);
        }
        return id;
    };

    // マウント時にローカルストレージから設定情報を引っ張ってくる
    onMount((): void => {
        const uid = getStorageUID();

        // GETパラメータにsidが存在する場合は共有設定を読み込み
        const url = new URL(window.location.href);
        const sid = url.searchParams.get('sid');
        if (sid !== null &&  sid !== '') {
            loadSharedSetting(uid, sid);
            return;
        }

        // sidの指定がない場合はローカルストレージから設定を読み込む
        const key = getTimerSettingKey();
        if (key === null || key === '') {
            return;
        }

        // 個人設定に設定がないときは共有設定を使う
        if (loadLocalSetting(key)) {
            return;
        }
        loadSharedSetting(uid, key);
    });
</script>

<style>
    main {
        padding: 24px;
    }
</style>
