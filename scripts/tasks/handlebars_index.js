const fs = require('fs')
const handlebars = require('handlebars')

const {
  JS_OUTPUT_MIN,
  CSS_OUTPUT_MIN,
  HTML_CONTENT_OUTPUT_MIN,
  HTML_INPUT,
  HTML_OUTPUT
} = process.env

const js = fs.readFileSync(JS_OUTPUT_MIN, 'utf-8')
const css = fs.readFileSync(CSS_OUTPUT_MIN, 'utf-8')
const content = fs.readFileSync(HTML_CONTENT_OUTPUT_MIN, 'utf-8')
const html = fs.readFileSync(HTML_INPUT, 'utf-8')
const template = handlebars.compile(html)

const output = template({
  html: content,
  css,
  js
})

fs.writeFileSync(HTML_OUTPUT, output)
