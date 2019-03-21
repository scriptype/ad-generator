const { truncate } = require('../utils')

class Advertisement {
  constructor(advertisementData) {
    this.data = advertisementData
  }

  toJSON() {
    const { id, images, name } = this.data
    return {
      id,
      img: {
        src: images[0],
        alt: `Screenshot of ${name}`
      },
      description: this.getDescription(),
      buttonText: this.getButtonText()
    }
  }

  getDescription() {
    const { description } = this.data
    return truncate(description, 157, true)
  }

  getButtonText() {
    const { price, formattedPrice } = this.data
    if (price > 0) {
      return `Buy for ${formattedPrice}`
    }
    return `Download For Free`
  }
}

module.exports = Advertisement
