class Options {
  constructor(options = {}) {
    this.client = null // if provided, ignore host, port and password
    this.host = 'localhost'
    this.port = 6379
    this.password = null
    this.reserved = true // if false, ignore minCapacity and errorRate
    this.minCapacity = 1000
    this.errorRate = 0.001 // only apply for BloomFilter

    Object.assign(this, options)
  }
}

module.exports = Options
