/**
 * シェアタイマーの設定
 */
export type SharedTimerSetting = {
    key: string;
    name: string;
    owner: boolean;
};

/**
 * ローカルストレージに格納するシェアタイマーの設定
 */
export type StorageSharedTimerSetting = {
    settings: SharedTimerSetting[];
};
