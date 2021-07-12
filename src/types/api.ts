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
    setting: PersonalTimerSetting;
    uid: string;
};

/**
 * 共有タイマーの保存時にエラーがあるときのレスポンス
 */
export type SaveSharedTimerSettingErrorRespons = {
    errors: string[];
};
