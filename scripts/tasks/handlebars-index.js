const fs = require('fs')
const handlebars = require('handlebars')
const { maybeFile } = require('../../lib/utils')

const {
  JS_OUTPUT_MIN,
  CSS_OUTPUT_MIN,
  HTML_CONTENT_OUTPUT_MIN,
  HTML_INPUT,
  HTML_OUTPUT
} = process.env

const js = maybeFile(JS_OUTPUT_MIN, 'utf-8')
const css = maybeFile(CSS_OUTPUT_MIN, 'utf-8')
const content = fs.readFileSync(HTML_CONTENT_OUTPUT_MIN, 'utf-8')
const html = fs.readFileSync(HTML_INPUT, 'utf-8')
const template = handlebars.compile(html)

const output = template({
  html: content,
  css: css ? `<style type="text/css">${css}</style>` : '',
  js: js ? `<script>${js}</script>` : ''
})

fs.writeFileSync(HTML_OUTPUT, output)
