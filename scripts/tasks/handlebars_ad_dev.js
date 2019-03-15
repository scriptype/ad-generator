const fs = require('fs')
const handlebars = require('handlebars')

const {
  HTML_CONTENT_INPUT,
  HTML_CONTENT_OUTPUT,
  DATA_PATH
} = process.env

const html = fs.readFileSync(HTML_CONTENT_INPUT, 'utf-8')
const data = fs.readFileSync(DATA_PATH, 'utf-8')
const template = handlebars.compile(html)

const dataObject = JSON.parse(data)

const output = template(dataObject)
fs.writeFileSync(HTML_CONTENT_OUTPUT, output)
