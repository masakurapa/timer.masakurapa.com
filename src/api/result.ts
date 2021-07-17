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

    constructor(status: number, data?: T, error?: E) {
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
}
