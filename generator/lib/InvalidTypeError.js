class InvalidTypeError extends Error {
  constructor(candidateType, validType, key, model) {
    return new Error(
      `Invalid type (${candidateType}) for: ${model}.${key}. Expected type: ${validType}`
    )
  }
}

module.exports = InvalidTypeError
