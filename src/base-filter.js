const Red = require('@albert-team/red')

const Options = require('./options')

class BaseFilter {
  constructor(name, options = {}) {
    this.name = name
    this.options = new Options(options)

    const { client, host, port, password } = this.options
    this.client = client ? client : new Red(host, port, { password })
  }

  async connect() {
    await this.client.connect()
    if (this.options.reserved) await this.reserve()
  }

  async disconnect() {
    return this.client.disconnect()
  }

  async reserve() {}
}

module.exports = BaseFilter
