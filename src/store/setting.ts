/**
 * タイマーの設定情報を管理します
 */
import { writable } from 'svelte/store';
import type {
    PersonalTimerSetting,
    ColorSetting,
    TimerSetting,
} from '../types/local_timer';

// 色設定（デフォルト値）
const defaultColorSetting: ColorSetting = {
    runningColor: '#DDFFFF',
    warning1Color: '#FFFFCC',
    warning1Seconds: 30,
    warning2Color: '#FFDDDD',
    warning2Seconds: 10,
    finishColor: '#DDFFDD',
};

const defaultPersonalTimerSetting: PersonalTimerSetting = {
    key: '',
    name: '',
    colorSetting: defaultColorSetting,
    timerSettings: [],
    owner: true,
    shared: false,
};

/**
 * 個人タイマー設定
 */
export const personalTimerSetting = writable(defaultPersonalTimerSetting);

export const resetPersonalTimerSetting = (): void => {
    personalTimerSetting.set(defaultPersonalTimerSetting);
};


/**
 * ローカルストレージ保存時、シェア時の設定名
 */
// export const settingName = writable('');

/**
 * 色設定
 */
// export const colorSetting = writable<ColorSetting>(defaultColorSetting);

/**
 * タイマー設定
 */
// export const timerSettings = writable<TimerSetting[]>([]);

/**
 * 自分が管理者の設定の場合にtrueを返します
 */
// export const owner = writable(true);

/**
 * タイマー設定を反映します
 */
// export const setTimerSetting = (setting: PersonalTimerSetting, isOwner: boolean): void => {
//     settingName.set(setting.name);
//     colorSetting.set(setting.colorSetting);
//     timerSettings.set(setting.timerSettings);
//     owner.set(isOwner);
// };

/**
 * 全設定をリセットします
 */
// export const resetSettings = (): void => {
//     settingName.set('');
//     colorSetting.set(defaultColorSetting);
//     timerSettings.set([]);
//     owner.set(true);
// };
