import { writable } from 'svelte/store';

// 繰り返し回数
export const repeat = writable(0);
// タイマーの設定リスト
export const timerSettings = writable([]);
