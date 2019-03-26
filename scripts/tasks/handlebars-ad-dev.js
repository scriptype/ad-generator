const fs = require('fs')
const handlebars = require('handlebars')

const {
  HTML_AD_SINGLE_INPUT,
  HTML_AD_CAROUSEL_INPUT,
  HTML_AD_OUTPUT,
  type,
  data
} = process.env

const templateFile = type === 'single'
  ? HTML_AD_SINGLE_INPUT
  : HTML_AD_CAROUSEL_INPUT

const html = fs.readFileSync(templateFile, 'utf-8')
const template = handlebars.compile(html)
const dataObject = JSON.parse(data)

const output = template(dataObject)
fs.writeFileSync(HTML_AD_OUTPUT, output)
