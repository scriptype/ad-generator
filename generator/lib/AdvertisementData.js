const Model = require('./Model')

class AdvertisementData extends Model {
  constructor(data) {
    const scheme = {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      images: {
        type: Array,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      formattedPrice: {
        type: String,
        required: true
      }
    }
    super(scheme, 'AdvertisementData')
    return this.set(data)
  }
}

module.exports = AdvertisementData
