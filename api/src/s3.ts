import { S3 } from 'aws-sdk';

// S3からファイルを取得します
// ファイル取得に失敗した場合はnullを返します
export const get = async (id: string): Promise<string|null> => {
    try {
        const option: S3.GetObjectRequest = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `${id}.json`,
        };

        console.log(`GetObject: ${option}`);

        const client = new S3({});
        const obj = await client.getObject(option).promise();
        return obj.Body.toString();
    } catch (err) {
        console.error(err);
        return null;
    }
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
