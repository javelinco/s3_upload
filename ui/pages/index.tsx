import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dropzone, { StatusValue, IFileWithMeta, IUploadParams } from 'react-dropzone-uploader';
import { getPresignedUploadUrl } from '../src/services/aws-service';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload a File to S3 Bucket
        </Typography>
        <Standard />
      </Box>
    </Container>
  );
}

const Standard = () => {
  const getUploadParams = async ({ file, meta: { name } }: IFileWithMeta): Promise<IUploadParams> => {
    const uploadUrl = await getPresignedUploadUrl(name)
    // const fileUrl = `${uploadUrl}/${name}`;
    console.log(name, uploadUrl, file);
    return { body: file, meta: { name }, url: uploadUrl, method: 'PUT' }
  }

  const handleChangeStatus = ({ meta }: { [name: string]: any }, status: StatusValue) => {
    console.log(status, meta)
  }

  const handleSubmit = (files: IFileWithMeta[], allFiles: IFileWithMeta[]) => {
    console.log(files.map(f => f.meta))
    allFiles.forEach(f => f.remove())
  }

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      styles={{ dropzone: { minHeight: 200, maxHeight: 250 } }}
    />
  )
}