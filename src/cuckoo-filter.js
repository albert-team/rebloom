const BaseFilter = require('./base-filter')

/**
 * Cuckoo filter
 * @public
 * @extends BaseFilter
 * @param {string} name - Name of the filter
 * @param {Options} [options={}] - Options
 */
class CuckooFilter extends BaseFilter {
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
      await this.client.call('CF.RESERVE', this.name, this.options.minCapacity)
    } catch (err) {
      if (err.message === 'ERR item exists') return // ignore the error if the filter is already created
      throw err
    }
  }

  /**
   * Add an item to the filter
   * @param {any} item - Item
   * @param {boolean} [notExistsOnly=true] - Whether accept duplicates
   * @returns {number} 1 if the item was added, 0 if notExistsOnly is true and the item already exists, error otherwise
   */
  async add(item, notExistsOnly = true) {
    const command = notExistsOnly ? 'CF.ADDNX' : 'CF.ADD'
    return this.client.call(command, this.name, item)
  }

  /**
   * Check if an item already exists in the filter
   * @param {any} item - Item
   * @returns {number} 0 if the item certainly does not exist, 1 if the item may exist
   */
  async exists(item) {
    return this.client.call('CF.EXISTS', this.name, item)
  }

  /**
   * Count the number of occurrences of an item in the filter
   * @param {any} item - Item
   * @returns {number} The number of occurrences of the item
   */
  async count(item) {
    return this.client.call('CF.COUNT', this.name, item)
  }

  /**
   * Remove an occurrence of an item from the filter
   * @param {any} item - Item
   * @returns {number} 1 if the item has been removed, 0 if the item was not found
   */
  async remove(item) {
    return this.client.call('CF.DEL', this.name, item)
  }
}

module.exports = CuckooFilter
