import type {
    PersonalTimerSetting,
    SharedTimerHistory,
    StorageTimerSetting,
} from './types/local_timer';

/** タイマー設定を保存するためのキー */
const TIMER_SETTING = 'timer_setting';
/** 最後に使用したタイマー設定のキーを保存するためのキー */
const TIMER_SETTING_KEY = 'timer_setting_key';
/** タイマーを利用するユーザーを特定するためのID */
const TIMER_UID = 'timer_uid';

/**
 * ローカルストレージからタイマーの設定情報を取得する
 */
export const getTimerSetting = (): StorageTimerSetting => {
    const val = getItem(TIMER_SETTING);
    if (val === null) {
        return {settings: [], histories: []};
    }
    const settings: StorageTimerSetting = JSON.parse(val);
    return settings;
};

/**
 * タイマーの設定リストをローカルストレージに保存する
 * 設定を追加した位置を返します
 */
export const addTimerSetting = (setting: PersonalTimerSetting): number => {
    const timerSetting = getTimerSetting();
    timerSetting.settings.push(setting);
    setItem(TIMER_SETTING, JSON.stringify(timerSetting));
    return timerSetting.settings.length - 1;
};

/**
 * タイマーの設定リストをローカルストレージに上書き保存する
 */
export const saveTimerSetting = (index: number, setting: PersonalTimerSetting): boolean => {
    const timerSetting = getTimerSetting();
    timerSetting.settings[index] = setting;
    return setItem(TIMER_SETTING, JSON.stringify(timerSetting));
};

/**
 * タイマーの設定リストをローカルストレージから削除する
 */
export const removeTimerSetting = (index: number): boolean => {
    const timerSetting = getTimerSetting();
    timerSetting.settings = timerSetting.settings.filter((_, idx): boolean => {
        return idx !== index;
    });
    return setItem(TIMER_SETTING, JSON.stringify(timerSetting));
};

/**
 * 共有タイマーのアクセス履歴をローカルストレージに追加する
 * 設定を追加した位置を返します
 */
export const addSharedTimerHistory = (setting: SharedTimerHistory): number => {
    const timerSetting = getTimerSetting();
    timerSetting.histories.push(setting);
    setItem(TIMER_SETTING, JSON.stringify(timerSetting));
    return timerSetting.histories.length - 1;
};

/**
 * 共有タイマーのアクセス履歴をローカルストレージに上書き保存する
 */
export const saveSharedTimerHistory = (index: number, setting: SharedTimerHistory): boolean => {
    const timerSetting = getTimerSetting();
    timerSetting.histories[index] = setting;
    return setItem(TIMER_SETTING, JSON.stringify(timerSetting));
};

/**
 * 共有タイマーのアクセス履歴をローカルストレージから削除する
 */
export const removeSharedTimerHistory = (index: number): boolean => {
    const timerSetting = getTimerSetting();
    timerSetting.histories = timerSetting.histories.filter((_, idx): boolean => {
        return idx !== index;
    });
    return setItem(TIMER_SETTING, JSON.stringify(timerSetting));
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
export const getTimerSettingKey = (): string | null => {
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
export const getUID = (): string | null => {
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
