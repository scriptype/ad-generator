const { exec } = require('child_process')
const test = require('ava')
const { fileExists } = require('../lib/utils')
const { HTML_OUTPUT_MIN } = require('../scripts/env')
const testAppData = require('../test-app-itunes.json')

function generate(type, id) {
  return new Promise((resolve, reject) => {
    const ps = exec(`node generator ${type} ${id}`)

    ps.stderr.pipe(process.stderr)

    ps.on('close', code => {
      if (code === 0) resolve()
      else reject(code)
    })
  })
}

test.serial('Generator generates single ad', async (t) => {
  try {
    await generate('single', testAppData.trackId)
  } catch (e) {
    t.fail('exited with non-zero')
  }
  t.true(
    fileExists(HTML_OUTPUT_MIN),
    'HTML output is generated'
  )
})

test.serial('Generator generates carousel ad', async (t) => {
  try {
    await generate('carousel', testAppData.trackId)
  } catch (e) {
    t.fail('exited with non-zero')
  }
  t.true(
    fileExists(HTML_OUTPUT_MIN),
    'HTML output is generated'
  )
})
