const itunes = require('./stores/itunes')
const tasks = require('../scripts/tasks')
const [ appId, mode ] = process.argv.slice(2)

const taskName = mode === '--dev' ? 'dev' : 'build'
const task = tasks[taskName]

itunes.fetch(appId)
  .then(task.bind(tasks))
  .catch(console.error)
