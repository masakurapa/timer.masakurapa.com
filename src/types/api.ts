import type { PersonalTimerSetting } from "./local_timer";

/**
 * APIの共通レスポンスの型
 */
export type ApiSuccessResponse = {
    type: 'success';
};

/**
 * APIの共通レスポンスの型
 */
export type ApiErrorResponse = {
    type: 'error';
};

/**
 * 共有タイマーの取得リクエスト
 */
export type GetSharedTimerSettingRequest = {
    uid: string;
    key: string;
};

/**
 * 共有タイマーの取得レスポンス
 */
export type GetSharedTimerSettingResponse = ApiSuccessResponse & {
    setting: PersonalTimerSetting;
    owner: boolean;
};

/**
 * 共有タイマーの保存リクエスト
 */
export type SaveSharedTimerSettingRequest = {
    uid: string;
    setting: PersonalTimerSetting;
};

/**
 * 共有タイマーの削除リクエスト
 */
export type DeleteSharedTimerSettingRequest = {
    uid: string;
    key: string;
};

/**
 * APIでエラーがあるときのレスポンス
 */
export type ErrorResponse = ApiErrorResponse & {
    errors: string[];
};
