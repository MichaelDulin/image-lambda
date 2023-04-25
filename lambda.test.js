'use strict';

const handler = require('./index');

describe('Testing Lambda function', () => {
    test('Handles image upload to S3', async() => {
        const event = {
            Records: []
        }
        let response = await handler(event);
    });
})