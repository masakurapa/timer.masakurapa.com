import { writable } from 'svelte/store';

// 繰り返し回数の設定値
export const repeat = writable(0);
// 現在のループ数
export const repeatCount = writable(0);

// タイマーの設定リスト
export const timerSettings = writable([]);
// 現在のタイマー設定の位置
export const timerIndex = writable(0);

// タイマー起動時のsetInterval()戻り値
export const interval = writable(null);

// タイマー開始／停止のフラグ
export const isTimerStarting = writable(false);
// ウィンドウにフォーカスがあるかのフラグ
export const isWindowFocus = writable(true);
// 一つのタイマーが0になったことの通知用フラグ
export const isTimeUp = writable(false);
// 全てのタイマーが0になったことの通知用フラグ
export const isTimeUpAll = writable(false);
