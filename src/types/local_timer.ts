/**
 * 個人タイマーの設定情報
 */
export type PersonalTimerSetting = {
    key: string;
    name: string;
    colorSetting: ColorSetting;
    timerSettings: TimerSetting[];
    shared: boolean;
};

/**
 * 共有タイマーのアクセス履歴
 */
export type SharedTimerHistory = {
    key: string;
    name: string;
};

/**
 * 背景色、背景切り替えの秒数の設定
 */
export type ColorSetting = {
    /** タイマー起動中のデフォルト背景色 */
    runningColor: string;
    /** 残り秒数の中間警告色 */
    warning1Color: string;
    /** 残り秒数の最終警告色 */
    warning2Color: string;
    /** 全フェーズ終了時の背景色 */
    finishColor: string;

    /** 残り秒数の中間警告色に切り替える残り秒数 */
    warning1Seconds: number;
    /** 残り秒数の最終警告色に切り替える残り秒数 */
    warning2Seconds: number;
};

/**
 * 時分秒のまとまり
 */
export type Timer = {
    hour: number;
    minute: number;
    second: number;
};

/**
 * タイマー設定の1行
 */
export type TimerSetting = {
    title: string;
    timer: Timer;
};

/**
 * ローカルストレージに格納する個人タイマーの設定
 */
export type StorageTimerSetting = {
    settings: PersonalTimerSetting[];
    histories: SharedTimerHistory[];
};
