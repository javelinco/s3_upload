import * as Hapi from '@hapi/hapi';
import { RootController } from './controllers/root-controller';
import { S3UploadController } from './controllers/s3-upload-controller';

export default class Router {
  public static async loadRoutes(server: Hapi.Server): Promise<any> {
    const rootController = new RootController();
    server.route(rootController.routes());

    const s3UploadController = new S3UploadController();
    server.route(s3UploadController.routes());
  }
}
