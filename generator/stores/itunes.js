const https = require('https')
const Store = require('../lib/Store')
const Advertisement = require('../lib/Advertisement')
const AdvertisementData = require('../lib/AdvertisementData')

const fetch = id => new Promise((resolve, reject) => {
  const url = `https://itunes.apple.com/lookup?id=${id}`
  let data = ''
  const req = https.get(url, res => {
    res.on('data', chunk => data += chunk)
    res.on('end', () => {
      const results = JSON.parse(data).results
      const app = results[0]
      const advertisementData = new AdvertisementData({
        name: app.trackName,
        description: app.description,
        images: app.screenshotUrls,
        price: app.price,
        formattedPrice: app.formattedPrice
      })
      const advertisement = new Advertisement(advertisementData)
      resolve(advertisement.toJSON())
    })
  })
  req.on('error', reject)
})

module.exports = new Store({
  method: fetch
})
