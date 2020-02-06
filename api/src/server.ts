import * as Hapi from '@hapi/hapi';
import * as Boom from '@hapi/boom';
import Logger from './helpers/logger';
import Plugins from './plugins';
import Router from './router';

export default class Server {
  private static _instance: Hapi.Server;

  public static async start(): Promise<Hapi.Server> {
    try {
      const serverConfig: Hapi.ServerOptions = {
        port: process.env.SERVICE_PORT
      };

      Server._instance = new Hapi.Server(serverConfig);
      Server._instance.ext('onPreResponse', this.preResponse);
      await Plugins.registerAll(Server._instance);
      await Router.loadRoutes(Server._instance);
      await Server._instance.start();
      Logger.instance.info(`Server is running on ${Server._instance.info.uri}`);

      return Server._instance;
    } catch (error) {
      Logger.instance.error({ message: 'An error occurred when starting the server', error: error.message });
      throw error;
    }
  }

  public static async stop(): Promise<void> {
    return Server._instance.stop();
  }

  public static get instance(): Hapi.Server {
    return Server._instance;
  }

  public static preResponse(request: Hapi.Request, h: Hapi.ResponseToolkit) {
    const response = request.response;
    if (response && !(response as Boom<any>).isBoom) {
      return h.continue;
    }

    const boomError = response as Boom;
    Logger.instance.error({
      message: boomError.message,
      statusCode: boomError.output.statusCode,
      name: boomError.name,
      stacktrace: boomError.stack
    });
    return h.continue;
  }
}
