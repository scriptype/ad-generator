const test = require('ava')
const utils = require('./utils')

test('truncate limit argument', t => {
  t.plan(7)
  const text = 'lorem ipsum dolor'

  try {
    utils.truncate(text)
  } catch (e) {
    t.pass('throws error when limit is not passed')
  }

  try {
    utils.truncate(text, 0)
  } catch (e) {
    t.pass('throws error when limit is 0')
  }

  try {
    utils.truncate(text, -1)
  } catch (e) {
    t.pass('throws error when limit is negative')
  }

  try {
    utils.truncate(text, NaN)
  } catch (e) {
    t.pass('throws error when limit is NaN')
  }

  t.is(
    utils.truncate(text, text.length),
    text,
    'When limit equals to text length, returns text itself'
  )

  t.is(
    utils.truncate(text, text.length + 1),
    text,
    'When limit is greater than text length, returns text itself'
  )

  t.is(
    utils.truncate(text, 4),
    text.slice(0, 4),
    'When 0 > limit < text.length, it returns first [limit] characters of text'
  )
})

test('truncate withEllipsis argument', t => {
  const text = 'lorem ipsum dolor'

  t.is(
    utils.truncate(text, 3, true),
    text.slice(0, 3) + '...',
    'When withEllipsis is true, it returns truncated text + three dots'
  )
})
