/**
 * ローカルストレージに保存しているタイマーの設定情報の状態を管理します
 */
import { writable } from 'svelte/store';

/**
 * UID
 */
export const uid = writable('');

/**
 * セッションで使用している個人設定の保存位置
 * -1の場合は使用位置無し
 */
export const currentPersonalSettingPosition = writable(-1);

/**
 * セッションで使用している共有設定の保存位置
 * -1の場合は使用位置無し
 */
export const currentSharedSettingPosition = writable(-1);

/**
 * セッションで使用している個人設定のキー
 * 空文字の場合は個人設定未使用
 */
// export const currentPersonalSettingKey = writable('');

/**
 * セッションで使用している共有設定のキー
 * 空文字の場合は共有設定未使用
 */
// export const currentSharedSettingKey = writable('');

/**
 * 個人設定を使用している場合true
 */
export const usePersonalSetting = writable(true);

/**
 * 個人設定を使用します
 */
export const switchPersonalSetting = (pos: number, key: string): void => {
    currentPersonalSettingPosition.set(pos);
    // currentPersonalSettingKey.set(key);
    currentSharedSettingPosition.set(-1);
    // currentSharedSettingKey.set('');
    usePersonalSetting.set(true);
};

/**
 * 共有設定を使用します
 */
export const switchSharedSetting = (pos: number, key: string): void => {
    currentPersonalSettingPosition.set(-1);
    // currentPersonalSettingKey.set('');
    currentSharedSettingPosition.set(pos);
    // currentSharedSettingKey.set(key);
    usePersonalSetting.set(false);
};

/**
 * storeを初期設定に戻します
 */
export const resetAll = (): void => {
    currentPersonalSettingPosition.set(-1);
    // currentPersonalSettingKey.set('');
    currentSharedSettingPosition.set(-1);
    // currentSharedSettingKey.set('');
    usePersonalSetting.set(true);
};
