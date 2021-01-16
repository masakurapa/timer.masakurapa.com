import type { timerSetting } from './types';
import { writable } from 'svelte/store';

// タイマーの設定リスト
export const timerSettings = writable<timerSetting[]>([]);
// 現在のタイマー設定の位置
export const timerIndex = writable(0);

// タイマー起動時のsetInterval()戻り値
export const interval = writable(null); // FIXME: type

// タイマー開始／停止のフラグ
export const isTimerStarting = writable(false);
// ウィンドウにフォーカスがあるかのフラグ
export const isWindowFocus = writable(true);
// 一つのタイマーが0になったことの通知用フラグ
export const isTimeUp = writable(false);
// 全てのタイマーが0になったことの通知用フラグ
export const isTimeUpAll = writable(false);
// これ以上タイマーを起動できない状態
export const isFinish = writable(false);
