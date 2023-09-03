import type { PersonalTimerSetting } from "./local_timer";

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
export type GetSharedTimerSettingResponse = {
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
 * APIが正常終了しているがレスポンスがない場合
 */
export type NoContentResponse = {
};

/**
 * APIでエラーがあるときのレスポンス
 */
export type ErrorResponse = {
    errors: string[];
};
