const { run } = require('salinger')

module.exports = {
  async buildJS() {
    await run('refresh')
    await run('babel')
    run('uglify')
  }
}
