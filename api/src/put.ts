import { S3 } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

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

type errorResponse = {
    messages: string[];
};

// 入力値をチェックしてエラーがある場合はメッセージを返します
// エラーがない場合はnullを返します
const validate = (body: requestBody): errorResponse|null => {
    if (body.settings.length == 0) {
        return {messages: ['settings is required']};
    }

    // TODO: settingのバリデーション
    return null;
};

// S3にファイルアップロードし成功した場合にtrueを返します
export const put = async (id: string, body: string): Promise<boolean> => {
    try {
        const option: S3.PutObjectRequest = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${id}.json`,
            Body: body,
        };

        console.log(`PutObject: ${option}`);

        const client = new S3({});
        await client.putObject(option).promise();
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

// IDを生成する
// unix time + 1 ~ 1000までの乱数
const makeId = (): string => {
    const min = Math.ceil(1);
    const max = Math.floor(1000);
    const num = Math.floor(Math.random() * (max - min + 1) + min);
    return `${Date.now()}_${num}`;
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

    const id = makeId();
    if (!await put(id, JSON.stringify(body))) {
        return {
            statusCode: 500,
            body: JSON.stringify({messages: ['faild to save settings']}),
        };
    }

    const resp: responseBody = {id};
    return {
        statusCode: 200,
        body: JSON.stringify(resp),
    };
};
