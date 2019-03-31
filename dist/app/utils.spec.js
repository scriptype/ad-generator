import test from 'ava'
import { debounce, addClass } from './utils.mjs'

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

test('addClass', t => {
  const myElement = document.createElement('div')
  const testClass1 = 'my-test-class'
  const testClass2 = 'my-test-class-2'
  const testClass3 = ''
  const testClass4 = null
  const testClass5 = undefined

  addClass(myElement, testClass1)
  t.true(
    myElement.classList.contains(testClass1),
    'It adds the className'
  )

  addClass(myElement, testClass2, testClass3, testClass4, testClass5)
  t.pass('It does not throw error if some of the given classes are falsy')
  t.deepEqual(
    [...myElement.classList.values()],
    [ testClass1, testClass2 ],
    'It only adds thruthy valid classnames'
  )
})
