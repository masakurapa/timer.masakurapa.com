/**
 * 共有タイマーの設定
 */
export type SharedTimerSetting = {
    key: string;
    name: string;
    owner: boolean;
};

/**
 * ローカルストレージに格納する共有タイマーの設定
 */
export type StorageSharedTimerSetting = {
    settings: SharedTimerSetting[];
};
