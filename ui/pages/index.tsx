import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dropzone, { StatusValue, IFileWithMeta } from 'react-dropzone-uploader';

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
  const getUploadParams = () => {
    return { url: 'https://httpbin.org/post' }
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