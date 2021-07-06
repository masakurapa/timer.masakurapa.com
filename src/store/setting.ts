import { writable } from 'svelte/store';
import type { ColorSetting } from '../types/local_timer';
import { DEFAULT_BG_COLOR, DEFAULT_SWITCH_SECONDS } from '../const';

/**
 * ローカルストレージ保存時、シェア時の設定名
 */
export const settingName = writable('');

/**
 * 色設定
 */
export const colorSetting = writable<ColorSetting>({
    runningColor: DEFAULT_BG_COLOR.RUNNING,
    warning1Color: DEFAULT_BG_COLOR.WARNING,
    warning2Color: DEFAULT_BG_COLOR.DANGER,
    finishColor: DEFAULT_BG_COLOR.FINISH,
    warning1Seconds: DEFAULT_SWITCH_SECONDS.WARNING,
    warning2Seconds: DEFAULT_SWITCH_SECONDS.DANGER,
});
