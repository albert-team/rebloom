import Red from '@albert-team/red'
import Options, { OptionsInterface } from './options'

/**
 * Filter base class
 */
export default abstract class BaseFilter {
  protected readonly name: string
  protected readonly options: Options
  protected client: Red

  /**
   * @param name Name/key of the filter
   * @param options Options
   */
  constructor(name: string, options: OptionsInterface = {}) {
    this.name = name
    this.options = new Options(options)

    const { client, host, port, redisClientOptions } = this.options
    this.client = client ? client : new Red(host, port, redisClientOptions)
  }

  /**
   * Connect to Redis server
   */
  public connect() {
    return this.client.connect()
  }

  /**
   * Disconnect from Redis server
   */
  public async disconnect() {
    return this.client.disconnect()
  }

  /**
   * Reset the filter
   * @return 1 on success, 0 otherwise
   */
  public reset(): Promise<number> {
    return this.client.call('DEL', this.name)
  }
}
