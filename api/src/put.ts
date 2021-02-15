import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as nanoid from 'nanoid';
import { put } from './s3';
import { errorResponse, makeErrorResponse } from './error';

type requestBody = {
    settings: setting[];
};

type setting = {
    title: string;
    hour: number;
    minute: number;
    second: number;
};

type responseBody = {
    id: string;
};

// 入力値をチェックしてエラーがある場合はメッセージを返します
// エラーがない場合はnullを返します
const validate = (body: requestBody): errorResponse|null => {
    if (body.settings.length == 0) {
        return makeErrorResponse('settings is required');
    }

    // TODO: settingのバリデーション
    return null;
};

exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const body: requestBody = JSON.parse(event.body);

    const err = validate(body);
    if (err !== null) {
        return {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }

    const uid = nanoid.nanoid();
    if (!await put(uid, JSON.stringify(body))) {
        return {
            statusCode: 500,
            body: JSON.stringify(makeErrorResponse('faild to save settings')),
        };
    }

    const resp: responseBody = {id: uid};
    return {
        statusCode: 200,
        body: JSON.stringify(resp),
    };
};
