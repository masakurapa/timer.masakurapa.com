import type { timerSetting, storageTimerSetting } from './types';

const SETTINGS_KEY = 'timerSettings';
const CURRENT = 'current';

// 現在の設定位置をローカルストレージに保存する
export const setCurrent = (val: number): boolean => setItem(CURRENT, val.toString());

// 現在の設定位置をローカルストレージから取得する
export const getCurrent = (): number => {
    const val = getItem(CURRENT);
    if (val === null) {
        return 0;
    }
    return Number.isInteger(val) ? parseInt(val, 10) : 0;
};

// タイマーの設定リストをローカルストレージに保存する
export const setTimerSettings = (index: number, settings: timerSetting[]): boolean => {
    const storage = getTimerSetting();
    if (storage[index] === undefined) {
        storage[index] = {settings: []};
    }
    storage[index].settings = settings;
    return setItem(SETTINGS_KEY, JSON.stringify(storage));
};

// ローカルストレージからタイマーの設定リストを取得する
export const getTimerSetting = (): storageTimerSetting[] => {
    const val = getItem(SETTINGS_KEY);
    if (val === null) {
        return [];
    }
    const settings = JSON.parse(val);
    return settings !== null ? settings : [];
};

// ローカルストレージに保存
export const setItem = (key: string, val: string): boolean => {
    try {
        window.localStorage.setItem(key, val);
        return true;
    } catch (e) {
        return false;
    }
};

// ローカルストレージから取得
export const getItem = (key: string): string|null => {
    try {
        return window.localStorage.getItem(key);
    } catch (e) {
        return null;
    }
};
