import type { LocalTimerSetting, StorageLocalTimerSetting } from './types/local_timer';
import type { SharedTimerSetting,StorageSharedTimerSetting } from './types/shared_timer';

/** タイマー設定を保存するためのキー */
const TIMER_SETTING = 'timer_setting';
/** シェア用のタイマー設定を保存するためのキー */
const SHARED_TIMER_SETTING = 'shared_timer_setting';
/** 最後に使用したタイマー設定のキーを保存するためのキー */
const TIMER_SETTING_KEY = 'timer_setting_key';
/** タイマーを利用するユーザーを特定するためのID */
const TIMER_UID = 'timer_uid';

/**
 * タイマーの設定リストをローカルストレージに保存する
 * 設定を追加した位置を返します
 */
export const addTimerSetting = (setting: LocalTimerSetting): number => {
    let timerSetting = getTimerSetting();
    if (timerSetting === null) {
        timerSetting = {settings: []};
    }

    timerSetting.settings.push(setting);
    setItem(TIMER_SETTING, JSON.stringify(timerSetting));
    return timerSetting.settings.length - 1;
};

/**
 * タイマーの設定リストをローカルストレージに保存する
 */
export const saveTimerSetting = (index: number, setting: LocalTimerSetting): boolean => {
    let timerSetting = getTimerSetting();
    if (timerSetting === null) {
        timerSetting = {settings: []};
    }

    timerSetting.settings[index] = setting;
    return setItem(TIMER_SETTING, JSON.stringify(timerSetting));
};

/**
 * タイマーの設定リストをローカルストレージに上書き保存する
 */
export const removeTimerSetting = (index: number): boolean => {
    let timerSetting = getTimerSetting();
    if (timerSetting === null) {
        timerSetting = {settings: []};
    }

    timerSetting.settings = timerSetting.settings.filter((_, idx): boolean => {
        return idx !== index;
    });
    return setItem(TIMER_SETTING, JSON.stringify(timerSetting));
};

/**
 * ローカルストレージからタイマーの設定情報を取得する
 */
export const getTimerSetting = (): StorageLocalTimerSetting|null => {
    const val = getItem(TIMER_SETTING);
    if (val === null) {
        return null;
    }
    const settings: StorageLocalTimerSetting = JSON.parse(val);
    return settings;
};

/**
 * シェア用のタイマーの設定リストをローカルストレージに保存する
 */
export const saveSharedTimerSetting = (index: number, setting: SharedTimerSetting): boolean => {
    let timerSetting = getSharedTimerSetting();
    if (timerSetting === null) {
        timerSetting = {settings: []};
    }

    timerSetting.settings[index] = setting;
    return setItem(SHARED_TIMER_SETTING, JSON.stringify(timerSetting));
};

/**
 * シェア用のタイマーの設定リストをローカルストレージに上書き保存する
 */
export const removeSharedTimerSetting = (index: number): boolean => {
    let timerSetting = getSharedTimerSetting();
    if (timerSetting === null) {
        timerSetting = {settings: []};
    }

    timerSetting.settings = timerSetting.settings.filter((_, idx): boolean => {
        return idx !== index;
    });
    return setItem(SHARED_TIMER_SETTING, JSON.stringify(timerSetting));
};

/**
 * ローカルストレージからシェア用のタイマーの設定情報を取得する
 */
export const getSharedTimerSetting = (): StorageSharedTimerSetting|null => {
    const val = getItem(SHARED_TIMER_SETTING);
    if (val === null) {
        return null;
    }
    const settings: StorageSharedTimerSetting = JSON.parse(val);
    return settings;
};

/**
 * タイマー設定のキーをローカルストレージに保存する
 */
export const saveTimerSettingKey = (key: string): boolean => {
    return setItem(TIMER_SETTING_KEY, key);
};

/**
 * タイマー設定のキーをローカルストレージに保存する
 */
export const getTimerSettingKey = (): string => {
    return getItem(TIMER_SETTING_KEY);
};

/**
 * UIDをローカルストレージに保存する
 */
export const saveUID = (key: string): boolean => {
    return setItem(TIMER_UID, key);
};

/**
 * UIDをローカルストレージに保存する
 */
export const getUID = (): string => {
    return getItem(TIMER_UID);
};

/**
 * ローカルストレージに保存
 */
const setItem = (key: string, val: string): boolean => {
    try {
        window.localStorage.setItem(key, val);
        return true;
    } catch (e) {
        return false;
    }
};

/**
 * ローカルストレージから取得
 */
const getItem = (key: string): string|null => {
    try {
        return window.localStorage.getItem(key);
    } catch (e) {
        return null;
    }
};
