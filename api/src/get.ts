import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { get, put } from './s3';
import { makeErrorResponse } from './error';

exports.handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.queryStringParameters['id'];
    if (!id) {
        return {
            statusCode: 400,
            body: JSON.stringify(makeErrorResponse('id is required')),
        };
    }

    const settings = await get(id);
    if (settings === null) {
        return {
            statusCode: 404,
            body: JSON.stringify(makeErrorResponse('id not found')),
        };
    }

    // TODO: update last access date
    await put(id, settings);

    return {
        statusCode: 200,
        body: settings,
    };
};
