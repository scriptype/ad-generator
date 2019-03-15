const fse = require('fs-extra')
const path = require('path')
const watch = require('watch')
const { run } = require('salinger')

const {
  SRC,
  DIST,
  ON_UPDATE_TEMPLATE
} = process.env

watch.watchTree(SRC, (f, curr, prev) => {
  if (typeof f == "object" && prev === null && curr === null) {
    // Finished walking the tree
    return
  }

  const targetPath = f.replace(SRC, DIST)

  if (curr.nlink === 0) {
    console.log('static: remove', targetPath)
    fse.remove(targetPath, err => {
      if (err) {
        console.error(err)
      }
    })

  } else {
    console.log('static: upsert', f)
    fse.copy(f, targetPath, async (err) => {
      if (err) {
        return console.error(err)
      }
      const tasksToRun = JSON.parse(ON_UPDATE_TEMPLATE)
      for (const [index, task] of tasksToRun.entries()) {
        await run(task)
      }
    })
  }
})
