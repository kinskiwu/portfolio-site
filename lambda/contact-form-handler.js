const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    const { name, email, message } = JSON.parse(event.body);

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: Date.now().toString(),
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        }
    };

    try {
        await dynamodb.put(params).promise();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Message stored successfully' }),
        };
    } catch (error) {
        console.error('Error storing message:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: 'Error storing message' }),
        };
    }
};
