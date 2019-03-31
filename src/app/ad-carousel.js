import carousel from './lib/carousel.js'

const ui = {
  $adCarousel: document.getElementById('ad-carousel')
}

function init() {
  carousel.init({
    el: ui.$adCarousel,
    showIndicators: true,
    speed: 300,
    classNames: {
      item: 'ad-unit__carousel-item',
      indicators: 'ad-unit__carousel-indicators'
    }
  })
}

export default {
  init
}
