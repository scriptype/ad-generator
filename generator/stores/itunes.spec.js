const test = require('ava')
const itunes = require('./itunes')

const exampleAppId = 442007571

test('fetch', async (t) => {
  try {
    const appData = await itunes.fetch(exampleAppId)
    t.is(
      appData.id,
      exampleAppId,
      'It fetches the correct application from the store'
    )
  } catch (e) {
    t.fail(e)
  }
})
