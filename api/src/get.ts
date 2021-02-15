import { S3 } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

// S3からファイルを取得します
// ファイル取得に失敗した場合はnullを返します
export const get = async (id: string): Promise<string|null> => {
    const client = new S3({});
    let body = '';

    try {
        const option: S3.GetObjectRequest = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${id}.json`,
        };

        console.log(`GetObject: ${option}`);

        const obj = await client.getObject(option).promise();
        body = obj.Body.toString();
    } catch (err) {
        console.error(err);
        return null;
    }

    // TODO: update last access date
    try {
        const option: S3.PutObjectRequest = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${id}.json`,
            Body: body,
        };

        console.log(`PutObject: ${option}`);
        await client.putObject(option).promise();
    } catch (err) {
        // ここのエラーはログ出力だけ
        console.error(err);
    }

    return body;
};

exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.queryStringParameters['id'];
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify({messages: ['id is required']}),
        };
    }

    const settings = await get(id);
    if (settings === null) {
        return {
            statusCode: 404,
            body: JSON.stringify({messages: ['id not found']}),
        };
    }

    return {
        statusCode: 200,
        body: settings,
    };
};
