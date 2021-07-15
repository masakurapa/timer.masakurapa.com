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
    if (typeof body.key === 'undefined' || body.key === '') {
        errors.push('key is required');
    }

    return errors;
};

exports.handler =  async function(event) {
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (ex) {
        console.error(ex);
        return {
            statusCode: 422,
            body: JSON.stringify({
                errors: ['Invalid JSON format'],
            }),
        };
    }

    const errors = validate(body);
    if (errors.length > 0) {
        return {
            "statusCode": 422,
            "body": JSON.stringify({ errors }),
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
        Key: `shared/${body.key}.json`,
    };

    // Objectの存在チェック
    try {
        await client.headObject(params).promise();
    } catch (ex) {
        if (ex.code === 'NotFound') {
            return {
                "statusCode": 404,
                "body": JSON.stringify({
                    errors: ['The key setting does not exist'],
                }),
            };
        }

        console.error(ex);
        return {
            "statusCode": 500,
            "body": JSON.stringify({
                errors: ['Server error'],
            }),
        };
    }

    try {
        const object = await client.getObject(params).promise();
        const setting = JSON.parse(object.Body);

        if (setting.uid !== body.uid) {
            return {
                "statusCode": 403,
                "body": JSON.stringify({
                    errors: ['Forbidden'],
                }),
            };
        }
    } catch (ex) {
        console.error(ex);
        return {
            "statusCode": 500,
            "body": JSON.stringify({
                errors: ['Server error'],
            }),
        };
    }

    try {
        await client.deleteObject(params).promise();
    } catch (ex) {
        console.error(ex);
        return {
            "statusCode": 500,
            "body": JSON.stringify({
                errors: ['Server error'],
            }),
        };
    }

    return {
        "statusCode": 200,
        "body": {},
    };
};
