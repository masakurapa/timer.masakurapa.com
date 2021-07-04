/**
 * ローカルタイマーの設定情報
 */
export type LocalTimerSetting = {
    name: string;
    colorSetting: ColorSetting;
    timerSettings: TimerSetting[];
};

/**
 * 背景色、背景切り替えの秒数の設定
 */
export type ColorSetting = {
    /** タイマー起動中のデフォルト背景色 */
    runningtColor: string;
    /** 残り秒数の中間警告色 */
    warning1Color: string;
    /** 残り秒数の最終警告色 */
    warning2Color: string;
    /** 全フェーズ終了時の背景色 */
    finishedColor: string;

    /** 残り秒数の中間警告色に切り替える残り秒数 */
    warning1Second: string;
    /** 残り秒数の最終警告色に切り替える残り秒数 */
    warning2Second: string;
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
export type StorageLocalTimerSetting = {
    settings: LocalTimerSetting[];
};

