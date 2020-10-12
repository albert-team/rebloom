import Red from '@albert-team/red'
import Options, { OptionsInterface } from './options'

/**
 * Filter base class
 */
export default abstract class BaseFilter {
  protected name: string
  protected readonly options: Options
  protected readonly client: Red

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
   * Get current filter name
   */
  get filterName():string{
    return this.name
  }
  
    /**
   * Set new filter name
   */
  set filterName(newName:string){
    this.name=newName
  }
  /**
   * Connect to Redis server
   */
  public connect(): Promise<void> {
    return this.client.connect()
  }

  /**
   * Disconnect from Redis server
   */
  public disconnect(): Promise<void> {
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
