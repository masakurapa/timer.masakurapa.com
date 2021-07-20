import type { TimerSetting, Timer } from './types/local_timer';

/**
 * 0桁で0埋めをした文字列を返します
 */
export const padding = (num: number): string => {
    return num.toString().padStart(2, '0');
};

/**
 * タイマーの合計秒数を求める
 */
export const calcTotalSeconds = (timer: Timer): number => {
    return (timer.hour * 60 * 60) + (timer.minute * 60) + timer.second;
};

/**
 * タイマーの合計秒数を求める
 */
export const totalSecondsToTimer = (totalSeconds: number): Timer => {
    const hour = Math.floor(totalSeconds / (60 * 60));
    const minute = Math.floor((totalSeconds - (hour * 60 * 60)) / 60);
    const second = (totalSeconds - (hour * 60 * 60) - (minute * 60));
    return { hour, minute, second };
};

/**
 * タイマーの設定情報リストから、合計時間を求める
 */
export const calcTotalTime = (settings: TimerSetting[]): Timer => {
    const totalSeconds = settings.reduce((sum, setting) => {
        return sum + calcTotalSeconds(setting.timer);
    }, 0);
    return totalSecondsToTimer(totalSeconds);
};

/**
 * 文字列を数値に変換して最小・最大数の範囲に収まるように調整して返す
 * 文字列が数値ではない場合は最小値を返します
 * 最大値は指定がある場合のみ調整します
 */
export const adjustNumber = (value: string, min: number, max?: number): number => {
    const num = Number(value);
    if (Number.isNaN(value) || !Number.isInteger(value) || num < min) {
        return min;
    }
    if (max === null || max === undefined) {
        return num;
    }
    return num > max ? max : num;
};
