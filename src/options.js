/**
 * Options for the filters
 * @private
 * @param {Object} [options={}] - Custom options
 */
class Options {
  constructor(options = {}) {
    /**
     * Redis client (only Red is compatible). If provided, ignore host, port and password
     * @public
     * @type {(Red|null|undefined)}
     */
    this.client = null
    /**
     * @public
     * @type {string}
     */
    this.host = 'localhost'
    /**
     * @public
     * @type {number}
     */
    this.port = 6379
    /**
     * @public
     * @type {(string|null|undefined)}
     */
    this.password = null
    /** Whether reserve space for the filter. If false, ignore minCapacity and errorRate
     * @public
     * @type {boolean}
     */
    this.reserved = true
    /**
     * @public
     * @type {number}
     */
    this.minCapacity = 1000
    /**
     * Only apply to BloomFilter
     * @public
     * @type {number}
     */
    this.errorRate = 0.001

    Object.assign(this, options)
  }
}

module.exports = Options
