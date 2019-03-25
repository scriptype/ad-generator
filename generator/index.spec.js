const { exec } = require('child_process')
const test = require('ava')
const { fileExists } = require('../lib/utils')
const { HTML_OUTPUT_MIN } = require('../scripts/env')
const testAppData = require('../test-app-itunes.json')

test.cb('Generator generates HTML', t => {
  const ps = exec(`node generator ${testAppData.trackId}`)

  ps.stderr.pipe(process.stderr)

  ps.on('close', code => {
    if (code === 0) {
      t.true(
        fileExists(HTML_OUTPUT_MIN),
        'HTML output is generated'
      )
      t.end()
    } else {
      t.fail('exited with non-zero')
      t.end()
    }
  })
})
