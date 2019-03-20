const fs = require('fs')
const test = require('ava')
const { fileExists, maybeFile } = require('./utils')

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
