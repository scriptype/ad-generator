/* Store interface */
class Store {
  constructor(options) {
    this.method = options.method
  }

  fetch(...args) {
    return this.method(...args)
  }
}

module.exports = Store
