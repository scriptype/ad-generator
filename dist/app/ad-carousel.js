import carousel from './lib/carousel.js'

const ui = {
  $adCarousel: document.getElementById('ad-carousel')
}

function init() {
  carousel.init({
    el: ui.$adCarousel
  })
}

export default {
  init
}
