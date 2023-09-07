const http = require("http");
const getRequest = require('./src/get');
const updateRequest = require('./src/update');
const deleteRequest = require('./src/delete');

http.createServer(
    async (req, res) => {
        let resp = {
            statusCode: 404,
            body: 'Not Found\n',
        };

        let postData = '';
        req.on('data', (data) => {
            postData += data;
        });

        req.on('end', async () => {
            // 統合リクエスト
            const event = {
                headers: [],
                queryStringParameters: {},
                pathParameters: {},
                body: postData,
            };

            try {
                if (req.method === 'POST') {
                    if (req.url === '/') {
                        console.log(`get setting: ${postData}`);
                        // 設定の取得リクエスト
                        resp = await getRequest.handler(event);
                    } else if (req.url === '/delete') {
                        console.log(`delete setting: ${postData}`);
                        // 設定の削除リクエスト
                        resp = await deleteRequest.handler(event);
                    }
                } else if (req.method === 'PUT') {
                    if (req.url === '/') {
                        console.log(`update setting: ${postData}`);
                        // 設定の更新リクエスト
                        resp = await updateRequest.handler(event);
                    }
                } else if (req.method === 'OPTIONS') {
                    // preflight対応
                    res.writeHead(200, {
                        'Access-Control-Allow-Headers': 'content-type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,PUT',
                    });
                    res.end('');
                    return;
                }
            } catch (err) {
                resp = {
                    statusCode: 500,
                    body: {
                        errors: ['Server Error'],
                    },
                };
            }

            res.writeHead(resp.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            });
            res.end(`${resp.body}\n`);
        });
    },
).listen(
    3000,
    () => console.log('Server http://localhost:3000'),
);
