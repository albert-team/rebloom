const BaseFilter = require('./base-filter')

class BloomFilter extends BaseFilter {
  constructor(name, options = {}) {
    super(name, options)
  }

  async createFilter() {
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

  async add(item) {
    return this.client.call('BF.ADD', this.name, item)
  }

  async addMany(...items) {
    return this.client.call('BF.MADD', this.name, ...items)
  }

  async exists(item) {
    return this.client.call('BF.EXISTS', this.name, item)
  }

  async existsMany(...items) {
    return this.client.call('BF.MEXISTS', this.name, ...items)
  }
}

module.exports = BloomFilter
