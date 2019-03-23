const path = require('path')
const { run } = require('salinger')
const { fileExists } = require('./utils')

const envPath = path.join(__dirname, 'env')

const {
  JS_INPUT,
  CSS_INPUT,
  HTML_CONTENT_OUTPUT,
  HTML_CONTENT_OUTPUT_MIN,
  HTML_OUTPUT,
  HTML_OUTPUT_MIN
} = require(envPath)

module.exports = {
  async buildJS() {
    if (!fileExists(JS_INPUT)) {
      console.info(`${JS_INPUT} doesn't exist. Skipping building JS.`)
      return Promise.resolve()
    }
    await run('browserify')
    await run('uglify')
  },

  async buildCSS() {
    if (!fileExists(CSS_INPUT)) {
      console.info(`${CSS_INPUT} doesn't exist. Skipping building CSS.`)
      return Promise.resolve()
    }
    await run('postcss')
  },

  async buildHTML(data) {
    await run('handlebars_ad', {
      data: JSON.stringify(data)
    })
    await run('html_minifier', {
      IN_PATH: HTML_CONTENT_OUTPUT,
      OUT_PATH: HTML_CONTENT_OUTPUT_MIN
    })
  },

  async inlineAssets() {
    await run('handlebars_index')
    await run('html_minifier', {
      IN_PATH: HTML_OUTPUT,
      OUT_PATH: HTML_OUTPUT_MIN
    })
  },

  async build(data) {
    await run('refresh')
    await Promise.all([
      this.buildJS(),
      this.buildCSS(),
      this.buildHTML(data)
    ])
    await this.inlineAssets()
    await run('clean')
    await run('http-server')
  },

  async dev(data) {
    await run('refresh')
    await run('copy')
    await run('handlebars_ad_dev', {
      data: JSON.stringify(data)
    })
    await run('handlebars_index_dev')
    await Promise.all([
      run('watch', {
        ON_UPDATE_TEMPLATE: JSON.stringify([
          'handlebars_ad_dev',
          'handlebars_index_dev'
        ])
      }),
      run('livereload'),
      run('http-server')
    ])
  }
}
