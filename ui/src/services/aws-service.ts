import axios from 'axios';

export async function getPresignedUploadUrl(fileName: string): Promise<string> {
    return (await axios.post<string>('http://localhost:3050/upload/endpoint/put', { fileName: fileName })).data;
}