/**
 * ローカルストレージに保存しているタイマーの設定情報の状態を管理します
 */
import { writable } from 'svelte/store';

/**
 * セッションで使用している設定の保存位置
 * nullの場合は使用位置無し
 */
export const currentPosition = writable<number|null>(null);

/**
 * 個人設定を使用している場合true, 共有設定を使用している場合falseになります
 */
export const useLocalSetting = writable<boolean>(true);

