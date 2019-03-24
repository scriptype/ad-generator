const { GET } = require('../../lib/utils')
const Store = require('../lib/Store')
const Advertisement = require('../lib/Advertisement')
const AdvertisementData = require('../lib/AdvertisementData')

const fetch = async (id) => {
  let data
  try {
    data = await GET(`https://itunes.apple.com/lookup?id=${id}`)
  } catch (e) {
    return Promise.reject(e)
  }
  const results = JSON.parse(data).results
  const app = results[0]
  const advertisementData = new AdvertisementData({
    id: app.trackId,
    name: app.trackName,
    description: app.description,
    images: app.screenshotUrls,
    price: app.price,
    formattedPrice: app.formattedPrice
  })
  const advertisement = new Advertisement(advertisementData)
  return advertisement.toJSON()
}

module.exports = new Store({
  method: fetch
})
