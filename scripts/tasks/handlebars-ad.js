const fs = require('fs')
const handlebars = require('handlebars')
const image2base64 = require('image-to-base64')

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

prepareTemplateData(dataObject, type)
  .then(templateData => {
    const output = template(templateData)
    fs.writeFileSync(HTML_AD_OUTPUT, output)
  })
  .catch(console.error)

async function prepareTemplateData(appData, templateType) {
  let dataModifier
  switch (templateType) {
    case 'single':
      dataModifier = {
        img: {
          ...appData.img,
          src: await imageToBase64(appData.img.src)
        }
      }
      break

    case 'carousel':
      dataModifier = {
        images: await Promise.all(
          appData.images.map(
            async (img) => ({
              ...img,
              src: await imageToBase64(img.src)
            })
          )
        )
      }
      break
  }

  return {
    ...appData,
    ...dataModifier
  }
}

async function imageToBase64(imageSrc) {
  const response = await image2base64(imageSrc)
  return `data:image/jpeg;base64,${response}`
}
