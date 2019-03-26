const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')
const { fileExists } = require('../../lib/utils')

const {
  DIST,
  JS_OUTPUT,
  CSS_OUTPUT,
  HTML_CONTENT_OUTPUT,
  HTML_INPUT,
  HTML_OUTPUT_DEV
} = process.env

const js = [
  `
  <script>
    document.write(
      '<script src="http://' +
      (location.host || 'localhost').split(':')[0] +
      ':35729/livereload.js?snipver=1"></' +
      'script>'
    )
  </script>
  `
]

if (fileExists(JS_OUTPUT)) {
  js.unshift(
    `<script type="module" src="${path.relative(DIST, JS_OUTPUT)}"></script>`
  )
}

const css = []
if (fileExists(CSS_OUTPUT)) {
  css.unshift(
    `<link rel="stylesheet" href="${path.relative(DIST, CSS_OUTPUT)}" />`
  )
}

const content = fs.readFileSync(HTML_CONTENT_OUTPUT, 'utf-8')
const html = fs.readFileSync(HTML_INPUT, 'utf-8')
const template = handlebars.compile(html)

const output = template({
  html: content,
  css: css.join('\n'),
  js: js.join('\n'),
  isDev: 1
})

fs.writeFileSync(HTML_OUTPUT_DEV, output)
