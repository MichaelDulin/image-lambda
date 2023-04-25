const {
    S3Client,
    GetObjectCommad,
    PutObjectCommand
} = require('@aws-sdk/client-s3');

const s3Client = new S3Client({ region: 'use-west-2' });

module.exports = async (event) => {

    const bucketName = event.Records[0].s3.bucket.name;
    const fileName = event.Records[0].s3.object.key;
    const fileSize = event.Records[0].s3.object.size;

    console.log('BUCKET NAME: ' + bucketName);
    console.log('FILE NAME: ' + fileName);
    console.log('FILE SIZE: ' + fileSize);

    const getImageManifest = {
        Bucket: bucketName,
        Key: 'image.json'
    }

    try {
        const manifest = await s3Client.send(new GetObjectCommad(getImageManifest));
        console.log(manifest);

        await s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: 'image.json'
        }))
    } catch(e) {
        console.log(e);
        if (e.code === 'NoSuchKey') {
            console.log('Creating new Manifest');
        }
    } 

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};