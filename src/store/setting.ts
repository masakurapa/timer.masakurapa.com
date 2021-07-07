import { writable } from 'svelte/store';
import type { ColorSetting, TimerSetting } from '../types/local_timer';

/**
 * セッションで使用している設定位置
 */
export const currentSettingPosition = writable<number>(null);

/**
 * セッションで使用している設定のキー
 */
export const settingKey = writable('');

/**
 * ローカルストレージ保存時、シェア時の設定名
 */
export const settingName = writable('');

/**
 * 色設定
 */
export const colorSetting = writable<ColorSetting>(null);

/**
 * タイマー設定
 */
export const timerSettings = writable<TimerSetting[]>([]);
