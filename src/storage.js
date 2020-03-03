const SETTINGS_KEY = 'timerSettings';
const CURRENT = 'current';

// 現在の設定位置をローカルストレージに保存する
export const setCurrent = (val) => {
    return setItem(CURRENT, val);
};

// 現在の設定位置をローカルストレージから取得する
export const getCurrent = () => {
    const val = getItem(CURRENT);
    return val !== null ? val : 0;
};

// タイマーの設定リストをローカルストレージに保存する
export const setTimerSettings = (settings) => {
    return setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// ローカルストレージからタイマーの設定リストを取得する
export const getTimerSetting = () => {
    const val = getItem(SETTINGS_KEY);
    if (val === null) {
        return [];
    }
    const userList = JSON.parse(val);
    return userList !== null ? userList : [];
};

// ローカルストレージに保存
export const setItem = (key, val) => {
    try {
        window.localStorage.setItem(key, val);
        return true;
    } catch (e) {
        return false;
    }
};

// ローカルストレージから取得
export const getItem = (key) => {
    try {
        return window.localStorage.getItem(key);
    } catch (e) {
        return null;
    }
};
