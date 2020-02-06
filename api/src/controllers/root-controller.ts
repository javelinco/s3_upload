import * as Hapi from '@hapi/hapi';
import * as Joi from '@hapi/joi';
import * as Boom from '@hapi/boom';
import { controller, Controller, get, options } from 'hapi-decorators';
import * as moment from 'moment';
import { HealthCheckResponse } from './interfaces/healthcheck-response';
import { SystemInfo } from '../helpers/interfaces/system-info';
import { SystemInfoResponseSchema } from './responses/system-info-schema';
import { formatTimeLength } from '../helpers/format-time-length';
import { SystemStatus } from '../helpers/system-status';

@controller('')
export class RootController implements Controller {
  public baseUrl!: string;
  public routes!: () => Array<Hapi.ServerRoute>;

  @options({
    tags: ['api'],
    description: 'Health check',
    response: {
      schema: Joi.object({
        status: Joi.string(),
        uptime: Joi.string(),
        timestamp: Joi.string()
      }).label('HealthCheckResponse')
    }
  })
  @get('/health-check')
  public async healthCheck(): Promise<HealthCheckResponse | Boom<null>> {
    try {
      return {
        status: 'Ok',
        uptime: formatTimeLength(`${process.uptime() * 1000}`),
        timestamp: moment().format()
      };
    } catch (e) {
      return Boom.serverUnavailable();
    }
  }

  @options({
    tags: ['api'],
    description: `Endpoint for Kubernetes readinessProbe.
            Returns 200 only if the system is ready for requests,
            meaning all necessary services (e.g. ActiveMQ) are running.`,
    response: {
      schema: Joi.object({
        status: Joi.string(),
        uptime: Joi.string(),
        timestamp: Joi.string()
      }).label('ReadinessCheckResponse')
    }
  })
  @get('/readiness-check')
  public async readinessCheck(): Promise<HealthCheckResponse | Boom<null>> {
    if (!SystemStatus.isReady()) {
      return Boom.serverUnavailable();
    }

    try {
      return {
        status: 'Ready',
        uptime: formatTimeLength(`${process.uptime() * 1000}`),
        timestamp: moment().format()
      };
    } catch (e) {
      return Boom.serverUnavailable();
    }
  }

  @options({
    tags: ['api'],
    description: 'Returns system information such as CPU usage, network status, etc.',
    response: {
      schema: SystemInfoResponseSchema.label('SystemInfoResponse')
    }
  })
  @get('/service-status-check')
  public async serviceStatusCheck(): Promise<SystemInfo | Boom<null>> {
    try {
      const serviceStatus = await SystemStatus.systemInfo();
      return Promise.resolve(serviceStatus) as Promise<SystemInfo>;
    } catch (e) {
      return Boom.badImplementation(e);
    }
  }
}
