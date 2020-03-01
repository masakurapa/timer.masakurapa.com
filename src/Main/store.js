import { writable } from 'svelte/store';

// タイマー設定の位置
export const timerIndex = writable(0);
// 繰り返し数
export const repeatCount = writable(0);
// 一つのタイマーが0になったことの通知用フラグ
export const isTimeUp = writable(false);
// 全てのタイマーが0になったことの通知用フラグ
export const isTimeUpAll = writable(false);
// タイマー起動イベント
export const interval = writable(null);
