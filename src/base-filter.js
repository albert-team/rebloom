const path = require('path')
const Red = require('@albert-team/red')

class BaseFilter {
  constructor(name, options = {}) {
    this.name = name
    this.options = Object.assign(
      {
        host: 'localhost',
        port: 6379,
        client: null, // if provided, ignore host and port options
        minCapacity: 1000,
        errorRate: 0.001 // only apply for BloomFilter
      },
      options
    )
    const { host, port, client } = this.options
    this.client = client ? client : new Red(host, port)
  }

  async connect() {
    return this.client.connect()
  }

  async disconnect() {
    return this.client.disconnect()
  }

  async prepare() {
    await this.loadModule()
    await this.createFilter()
  }

  async loadModule() {
    const [modules] = await this.client.call('MODULE', 'LIST')
    if (modules && modules.includes('bf')) return
    return this.client.call('MODULE', 'LOAD', path.join(__dirname, 'redisbloom-1.1.1.so'))
  }

  async createFilter() {}
}

module.exports = BaseFilter
