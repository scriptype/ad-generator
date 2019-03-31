import test from 'ava'
import { debounce } from './utils.mjs'

test.cb('debounce', t => {
  t.plan(1)

  function testFunction() {
    runTimes++
  }

  const debouncedFunction = debounce(testFunction, 300)

  let runTimes = 0
  let intervalLimit = 6
  const interval = setInterval(() => {
    debouncedFunction()
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
