/**
 * タイマーの設定情報を管理します
 */
import { writable } from 'svelte/store';
import type {
    PersonalTimerSetting,
    ColorSetting,
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

/**
 * 個人タイマー設定
 */
export const personalTimerSetting = writable<PersonalTimerSetting>({
    key: '',
    name: '',
    colorSetting: defaultColorSetting,
    timerSettings: [],
    owner: true,
    shared: false,
});

/**
 * 設定をリセットします
 */
export const resetPersonalTimerSetting = (): void => {
    personalTimerSetting.set({
        key: '',
        name: '',
        colorSetting: defaultColorSetting,
        timerSettings: [],
        owner: true,
        shared: false,
    });
};
