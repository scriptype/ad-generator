const path = require('path')
const { run } = require('salinger')

const envPath = path.join(__dirname, 'env')

const {
  HTML_CONTENT_OUTPUT,
  HTML_CONTENT_OUTPUT_MIN,
  HTML_OUTPUT,
  HTML_OUTPUT_MIN,
  DATA_PATH
} = require(envPath)

module.exports = {
  async buildJS() {
    await run('babel')
    await run('uglify')
  },

  async buildCSS() {
    await run('postcss')
  },

  async buildHTML() {
    await run('handlebars_ad')
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

  async build() {
    await run('refresh')
    await Promise.all([
      this.buildJS(),
      this.buildCSS(),
      this.buildHTML()
    ])
    await this.inlineAssets()
    await run('clean')
    await run('http-server')
  },

  async dev() {
    await run('refresh')
    await run('copy')
    await run('handlebars_ad_dev')
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
