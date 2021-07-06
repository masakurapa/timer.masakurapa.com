import { writable } from 'svelte/store';

/**
 * タイマーが開始されている場合にtrueになります
 */
export const isTimerRunning = writable(false);

/**
 * 1つのタイマー設定が時間切れになった場合にtrueになります
 */
export const isTimeUp = writable(false);

/**
 * 全てのタイマー設定が時間切れになった場合にtrueになります
 */
export const isTimeUpAll = writable(false);

/**
 * 現在のタイマーの設定位置
 */
export const currentTimerPosition = writable(0);

/**
 * 現在のタイマーの残り秒数
 */
export const timerSecondsRemaining = writable(0);
