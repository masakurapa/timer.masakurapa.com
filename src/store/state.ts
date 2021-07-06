import { writable } from 'svelte/store';

/**
 * タイマーが開始されている場合にtrueになります
 */
export const isTimerRunning = writable(false);
