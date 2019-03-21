class RequiredKeyError extends Error {
  constructor(key, model) {
    return new Error(`Missing key: ${model}.${key}`)
  }
}

module.exports = RequiredKeyError
