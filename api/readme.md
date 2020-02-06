# API for S3 Upload
The API should have two different endpoints - one endpoint will allow a PUT of a file to a URI on AWS, which
will save the file to the S3 bucket. The other endpoint will allow a POST using the multipart/form-data method
to save the file to the S3 bucket.