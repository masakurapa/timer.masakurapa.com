import axios, { AxiosInstance } from 'axios';
import { ApiResult } from './result';

import type {
    GetSharedTimerSettingRequest,
    GetSharedTimerSettingResponse,
    SaveSharedTimerSettingRequest,
    DeleteSharedTimerSettingRequest,
    NoContentResponse,
    ErrorResponse,
} from '../types/api';
import type { PersonalTimerSetting } from '../types/local_timer';

/**
 * 設定情報を取得します
 */
export const getSetting = async (uid: string, key: string): Promise<ApiResult<GetSharedTimerSettingResponse, ErrorResponse>> => {
    const body: GetSharedTimerSettingRequest = {uid, key};
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const resp = await makeClient().post<GetSharedTimerSettingResponse|ErrorResponse>(url('/'), body, { headers });
    if ('errors' in resp.data) {
        return new ApiResult<GetSharedTimerSettingResponse, ErrorResponse>(resp.status, null, resp.data);
    }
    return new ApiResult<GetSharedTimerSettingResponse, ErrorResponse>(resp.status, resp.data);
};

/**
 * 設定情報を保存します
 */
export const saveSetting = async (uid: string, setting: PersonalTimerSetting): Promise<ApiResult<NoContentResponse, ErrorResponse>> => {
    const body: SaveSharedTimerSettingRequest = {uid, setting};
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const resp = await makeClient().put<NoContentResponse|ErrorResponse>(url('/'), body, { headers });
    console.log(resp);
    if ('errors' in resp.data) {
        return new ApiResult<NoContentResponse, ErrorResponse>(resp.status, null, resp.data);
    }
    return new ApiResult<NoContentResponse, ErrorResponse>(resp.status, resp.data, null);
};

/**
 * 設定情報を削除します
 */
export const deleteSetting = async (uid: string, key: string): Promise<ApiResult<NoContentResponse, ErrorResponse>> => {
    const body: DeleteSharedTimerSettingRequest = {uid, key};
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    };

    const resp = await makeClient().post<NoContentResponse|ErrorResponse>(url('/delete'), body, { headers });
    if ('errors' in resp.data) {
        return new ApiResult<NoContentResponse, ErrorResponse>(resp.status, null, resp.data);
    }
    return new ApiResult<NoContentResponse, ErrorResponse>(resp.status, resp.data);
};


// URLを生成して返す
const url = (path: string): string => {
    return `http://localhost:3000${path}`;
};

// apiのリクエスト用のクライアントを返す
const makeClient = (): AxiosInstance => {
    return axios.create({
        // 全ステータスコードで例外をスローさせない
        validateStatus: () => true,
    });
};
