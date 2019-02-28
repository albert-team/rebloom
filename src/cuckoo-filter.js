const BaseFilter = require('./base-filter')

class CuckooFilter extends BaseFilter {
  constructor(name, options = {}) {
    super(name, options)
  }

  async createFilter() {
    try {
      await this.client.call('CF.RESERVE', this.name, String(this.options.minCapacity))
    } catch (err) {
      if (err.message === 'ERR item exists') return // ignore the error if the filter is already created
      throw err
    }
  }

  async add(item, notExistsOnly = true) {
    let command = 'CF.ADD'
    if (notExistsOnly) command = 'CF.ADDNX'
    return this.client.call(command, this.name, String(item))
  }

  async exists(item) {
    return this.client.call('CF.EXISTS', this.name, String(item))
  }

  async count(item) {
    return this.client.call('CF.COUNT', this.name, String(item))
  }

  async remove(item) {
    return this.client.call('CF.DEL', this.name, String(item))
  }
}

module.exports = CuckooFilter
