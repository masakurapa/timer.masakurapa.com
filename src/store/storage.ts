/**
 * ローカルストレージに保存しているタイマーの設定情報の状態を管理します
 */
import { writable } from 'svelte/store';

/**
 * セッションで使用している個人設定の保存位置
 * nullの場合は使用位置無し
 */
export const currentPersonalSettingPosition = writable<number|null>(null);

/**
 * セッションで使用している共有設定の保存位置
 * nullの場合は使用位置無し
 */
export const currentSharedSettingPosition = writable<number|null>(null);

/**
 * セッションで使用している個人設定のキー
 * nullの場合は個人設定未使用
 */
export const currentPersonalSettingKey = writable<string|null>(null);

/**
 * セッションで使用している共有設定のキー
 * nullの場合は共有設定未使用
 */
export const currentSharedSettingKey = writable<string|null>(null);

/**
 * 個人設定を使用している場合true
 */
export const usePersonalSetting = writable<boolean>(true);

/**
 * 個人設定を使用します
 */
export const switchPersonalSetting = (pos: number, key: string): void => {
    currentPersonalSettingPosition.set(pos);
    currentPersonalSettingKey.set(key);
    currentSharedSettingPosition.set(null);
    currentSharedSettingKey.set(null);
    usePersonalSetting.set(true);
};

/**
 * 共有設定を使用します
 */
export const switchSharedSetting = (pos: number, key: string): void => {
    currentPersonalSettingPosition.set(null);
    currentPersonalSettingKey.set(null);
    currentSharedSettingPosition.set(pos);
    currentSharedSettingKey.set(key);
    usePersonalSetting.set(false);
};

/**
 * storeを初期設定に戻します
 */
export const resetAll = (): void => {
    currentPersonalSettingPosition.set(null);
    currentPersonalSettingKey.set(null);
    currentSharedSettingPosition.set(null);
    currentSharedSettingKey.set(null);
    usePersonalSetting.set(true);
};
