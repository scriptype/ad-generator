const fs = require('fs')

const fileExists = path => {
  try { return !!fs.statSync(path) }
  catch (e) { return false }
}

const maybeFile = path => {
  try { return fs.readFileSync(path, 'utf-8') }
  catch (e) { return '' }
}

module.exports = {
  fileExists,
  maybeFile
}
