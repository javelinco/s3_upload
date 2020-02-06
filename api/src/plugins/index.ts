import * as Hapi from '@hapi/hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';

import Logger from '../helpers/logger';
import Config from './config';

function Plugin() {
  return function(_: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: Array<any>) {
      Logger.instance.info(`Plugins - registering ${propertyKey}`);
      try {
        await originalMethod.apply(this, args);
        Logger.instance.info(`Plugins - registered ${propertyKey}`);
      } catch (error) {
        Logger.instance.error(`Plugins - error occured when registering ${propertyKey}`, error);
      }
    };
    return descriptor;
  };
}

export default class Plugins {
  @Plugin()
  public static async swagger(server: Hapi.Server): Promise<void> {
    await Plugins.register(server, [
      Vision,
      Inert,
      {
        options: Config.swagger,
        plugin: HapiSwagger
      }
    ]);
  }

  public static async registerAll(server: Hapi.Server): Promise<void> {
    await Plugins.swagger(server);
  }

  private static async register(server: Hapi.Server, plugin: any): Promise<void> {
    try {
      await server.register(plugin);
    } catch (error) {
      Logger.instance.error('Error loading plugin', error);
      throw error;
    }
  }
}
