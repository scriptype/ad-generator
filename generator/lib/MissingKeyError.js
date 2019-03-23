class MissingKeyError extends Error {
  constructor(key, model) {
    super()
    this.message = `Missing key: ${model}.${key}`
  }
}

module.exports = MissingKeyError
