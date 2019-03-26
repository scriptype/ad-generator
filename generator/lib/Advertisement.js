const { truncate } = require('../../lib/utils')

class Advertisement {
  constructor(advertisementData, type) {
    this.data = advertisementData
    this.type = type
  }

  toJSON() {
    const { id } = this.data
    return {
      id,
      ...this.getImages(),
      description: this.getDescription(),
      buttonText: this.getButtonText()
    }
  }

  getImages() {
    const { images, name } = this.data
    if (this.type === 'single') {
      return {
        img: {
          src: images[0],
          alt: `Screenshot of ${name}`
        }
      }
    } else if (this.type === 'carousel') {
      return {
        images: images.map(img => ({
          src: img,
          alt: `Screenshot of ${name}`
        }))
      }
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
