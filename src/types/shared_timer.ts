/**
 * シェアタイマーの設定
 */
export type SharedTimerSetting = {
    id: string;
    name: string;
};

/**
 * ローカルストレージに格納するシェアタイマーの設定
 */
export type StorageSharedTimerSetting = {
    settings: SharedTimerSetting[];
};
