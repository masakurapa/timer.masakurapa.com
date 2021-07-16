import * as axios from 'axios';
import { ApiResult } from './result';

import type {
    GetSharedTimerSettingRequest,
    GetSharedTimerSettingResponse,
    SaveSharedTimerSettingRequest,
    DeleteSharedTimerSettingRequest,
    ErrorResponse,
} from '../types/api';

/**
 * 設定情報を取得します
 */
export const getSetting = async (uid: string, key: string): Promise<ApiResult<GetSharedTimerSettingResponse, ErrorResponse>> => {
    const body: GetSharedTimerSettingRequest = {uid, key};
    const headers = {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    };
    const resp = await axios.default.post<GetSharedTimerSettingResponse|ErrorResponse>(
        url('/'),
        body,
        { headers },
    );
    return new ApiResult<GetSharedTimerSettingResponse, ErrorResponse>(resp.status, resp.data);
};


// URLを生成して返す
const url = (path: string): string => {
    return `http://localhost:3000${path}`;
};
