import * as AWS from 'aws-sdk';
import { ClientConfiguration } from 'aws-sdk/clients/acm';
import { PresignedPost } from 'aws-sdk/clients/s3';

export async function createPresignedPost(fileName: string): Promise<PresignedPost> {
    return new Promise((resolve, reject) => {
        updateAwsConfig();
        const client = new AWS.S3(getClientConfiguration(false));
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Fields: {
                Key: fileName
            }
        };
        client.createPresignedPost(params, (err: Error, data: PresignedPost) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

export async function getSignedUrl(fileName: string): Promise<string> {
    updateAwsConfig();
    const client = new AWS.S3(getClientConfiguration(true));
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName
    };
    return client.getSignedUrlPromise('putObject', params);
}

function getClientConfiguration(useAccelerateEndpoint: boolean): ClientConfiguration {
    const clientConfiguration: ClientConfiguration = {
        signatureVersion: 'v4',
        region: process.env.AWS_REGION,
        endpoint: `https://${process.env.AWS_BUCKET_NAME}${useAccelerateEndpoint ? '-accelerate' : ''}.s3.amazonaws.com`,
        useAccelerateEndpoint: useAccelerateEndpoint,
        s3ForcePathStyle: !useAccelerateEndpoint
    };
    return clientConfiguration;
}

function updateAwsConfig() {
    AWS.config.update({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
        region: process.env.AWS_REGION,
        signatureVersion: 'v4'
    });
}