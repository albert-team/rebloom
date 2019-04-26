const Red = require('@albert-team/red')

const Options = require('./options')

/**
 * Base class for BloomFilter and CuckooFilter
 * @private
 * @abstract
 * @param {string} name - Name of the filter
 * @param {Options} [options={}] - Options
 */
class BaseFilter {
  constructor(name, options = {}) {
    /**
     * @private
     * @type {string}
     */
    this.name = name
    /**
     * @private
     * @type {Options}
     */
    this.options = new Options(options)

    const { client, host, port, redisClientOptions } = this.options
    /**
     * @private
     * @type {Red}
     */
    this.client = client ? client : new Red(host, port, redisClientOptions)
  }

  /**
   * Connect to Redis server and reserve space for the filter
   * @public
   * @async
   */
  async connect() {
    await this.client.connect()
    if (this.options.reset) await this.reset()
    if (this.options.reserved) await this.reserve()
  }

  /**
   * Disconnect from Redis server
   * @public
   * @async
   */
  async disconnect() {
    return this.client.disconnect()
  }

  /**
   * Reserve space for the filter
   * @public
   * @abstract
   * @async
   */
  async reserve() {}

  /**
   * Reset the filter
   * @public
   * @async
   */
  async reset() {
    return this.client.call('DEL', this.name)
  }
}

module.exports = BaseFilter
