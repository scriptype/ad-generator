const path = require('path')
const { run } = require('salinger')
const { fileExists } = require('../lib/utils')

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
    await run('handlebars-ad', {
      data: JSON.stringify(data)
    })
    await run('html-minifier', {
      IN_PATH: HTML_CONTENT_OUTPUT,
      OUT_PATH: HTML_CONTENT_OUTPUT_MIN
    })
  },

  async inlineAssets() {
    await run('handlebars-index')
    await run('html-minifier', {
      IN_PATH: HTML_OUTPUT,
      OUT_PATH: HTML_OUTPUT_MIN
    })
  },

  async build({ serve }, data) {
    await run('refresh')
    await Promise.all([
      this.buildJS(),
      this.buildCSS(),
      this.buildHTML(data)
    ])
    await this.inlineAssets()
    await run('clean')
    if (serve) await run('http-server')
  },

  async dev(data) {
    await run('refresh')
    await run('copy')
    await run('handlebars-ad-dev', {
      data: JSON.stringify(data)
    })
    await run('handlebars-index-dev')
    await Promise.all([
      run('watch', {
        data: JSON.stringify(data),
        onUpdateTemplate: JSON.stringify([
          'handlebars-ad-dev',
          'handlebars-index-dev'
        ])
      }),
      run('livereload'),
      run('http-server')
    ])
  },

  async testUnit() {
    await run('ava')
  },

  async testUI() {
    run('build-example')
    await run('sleep', { seconds: 6 })
    await run('nightwatch')
    await run('kill-http-server')
  },

  async test() {
    await this.testUnit()
    await this.testUI()
  }
}
