const https = require('https')
const Store = require('../lib/Store')

const fetch = id => new Promise((resolve, reject) => {
  const url = `https://itunes.apple.com/lookup?id=${id}`
  let data = ''
  const req = https.get(url, res => {
    res.on('data', chunk => data += chunk)
    res.on('end', () => resolve(JSON.parse(data)))
  })
  req.on('error', reject)
})

module.exports = new Store({
  method: fetch
})
