const { run } = require('salinger')

module.exports = {
  async buildJS() {
    await run('babel')
    run('uglify')
  },

  buildCSS() {
    run('postcss')
  },

  async build() {
    await run('refresh')
    this.buildJS()
    this.buildCSS()
  }
}
