const path = require('path')

const root = path.join(__dirname, '..')

const BIN = path.join(root, 'node_modules', '.bin')
const SRC = path.join(root, 'src')
const DIST = path.join(root, 'dist')

const JS_INPUT = path.join(SRC, 'app.js')
const JS_OUTPUT = path.join(DIST, 'app.js')
const JS_OUTPUT_MIN = path.join(DIST, 'app.min.js')

module.exports = {
  BIN,
  SRC,
  DIST,
  JS_INPUT,
  JS_OUTPUT,
  JS_OUTPUT_MIN
}
