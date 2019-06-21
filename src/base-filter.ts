import Red from '@albert-team/red'
import Options, { OptionsInterface } from './options'

/**
 * Filter base class
 */
export default abstract class BaseFilter {
  protected name: string
  protected options: Options
  protected client: any

  /**
   * @param name Name of the filter
   * @param options Options
   */
  constructor(name: string, options: OptionsInterface = {}) {
    this.name = name
    this.options = new Options(options)

    const { client, host, port, redisClientOptions } = this.options
    this.client = client ? client : new Red(host, port, redisClientOptions)
  }

  /**
   * Connect to Redis server then reset and reserve space if needed
   */
  public async connect() {
    await this.client.connect()
    if (this.options.reset) await this.reset()
    if (this.options.reserved) await this.reserve()
  }

  /**
   * Disconnect from Redis server
   */
  public async disconnect() {
    return this.client.disconnect()
  }

  /**
   * Reserve space for the filter
   */
  public abstract async reserve(): Promise<void>

  /**
   * Reset the filter
   */
  public async reset() {
    return this.client.call('DEL', this.name)
  }
}
