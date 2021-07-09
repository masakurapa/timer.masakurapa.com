import type { LocalTimerSetting } from "./local_timer";

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
    setting: LocalTimerSetting;
    owner: boolean;
};

/**
 * 共有タイマーの保存リクエスト
 */
export type SaveSharedTimerSettingRequest = {
    setting: LocalTimerSetting;
    uid: string;
};

/**
 * 共有タイマーの保存時にエラーがあるときのレスポンス
 */
export type SaveSharedTimerSettingErrorRespons = {
    errors: string[];
};
