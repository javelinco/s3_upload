import { SystemInfo } from './interfaces/system-info';
import * as si from 'systeminformation';
import * as moment from 'moment';
import * as prettyBytes from 'pretty-bytes';
import { formatTimeLength } from './format-time-length';

export class SystemStatus {
  public static isReady(): boolean {
    return true;
  }

  public static async systemInfo(): Promise<SystemInfo | Error> {
    try {
      const mem = await si.mem();
      const currentLoad = await si.currentLoad();
      currentLoad.cpus = [];
      const systemInfo = {
        currentTime: moment(si.time().current).toString(),
        uptime: formatTimeLength(si.time().uptime),
        memory: {
          total: prettyBytes(mem.total),
          free: prettyBytes(mem.free),
          used: prettyBytes(mem.used),
          active: prettyBytes(mem.active),
          available: prettyBytes(mem.available)
        },
        currentLoad: currentLoad,
        fullLoad: await si.fullLoad(),
        processes: await si.processes(),
        networkStats: await si.networkStats(),
        networkConnections: await si.networkConnections()
      };
      return systemInfo;
    } catch (e) {
      throw new Error(`Error retrieving system information: ${e}`);
    }
  }
}
