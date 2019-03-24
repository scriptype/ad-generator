const itunes = require('./stores/itunes')
const tasks = require('../scripts/tasks')
const [ appId, mode ] = process.argv.slice(2)

const task = (() => {
  switch (mode) {
    case '--dev':
      return tasks.dev.bind(tasks)

    case '--test':
      return tasks.build.bind(tasks, { test: true })

    default:
      return tasks.build.bind(tasks, { test: false })
  }
})()

itunes.fetch(appId)
  .then(task)
  .catch(console.error)
