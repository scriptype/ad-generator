const fs = require('fs')
const handlebars = require('handlebars')

const {
  HTML_CONTENT_INPUT,
  HTML_CONTENT_OUTPUT,
  data
} = process.env

const html = fs.readFileSync(HTML_CONTENT_INPUT, 'utf-8')
const template = handlebars.compile(html)
const dataObject = JSON.parse(data)

const output = template(dataObject)
fs.writeFileSync(HTML_CONTENT_OUTPUT, output)
