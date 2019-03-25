const itunes = require('./stores/itunes')
const tasks = require('../scripts/tasks')
const exampleAppId = require('../test-app-itunes.json').trackId
const cliArguments = process.argv.slice(2)

const options = {
  appId: cliArguments[0] === 'example'
    ? exampleAppId
    : cliArguments[0],
  mode: cliArguments[1]
}

const task = (() => {
  switch (options.mode) {
    case '--dev':
      return tasks.dev.bind(tasks)

    case '--serve':
      return tasks.build.bind(tasks, { serve: true })

    default:
      return tasks.build.bind(tasks, {})
  }
})()

itunes.fetch(options.appId)
  .then(task)
  .catch(console.error)
