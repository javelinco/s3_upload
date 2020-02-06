import * as Joi from '@hapi/joi';

const currentLoadSchema = Joi.object({
  avgload: Joi.number(),
  currentload: Joi.number(),
  currentload_user: Joi.number(),
  currentload_system: Joi.number(),
  currentload_nice: Joi.number(),
  currentload_idle: Joi.number(),
  currentload_irq: Joi.number(),
  raw_currentload: Joi.number(),
  raw_currentload_user: Joi.number(),
  raw_currentload_system: Joi.number(),
  raw_currentload_nice: Joi.number(),
  raw_currentload_idle: Joi.number(),
  raw_currentload_irq: Joi.number(),
  cpus: Joi.array().max(0)
});

const processSchema = Joi.object({
  pid: Joi.number(),
  parentPid: Joi.number(),
  name: Joi.string(),
  pcpu: Joi.number(),
  pcpuu: Joi.number(),
  pcpus: Joi.number(),
  pmem: Joi.number(),
  priority: Joi.number(),
  mem_vsz: Joi.number(),
  mem_rss: Joi.number(),
  nice: Joi.number(),
  started: Joi.string(),
  state: Joi.string(),
  tty: Joi.string().allow(''),
  user: Joi.string(),
  command: Joi.string(),
  params: Joi.string().allow(''),
  path: Joi.string().allow('')
}).label('process');

const processListSchema = Joi.object({
  all: Joi.number(),
  running: Joi.number(),
  blocked: Joi.number(),
  sleeping: Joi.number(),
  unknown: Joi.number(),
  list: Joi.array()
    .items(processSchema)
    .label('processList')
});

const networkStatsSchema = Joi.object({
  iface: Joi.string(),
  operstate: Joi.string(),
  rx_bytes: Joi.number(),
  rx_dropped: Joi.number(),
  rx_errors: Joi.number(),
  tx_bytes: Joi.number(),
  tx_dropped: Joi.number(),
  tx_errors: Joi.number(),
  rx_sec: Joi.number(),
  tx_sec: Joi.number(),
  ms: Joi.number()
}).label('networkStatsSchema');

const networkConnectionsSchema = Joi.object({
  protocol: Joi.string(),
  localaddress: Joi.string(),
  localport: Joi.string(),
  peeraddress: Joi.string(),
  peerport: Joi.string(),
  state: Joi.string(),
  pid: Joi.number(),
  process: Joi.string().allow('')
}).label('networkConnection');

export const SystemInfoResponseSchema = Joi.object({
  currentTime: Joi.date(),
  uptime: Joi.string(),
  memory: Joi.object({
    total: Joi.string(),
    free: Joi.string(),
    used: Joi.string(),
    active: Joi.string(),
    available: Joi.string()
  }),
  currentLoad: currentLoadSchema,
  fullLoad: Joi.number(),
  processes: processListSchema,
  networkStats: Joi.array().items(networkStatsSchema),
  networkConnections: Joi.array().items(networkConnectionsSchema)
});
