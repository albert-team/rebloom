export interface OptionsInterface {
  client?: any
  host?: string
  port?: number
  redisClientOptions?: object
  reset?: boolean
  reserved?: boolean
  minCapacity?: number
  errorRate?: number
}

/**
 * Options class
 */
export default class Options implements OptionsInterface {
  /**
   * Redis client (only Red is compatible). If provided, ignore host, port and redisClientOptions
   */
  public client: any
  public host: string = 'localhost'
  public port: number = 6379
  public redisClientOptions: object = {}
  public reset: boolean = false
  /**
   * Whether reserve space for the filter. If false, ignore minCapacity and errorRate.
   */
  public reserved: boolean = true
  public minCapacity: number = 1000
  /**
   * Only apply to BloomFilter
   */
  public errorRate: number = 0.001

  constructor(options: OptionsInterface) {
    Object.assign(this, options)
  }
}
