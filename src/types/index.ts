// 時分秒のまとまり
export type time = {
    hour: number;
    minute: number;
    second: number;
};

// タイマーの設定
export type timerSetting = {
    title: string;
    // hmsの合計秒数
    time: number;
    hour: number;
    minute: number;
    second: number;
};

// ストレージに格納するタイマーの設定
export type storageTimerSetting = {
    settings: timerSetting[];
};
