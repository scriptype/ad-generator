const path = require('path')

const _root = path.join(__dirname, '..')
const root = (...args) => path.join(_root, ...args)
const src = (...args) => path.join(_root, 'src', ...args)
const dist = (...args) => path.join(_root, 'dist', ...args)

module.exports = {
  BIN: root('node_modules', '.bin'),
  SRC: src(),
  DIST: dist(),

  JS_INPUT: src('app.js'),
  JS_OUTPUT: dist('app.js'),
  JS_OUTPUT_MIN: dist('app.min.js'),

  CSS_INPUT: src('style.css'),
  CSS_OUTPUT: dist('style.min.css'),

  HTML_CONTENT_INPUT: src('ad.html'),
  HTML_CONTENT_OUTPUT: dist('ad.html'),
  HTML_CONTENT_OUTPUT_MIN: dist('ad.min.html'),

  HTML_INPUT: src('index.html'),
  HTML_OUTPUT: dist('index.tmp.html'),
  HTML_OUTPUT_MIN: dist('index.html'),

  DATA_PATH: src('data.json')
}
