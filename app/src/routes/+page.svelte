<HeadStyle/>
<Header/>
<main>
    <Timer/>
    <Setting/>
</main>

<script lang="ts">
    import { onMount } from 'svelte';
    import { v4 as uuidv4 } from 'uuid';

    import type { GetSharedTimerSettingResponse } from '$lib/types/api';

    import { getSetting } from '$lib/api/api';

    import { personalTimerSetting } from '$lib/store/setting';
    import {
        uid,
        switchPersonalSetting,
        switchSharedSetting,
    } from '$lib/store/storage';
     import {
        getTimerSetting,
        addSharedTimerHistory,
        getTimerSettingKey,
        saveTimerSettingKey,
        getUID,
        saveUID,
    } from '$lib/storage';

    import Header from '$lib/Header.svelte';
    import HeadStyle from '$lib/HeadStyle.svelte';
    import Timer from '$lib/components/timer/Index.svelte';
    import Setting from '$lib/components/setting/Index.svelte';

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

        switchPersonalSetting(no)
        // ローカルストレージの設定は常に管理者とみなす
        personalTimerSetting.set(timerSetting.settings[no])
        return true;
    };

    // 共有設定を読み込みます
    const loadSharedSetting = async (uid: string, key: string): Promise<boolean> => {
        // 共有設定を取得
        const resp = await getSharedSetting(uid, key);
        if (resp === null) {
            return false;
        }
        personalTimerSetting.set(resp.setting);

        const timerSetting = getTimerSetting();

        // 個人設定からキーを探す
        let no = -1;
        for (let i = 0; i < timerSetting.settings.length; i++) {
            if (timerSetting.settings[i].key === key) {
                no = i;
                break;
            }
        }

        if (no !== -1) {
            switchPersonalSetting(no)
            return true;
        }


        // 個人設定からキーが見つからなければ共有設定を探す
        for (let i = 0; i < timerSetting.histories.length; i++) {
            if (timerSetting.histories[i].key === key) {
                no = i;
                break;
            }
        }

        // 共有設定にもキーが見つからなければ
        // アクセス履歴を共有設定に保存する
        if (no === -1) {
            no = addSharedTimerHistory({
                key: resp.setting.key,
                name: resp.setting.name,
            });
        }

        switchSharedSetting(no)
        return true;
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
        if (!await loadSharedSetting(uid, key)) {
            // ローカルストレージのキーで取得に失敗したらキーを消しておく
            saveTimerSettingKey('');
        }
    });
</script>
