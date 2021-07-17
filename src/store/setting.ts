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
 * 自分が管理者の設定の場合にtrueを返します
 */
export const owner = writable(true);

/**
 * タイマー設定を反映します
 */
export const setTimerSetting = (setting: PersonalTimerSetting, isOwner: boolean): void => {
    settingName.set(setting.name);
    colorSetting.set(setting.colorSetting);
    timerSettings.set(setting.timerSettings);
    owner.set(isOwner);
};

/**
 * 全設定をリセットします
 */
export const resetSettings = (): void => {
    settingName.set('');
    colorSetting.set(null);
    timerSettings.set([]);
    owner.set(true);
};
