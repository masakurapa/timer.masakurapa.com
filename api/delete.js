import * as aws from 'aws-sdk';

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
    console.log(event);

    const body = JSON.parse(event.body);

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
                "statusCode": 403,
                "body": JSON.stringify({
                    errors: ['Forbidden'],
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
