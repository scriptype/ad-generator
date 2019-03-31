import test from 'ava'
import { debounce } from './utils.mjs'

test.cb('debounce', t => {
  t.plan(3)

  function testFunction(arg1, arg2) {
    t.is(arg1, testArg1, 'It passes arguments to debounced function')
    t.is(arg2, testArg2, 'It passes multiple arguments to debounced function')
    runTimes++
  }

  let runTimes = 0
  let intervalLimit = 6
  const testArg1 = 'my argument'
  const testArg2 = 'my second argument'
  const debouncedFunction = debounce(testFunction, 300)

  const interval = setInterval(() => {
    debouncedFunction(testArg1, testArg2)
    if (intervalLimit-- === 0) {
      clearInterval(interval)
      t.is(
        runTimes, 1,
        'Despite being called multiple times, ran only once'
      )
      t.end()
    }
  }, 50)
})
