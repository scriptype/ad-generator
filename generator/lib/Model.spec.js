const test = require('ava')
const Model = require('./Model')
const MissingKeyError = require('./MissingKeyError')
const InvalidTypeError = require('./InvalidTypeError')

class MyModel extends Model {
  constructor(data) {
    const scheme = {
      name: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      favoriteNumber: {
        type: Number,
        required: true
      },
      age: {
        type: Number
      }
    }
    super(scheme, 'MyModel')
    this.set(data)
  }
}

test('Scheme validation: missing key', t => {
  t.plan(3)

  try {
    const myInstance = new MyModel({
      description: 'lorem'
    })
  } catch (e) {
    t.true(
      e instanceof MissingKeyError,
      'When a required key is not provided, a MissingKeyError should be thrown'
    )

    t.true(
      /MyModel/.test(e.message),
      'MissingKeyError contains the given id of class'
    )

    t.true(
      /name/.test(e.message),
      'MissingKeyError contains name of the missing key'
    )
  }
})

test('Scheme validation: missing a non-required key', t => {
  const myInstance = new MyModel({
    name: 'lorem',
    favoriteNumber: 5
  })

  t.pass(
    'It does not throw any errors when the missing keys are not required'
  )
})

test('Scheme validation: passing 0 to a required number field', t => {
  const myInstance = new MyModel({
    name: 'lorem',
    favoriteNumber: 0
  })

  t.pass(
    'Passing 0 to a required number field is okay'
  )
})

test('Scheme validation: invalid type', t => {
  t.plan(3)

  try {
    const myInstance = new MyModel({
      name: 5
    })
  } catch (e) {
    t.true(
      e instanceof InvalidTypeError,
      'When a key has a different type than expected, an InvalidTypeError is thrown'
    )

    t.true(
      /MyModel/.test(e.message),
      'InvalidTypeError contains the given id of class'
    )

    t.true(
      /name/.test(e.message),
      'InvalidTypeError contains name of the invalid-typed key'
    )
  }
})
