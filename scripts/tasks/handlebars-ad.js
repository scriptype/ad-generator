const fs = require('fs')
const handlebars = require('handlebars')
const image2base64 = require('image-to-base64')

const {
  HTML_CONTENT_INPUT,
  HTML_CONTENT_OUTPUT,
  data
} = process.env

const html = fs.readFileSync(HTML_CONTENT_INPUT, 'utf-8')
const template = handlebars.compile(html)
const dataObject = JSON.parse(data)

image2base64(dataObject.img.src)
  .then(response => {
    const dataUrl = `data:image/jpeg;base64,${response}`
    const output = template({
      ...dataObject,
      ...{
        img: {
          ...dataObject.img,
          src: dataUrl
        }
      }
    })
    fs.writeFileSync(HTML_CONTENT_OUTPUT, output)
  })
  .catch(error => {
    console.error(error)
  })
