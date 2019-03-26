const path = require('path')

const _root = path.join(__dirname, '..')
const root = (...args) => path.join(_root, ...args)
const src = (...args) => root('src', ...args)
const dist = (...args) => root('dist', ...args)

module.exports = {
  BIN: root('node_modules', '.bin'),
  SRC: src(),
  DIST: dist(),

  JS_INPUT: src('app.js'),
  JS_OUTPUT: dist('app.js'),
  JS_OUTPUT_MIN: dist('app.min.js'),

  CSS_INPUT: src('style.css'),
  CSS_OUTPUT: dist('style.css'),
  CSS_OUTPUT_MIN: dist('style.min.css'),

  HTML_AD_SINGLE_INPUT: src('ad-single.html'),
  HTML_AD_CAROUSEL_INPUT: src('ad-carousel.html'),
  HTML_AD_OUTPUT: dist('ad.html'),
  HTML_AD_OUTPUT_MIN: dist('ad.min.html'),

  HTML_INPUT: src('index.html'),
  HTML_OUTPUT: dist('index.tmp.html'),
  HTML_OUTPUT_MIN: dist('index.html'),
  HTML_OUTPUT_DEV: dist('index.html')
}
