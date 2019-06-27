import Red from '@albert-team/red'

/**
 * Options interface
 */
export interface OptionsInterface {
  client?: Red
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
   * Redis client (only [Red](https://www.npmjs.com/package/@albert-team/red) is compatible).
   * If provided, ignore host, port and redisClientOptions.
   */
  public client: Red
  public host: string = 'localhost'
  public port: number = 6379
  /**
   * Options passed directly to the client constructor
   */
  public redisClientOptions: object = {}
  /**
   * Whether to remove old data if the filter name/key already exists
   */
  public reset: boolean = false
  /**
   * Whether reserve space for the filter.
   * If false, ignore minCapacity and errorRate.
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
