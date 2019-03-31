const path = require('path')
const { run } = require('salinger')
const { fileExists } = require('../lib/utils')

const envPath = path.join(__dirname, 'env')

const {
  JS_SINGLE_INPUT,
  JS_SINGLE_OUTPUT,
  JS_SINGLE_OUTPUT_MIN,
  JS_CAROUSEL_INPUT,
  JS_CAROUSEL_OUTPUT,
  JS_CAROUSEL_OUTPUT_MIN,
  CSS_INPUT,
  HTML_AD_OUTPUT,
  HTML_AD_OUTPUT_MIN,
  HTML_OUTPUT,
  HTML_OUTPUT_MIN
} = require(envPath)

const jsFiles = {
  single: {
    input: JS_SINGLE_INPUT,
    output: JS_SINGLE_OUTPUT,
    minified: JS_SINGLE_OUTPUT_MIN
  },
  carousel: {
    input: JS_CAROUSEL_INPUT,
    output: JS_CAROUSEL_OUTPUT,
    minified: JS_CAROUSEL_OUTPUT_MIN
  }
}

module.exports = {
  async buildJS(type) {
    if (!fileExists(jsFiles[type].input)) {
      console.info(`${jsFiles[type].input} doesn't exist. Skipping building JS.`)
      return Promise.resolve()
    }
    await run('browserify', jsFiles[type])
    await run('uglify', {
      input: jsFiles[type].output,
      output: jsFiles[type].minified
    })
  },

  async buildCSS() {
    if (!fileExists(CSS_INPUT)) {
      console.info(`${CSS_INPUT} doesn't exist. Skipping building CSS.`)
      return Promise.resolve()
    }
    await run('postcss')
  },

  async buildHTML(data, type) {
    await run('handlebars-ad', {
      type,
      data: JSON.stringify(data)
    })
    await run('html-minifier', {
      IN_PATH: HTML_AD_OUTPUT,
      OUT_PATH: HTML_AD_OUTPUT_MIN
    })
  },

  async inlineAssets(type) {
    await run('handlebars-index', {
      JS_OUTPUT_MIN: jsFiles[type].minified
    })
    await run('html-minifier', {
      IN_PATH: HTML_OUTPUT,
      OUT_PATH: HTML_OUTPUT_MIN
    })
  },

  async build({ type, serve }, data) {
    await run('refresh')
    await Promise.all([
      this.buildJS(type),
      this.buildCSS(),
      this.buildHTML(data, type)
    ])
    await this.inlineAssets(type)
    await run('clean')
    if (serve) await run('http-server')
  },

  async dev({ type }, data) {
    await run('refresh')
    await run('copy')
    await run('handlebars-ad-dev', {
      type,
      data: JSON.stringify(data)
    })
    await run('handlebars-index-dev', {
      JS_OUTPUT: jsFiles[type].output
    })
    await Promise.all([
      run('watch', {
        type,
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

  async testUI(type) {
    const types = ['single', 'carousel']
    const skiptags = types.filter(t => t !== type).join(',')
    run('build-example', { type })
    await run('sleep', { seconds: 6 })
    await run('nightwatch', { skiptags })
    await run('kill-http-server')
  },

  async test() {
    await this.testUnit()
    await this.testUI('single')
    await this.testUI('carousel')
  }
}
