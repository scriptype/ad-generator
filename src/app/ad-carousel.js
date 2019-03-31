import carousel from './lib/carousel.js'

const ui = {
  $adCarousel: document.getElementById('ad-carousel')
}

function init() {
  carousel({
    el: ui.$adCarousel,
    showIndicators: true,
    speed: 300,
    classNames: {
      item: 'ad-unit__carousel-item',
      indicators: 'ad-unit__carousel-indicators',
      indicator: 'ad-unit__carousel-indicator',
      indicatorActive: 'ad-unit__carousel-indicator--active'
    }
  })
}

export default {
  init
}
