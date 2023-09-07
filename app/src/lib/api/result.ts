import type { ErrorResponse } from "../types/api";

/**
 * APIの実行結果を返却します
 */
export class ApiResult<T> {
    /** ステータスコード */
    readonly status: number;
    /** 正常終了時のレスポンスボディ */
    readonly data: T|null;
    /** 異常終了時のレスポンスボディ */
    readonly error: ErrorResponse|null;

    constructor(status: number, data: T|null, error: ErrorResponse|null) {
        this.status = status;
        this.data = data;
        this.error = error;
    }

    /**
     * リクエストが成功したか返します
     */
    isSuccess(): boolean {
        return this.status === 200;
    }

    /**
     * エラーメッセージを連結して返します
     */
    errors(): string[] {
        return this.error === null ? [] : this.error.errors;
    }
}
