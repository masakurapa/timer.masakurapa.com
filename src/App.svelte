<Head/>

<main>
    <Timer/>
    <hr>
    <Setting/>
</main>

<script lang="ts">
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';

    import type { GetSharedTimerSettingResponse } from './types/api';

    import { getSetting } from './api/api';

    import { setTimerSetting } from './store/setting';
    import {
        uid,
        switchPersonalSetting,
        switchSharedSetting,
    } from './store/storage';
     import {
        getTimerSetting,
        addSharedTimerHistory,
        getTimerSettingKey,
        getUID,
        saveUID,
    } from './storage';

    import Head from './Head.svelte';
    import Timer from './components/timer/Index.svelte';
    import Setting from './components/setting/Index.svelte';

    // APIを実行し共有設定を取得
    // 設定が取得できない場合はnullを返却します
    const getSharedSetting = async (uid: string, key: string): Promise<GetSharedTimerSettingResponse|null> => {
        const resp = await getSetting(uid, key);
        if (!resp.isSuccess()) {
            alert(resp.errors().join('\n'));
            return null;
        }
        return resp.data;
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
                break;
            }
        }

        if (no === -1) {
            return false;
        }

        switchPersonalSetting(no, timerSetting.settings[no].key)
        // ローカルストレージの設定は常に管理者とみなす
        setTimerSetting(timerSetting.settings[no], true)
        return true;
    };

    // 共有設定を読み込みます
    const loadSharedSetting = async (uid: string, key: string): Promise<void> => {
        // 共有設定を取得
        const resp = await getSharedSetting(uid, key);
        if (resp === null) {
            return;
        }

        const timerSetting = getTimerSetting();

        // 個人設定からキーを探す
        let no = -1;
        for (let i = 0; i < timerSetting.settings.length; i++) {
            if (timerSetting.settings[i].key === key) {
                no = i;
                break;
            }
        }

        // 個人設定からキーが見つからなければ共有設定を探す
        if (no === -1) {
            for (let i = 0; i < timerSetting.histories.length; i++) {
                if (timerSetting.histories[i].key === key) {
                    no = i;
                    break;
                }
            }

            // 共有設定にもキーが見つからなければ
            // アクセス履歴を共有設定に保存する
            if (no === -1) {
                addSharedTimerHistory({
                    key: resp.setting.key,
                    name: resp.setting.name,
                });
            }
        }

        switchSharedSetting(no, resp.setting.key)
        setTimerSetting(resp.setting, resp.owner);
    };

    // ローカルストレージからuidを取得
    const getStorageUID = (): string => {
        let id = getUID();
        // uidがなければ発行
        if (id === null || id === '') {
            id = uuidv4();
            saveUID(id);
        }
        uid.set(id);
        return id;
    };

    // マウント時にローカルストレージから設定情報を引っ張ってくる
    onMount(async (): Promise<void> => {
        const uid = getStorageUID();

        // GETパラメータにsidが存在する場合は共有設定を読み込み
        const url = new URL(window.location.href);
        const sid = url.searchParams.get('sid');
        if (sid !== null &&  sid !== '') {
            await loadSharedSetting(uid, sid);
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
        await loadSharedSetting(uid, key);
    });
</script>

<style>
    main {
        padding: 24px;
    }
</style>
