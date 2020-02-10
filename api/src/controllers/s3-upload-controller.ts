import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';
import * as Boom from '@hapi/boom';
import { controller, Controller, post, options } from 'hapi-decorators';
import { UploadRequest } from './interfaces/upload-request';
import { HapiRequest } from '../interfaces/hapi-request';
import { getSignedUrl, createPresignedPost } from '../helpers/aws-upload';
import { PresignedPost } from 'aws-sdk/clients/s3';

@controller('')
export class S3UploadController implements Controller {
  public baseUrl!: string;
  public routes!: () => Array<Hapi.ServerRoute>;

  @options({
    tags: ['api'],
      description: 'Get the upload URI to POST a file to S3',
      validate: {
          payload: Joi.object({
              fileName: Joi.string()
        })
      },
      response: {
          schema: Joi.object({
            form: Joi.object()
          }).label('UploadPostEndpointResponse')
      }
  })
  @post('/upload/endpoint/post')
  public async getUploadEndpointPost(request: HapiRequest<UploadRequest>): Promise<{ form: PresignedPost } | Boom<null>> {
    try {
      const form = await createPresignedPost(request.payload.fileName);
      
      return { form: form };
    } catch (e) {
        console.log(e);
        return Boom.serverUnavailable();
    }
  }

  @options({
    tags: ['api'],
      description: 'Get the upload URI to PUT a file to S3',
      validate: {
          payload: Joi.object({
              fileName: Joi.string()
        })
      },
      response: {
        schema: Joi.object({
            uri: Joi.string()
        }).label('UploadPostEndpointResponse')
    }
  })
  @post('/upload/endpoint/put')
  public async getUploadEndpointPut(request: HapiRequest<UploadRequest>): Promise<{ uri: string } | Boom<null>> {
    try {        
      const signedUrl: string = await getSignedUrl(request.payload.fileName);

      return { uri: signedUrl };
    } catch (e) {
      console.log(e);
      return Boom.serverUnavailable();
    }
  }
}
