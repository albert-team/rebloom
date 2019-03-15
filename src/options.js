class Options {
  constructor(options = {}) {
    this.host = 'localhost'
    this.port = 6379
    this.password = null
    this.client = null // if provided, ignore host and port options
    this.minCapacity = 1000
    this.errorRate = 0.001 // only apply for BloomFilter

    Object.assign(this, options)
  }
}

module.exports = Options
