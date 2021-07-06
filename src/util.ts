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
