const BaseFilter = require('./base-filter')

/**
 * Bloom filter
 * @public
 * @extends BaseFilter
 * @param {string} name - Name of the filter
 * @param {Options} [options={}] - Options
 */
class BloomFilter extends BaseFilter {
  constructor(name, options = {}) {
    super(name, options)
  }

  /**
   * Reserve space for the filter
   * @public
   * @async
   */
  async reserve() {
    try {
      await this.client.call(
        'BF.RESERVE',
        this.name,
        this.options.errorRate,
        this.options.minCapacity
      )
    } catch (err) {
      if (err.message === 'ERR item exists') return // ignore the error if the filter is already created
      throw err
    }
  }

  /**
   * Add an item to the filter
   * @param {any} item - Item
   * @returns {number} 1 if the item was newly added, or 0 if it may have previously existed
   */
  async add(item) {
    return this.client.call('BF.ADD', this.name, item)
  }

  /**
   * Add some items to the filter
   * @param  {...any} items - Items
   * @returns {number[]} Array of integers. Each is either 1 or 0
   */
  async addMany(...items) {
    return this.client.call('BF.MADD', this.name, ...items)
  }

  /**
   * Check if an item already exists in the filter
   * @param {any} item - Item
   * @returns {number} 0 if the item certainly does not exist, 1 if the item may exist
   */
  async exists(item) {
    return this.client.call('BF.EXISTS', this.name, item)
  }

  /**
   * Check if some items already exist in the filter
   * @param  {...any} items - Items
   * @returns {number[]} Array of integers. Each is either 1 or 0
   */
  async existsMany(...items) {
    return this.client.call('BF.MEXISTS', this.name, ...items)
  }
}

module.exports = BloomFilter
