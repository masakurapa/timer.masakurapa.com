import type { TimerSetting, Timer } from './types/local_timer';

/**
 * 0桁で0埋めをした文字列を返します
 */
export const padding = (num: number): string => {
    return num.toString().padStart(2, '0');
};


/**
 * タイマーの設定情報リストから、合計時間を求める
 */
export const calcTotalTime = (settings: TimerSetting[]): Timer => {
    const totalSecond = settings.reduce((sum, setting) => {
        const timer = setting.timer;
        return sum + (timer.hour * 60 * 60) + (timer.minute * 60) + timer.second;
    }, 0);

    const hour = Math.floor(totalSecond / (60 * 60));
    const minute = Math.floor((totalSecond - (hour * 60 * 60)) / 60);
    const second = (totalSecond - (hour * 60 * 60) - (minute * 60));

    return { hour, minute, second };
};
