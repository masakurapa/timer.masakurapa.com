import { writable } from 'svelte/store';

// タイマー設定の位置
export const timerIndex = writable(0);
// 繰り返し数
export const repeatCount = writable(0);
// タイマーが0になったことの通知用フラグ
export const isTimeUp = writable(false);
// タイマー起動イベント
export const interval = writable(null);
