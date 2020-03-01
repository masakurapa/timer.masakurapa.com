import { writable } from 'svelte/store';

// 繰り返し回数
export const repeat = writable(0);
// タイマーの設定リスト
export const timerSettings = writable([]);
// タイマー開始／停止のフラグ
export const isTimerStarting = writable(false);
// ウィンドウにフォーカスがあるかのフラグ
export const isWindowFocus = writable(true);
