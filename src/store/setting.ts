/**
 * タイマーの設定情報を管理します
 */
import { writable } from 'svelte/store';
import type {
    PersonalTimerSetting,
    ColorSetting,
    TimerSetting,
} from '../types/local_timer';

/**
 * ローカルストレージ保存時、シェア時の設定名
 */
export const settingName = writable('');

/**
 * 色設定
 */
export const colorSetting = writable<ColorSetting|null>();

/**
 * タイマー設定
 */
export const timerSettings = writable<TimerSetting[]>([]);

/**
 * タイマー設定を反映します
 */
export const setTimerSetting = (setting: PersonalTimerSetting): void => {
    settingName.set(setting.name);
    colorSetting.set(setting.colorSetting);
    timerSettings.set(setting.timerSettings);
};

/**
 * 全設定をリセットします
 */
export const resetSettings = (): void => {
    settingName.set('');
    colorSetting.set(null);
    timerSettings.set([]);
};
