import axios from 'axios';

export async function getPresignedUploadUrl(fileName: string): Promise<string> {
    return (await axios.post('http://localhost:3050/upload/endpoint/put', { fileName: fileName })).data.uri;
}