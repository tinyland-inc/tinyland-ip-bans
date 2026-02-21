export interface IpBansLogger {
  info: (msg: string, meta?: Record<string, unknown>) => void;
  warn: (msg: string, meta?: Record<string, unknown>) => void;
  error: (msg: string, meta?: Record<string, unknown>) => void;
  debug: (msg: string, meta?: Record<string, unknown>) => void;
}

export interface IpBansConfig {
  /** Base directory for security data. Defaults to `process.cwd() + '/content/security'`. */
  securityDir?: string;
  /** Ban file name within securityDir. Defaults to 'ip-bans.json'. */
  banFileName?: string;
  /** Logger instance. Defaults to noop. */
  getLogger?: () => IpBansLogger;
  /** UUID generator. Defaults to crypto.randomUUID(). */
  generateId?: () => string;
}

const noopLogger: IpBansLogger = {
  info: () => {},
  warn: () => {},
  error: () => {},
  debug: () => {},
};

let config: IpBansConfig = {};

export function configureIpBans(c: IpBansConfig): void {
  config = { ...config, ...c };
}

export function getIpBansConfig(): Required<IpBansConfig> {
  return {
    securityDir:
      config.securityDir ??
      (typeof process !== 'undefined'
        ? `${process.cwd()}/content/security`
        : '/tmp/security'),
    banFileName: config.banFileName ?? 'ip-bans.json',
    getLogger: config.getLogger ?? (() => noopLogger),
    generateId: config.generateId ?? (() => crypto.randomUUID()),
  };
}

export function resetIpBansConfig(): void {
  config = {};
}
