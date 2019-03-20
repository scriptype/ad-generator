const test = require('ava')
const Store = require('./Store')

test('Store interface', t => {
  function fetchMethod() {
    return 'hello'
  }

  const storeInstance = new Store({
    method: fetchMethod
  })

  t.is(
    typeof storeInstance.fetch,
    'function',
    'Instance has a method named fetch.'
  )

  t.is(
    storeInstance.fetch(),
    fetchMethod(),
    'Fetch method returns the injected fetch method\'s return value.'
  )
})
