const aws = require('aws-sdk');

const validate = body => {
    const errors = [];

    if (body === null) {
        errors.push('Request body is empty');
        return errors;
    }

    if (typeof body.uid === 'undefined' || body.uid === '') {
        errors.push('uid is required');
    }
    if (typeof body.setting === 'undefined') {
        errors.push('setting is required');
    }

    // TODO settingの中身を検証

    return errors;
};

exports.handler =  async function(event) {
    const responseHeaders = {
        'Content-Type': 'application/json',
        'Access-Controll-Allow-Origin': process.env.ALLOW_ORGIN,
        'Access-Control-Allow-Headers' : 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT',
    };

    console.log(event);

    let body;
    try {
        body = JSON.parse(event.body);
    } catch (ex) {
        console.error(ex);
        return {
            statusCode: 422,
            headers: responseHeaders,
            body: JSON.stringify({
                errors: ['Invalid JSON format'],
            }),
        };
    }

    const errors = validate(body);
    if (errors.length > 0) {
        return {
            statusCode: 422,
            headers: responseHeaders,
            body: JSON.stringify({ errors }),
        };
    }

    const client = new aws.S3({
        apiVersion: '2006-03-01',
        region: process.env.REGION,
        httpOptions: { timeout: 300 },
        maxRetries: 3,
        endpoint: process.env.ENDPOINT_URL ? process.env.ENDPOINT_URL : '',
        s3ForcePathStyle: process.env.ENDPOINT_URL ? true : false,
    });
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: `shared/${body.setting.key}.json`,
    };

    // Objectの存在していれば、UIDのチェック
    try {
        await client.headObject(params).promise();

        const object = await client.getObject(params).promise();
        const setting = JSON.parse(object.Body);

        if (setting.uid !== body.uid) {
            return {
                statusCode: 403,
                headers: responseHeaders,
                body: JSON.stringify({
                    errors: ['Forbidden'],
                }),
            };
        }
    } catch (ex) {
        // キーが存在しないエラーは無視
        if (ex.code !== 'NotFound') {
            console.error(ex);
            return {
                statusCode: 500,
                headers: responseHeaders,
                body: JSON.stringify({
                    errors: ['Server error'],
                }),
            };
        }
    }

    try {
        await client.putObject({
            Bucket: process.env.BUCKET_NAME,
            Key: `shared/${body.setting.key}.json`,
            ContentType: 'application/json',
            Body: event.body,
        }).promise();
    } catch (ex) {
        console.error(ex);
        return {
            statusCode: 500,
            headers: responseHeaders,
            body: JSON.stringify({
                errors: ['Server error'],
            }),
        };
    }

    return {
        statusCode: 200,
        headers: responseHeaders,
        body: JSON.stringify({}),
    };
};
