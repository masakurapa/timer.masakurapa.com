import type { time } from './types';

// ゼロパディングする
export const padding = (val: number): string => val.toString().padStart(2, '0');

// 時分秒の合計秒数を求める
export const calcTotalSec = (hour: number, minute: number, second: number): number =>
    (hour * 60 * 60) + (minute * 60) + second;

// 合計秒数から時分秒の値を求める
export const totalSecToHMS = (total: number): time => {
    const hour = Math.floor(total / (60 * 60));
    const minute = Math.floor((total - (hour * 60 * 60)) / 60);
    const second = (total - (hour * 60 * 60) - (minute * 60));
    return { hour, minute, second };
};
