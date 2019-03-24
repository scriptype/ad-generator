const fs = require('fs')
const test = require('ava')
const {
  fileExists,
  maybeFile,
  truncate
} = require('./utils')

test('fileExists', t => {
  const file = {
    name: `${Math.round(Math.random() * 10000)}.txt`
  }

  t.false(
    fileExists(file.name),
    'Returns false if file is not found'
  )

  fs.writeFileSync(file.name, '')

  t.true(
    fileExists(file.name),
    'Returns true if file is found'
  )

  fs.unlinkSync(file.name)
})

test('maybeFile', t => {
  const file = {
    name: `${Math.round(Math.random() * 10000)}.txt`,
    content: 'Hello'
  }

  t.is(
    maybeFile(file.name), '',
    'Returns empty string if file is not found'
  )

  fs.writeFileSync(file.name, file.content)

  t.is(
    maybeFile(file.name), file.content,
    'Returns file content if file is found'
  )

  fs.unlinkSync(file.name)
})

test('truncate limit argument', t => {
  t.plan(7)
  const text = 'lorem ipsum dolor'

  try {
    truncate(text)
  } catch (e) {
    t.pass('throws error when limit is not passed')
  }

  try {
    truncate(text, 0)
  } catch (e) {
    t.pass('throws error when limit is 0')
  }

  try {
    truncate(text, -1)
  } catch (e) {
    t.pass('throws error when limit is negative')
  }

  try {
    truncate(text, NaN)
  } catch (e) {
    t.pass('throws error when limit is NaN')
  }

  t.is(
    truncate(text, text.length),
    text,
    'When limit equals to text length, returns text itself'
  )

  t.is(
    truncate(text, text.length + 1),
    text,
    'When limit is greater than text length, returns text itself'
  )

  t.is(
    truncate(text, 4),
    text.slice(0, 4),
    'When 0 > limit < text.length, it returns first [limit] characters of text'
  )
})

test('truncate withEllipsis argument', t => {
  const text = 'lorem ipsum dolor'

  t.is(
    truncate(text, 3, true),
    text.slice(0, 3) + '...',
    'When withEllipsis is true, it returns truncated text + three dots'
  )
})
