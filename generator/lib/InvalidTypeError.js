class InvalidTypeError extends Error {
  constructor(candidateType, validType, key, model) {
    super()
    this.message = `Invalid type (${candidateType}) for: ${model}.${key}. Expected type: ${validType}`
  }
}

module.exports = InvalidTypeError
