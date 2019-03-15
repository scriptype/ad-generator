const path = require('path')
const fs = require('fs')
const handlebars = require('handlebars')

const {
  DIST,
  JS_OUTPUT,
  CSS_OUTPUT,
  HTML_CONTENT_OUTPUT,
  HTML_INPUT,
  HTML_OUTPUT_DEV
} = process.env

const js = `
  <script src="${path.relative(DIST, JS_OUTPUT)}"></script>
  <script src="http://localhost:35729/livereload.js?snipver=1"></script>
`
const css = `<link rel="stylesheet" href="${path.relative(DIST, CSS_OUTPUT)}" />`
const content = fs.readFileSync(HTML_CONTENT_OUTPUT, 'utf-8')
const html = fs.readFileSync(HTML_INPUT, 'utf-8')
const template = handlebars.compile(html)

const output = template({
  html: content,
  css,
  js,
  isDev: 1
})

fs.writeFileSync(HTML_OUTPUT_DEV, output)
