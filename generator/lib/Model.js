const InvalidTypeError = require('./InvalidTypeError')
const MissingKeyError = require('./MissingKeyError')

class Model {
  constructor(scheme, id) {
    this.scheme = scheme
    this.__id = id
  }

  set(data) {
    const { __id, scheme } = this

    Object.keys(scheme).forEach((key) => {
      const value = data[key]

      if (scheme[key].required && value == null) {
        throw new MissingKeyError(key, __id)
      }

      const candidateType = typeof value
      const validType = typeof scheme[key].type()
      if (candidateType !== validType) {
        throw new InvalidTypeError(candidateType, validType, key, __id)
      }

      this[key] = value
    })
    return this
  }
}

module.exports = Model
