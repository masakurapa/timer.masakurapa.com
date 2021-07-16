import type { ApiSuccessResponse, ApiErrorResponse } from "../types/api";

/**
 * APIの実行結果を返却します
 */
export class ApiResult<T, E> {
    /** ステータスコード */
    readonly status: number;
    /** 正常終了時のレスポンスボディ */
    readonly data?: T;
    /** 異常終了時のレスポンスボディ */
    readonly error?: E;

    constructor(status: number, resp: ApiSuccessResponse & T| ApiErrorResponse & E) {
        if (resp.type === 'success') {
            this.data = resp;
        } else if (resp.type === 'error') {
            this.error = resp;
        }
        this.status = status;
    }

    /**
     * リクエストが成功したか返します
     */
    isSuccess(): boolean {
        return this.status === 200;
    }
}
