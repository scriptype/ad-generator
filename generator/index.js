const itunes = require('./stores/itunes')
const [ appId ] = process.argv.slice(2)

itunes.fetch(appId).then(console.log)
