import * as si from 'systeminformation';

export interface SystemInfo {
  currentTime: string;
  uptime: string;
  memory: {
    total: string;
    free: string;
    used: string;
    active: string;
    available: string;
  };
  currentLoad: si.Systeminformation.CurrentLoadData;
  fullLoad: number;
  processes: si.Systeminformation.ProcessesData;
  networkStats: Array<si.Systeminformation.NetworkStatsData>;
  networkConnections: Array<si.Systeminformation.NetworkConnectionsData>;
}
