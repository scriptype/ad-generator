const itunes = require('./stores/itunes')
const tasks = require('../scripts/tasks')
const exampleAppId = require('../test-app-itunes.json').trackId
const cliArguments = process.argv.slice(2)

const [ type, id, mode ] = cliArguments
const appId = id === 'example' ? exampleAppId : id

const task = (() => {
  switch (mode) {
    case '--dev':
      return tasks.dev.bind(tasks, { type })

    case '--serve':
      return tasks.build.bind(tasks, { type, serve: true })

    default:
      return tasks.build.bind(tasks, { type })
  }
})()

itunes.fetch(appId, type)
  .then(task)
  .catch(console.error)
