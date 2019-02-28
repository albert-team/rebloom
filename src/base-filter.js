const path = require('path')
const Red = require('@albert-team/red')

class BaseFilter {
  constructor(name, options = {}) {
    this.name = name
    this.options = Object.assign(
      {
        host: 'localhost',
        port: 6379,
        minCapacity: 1000,
        errorRate: 0.001
      },
      options
    )

    const { host, port } = this.options
    this.client = new Red(host, port)
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
    if (!modules || !modules.includes('bf'))
      return this.client.call(
        'MODULE',
        'LOAD',
        path.join(__dirname, 'redisbloom-1.1.1.so')
      )
  }

  async createFilter() {}
}

module.exports = BaseFilter
