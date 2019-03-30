import carousel from './lib/carousel.js'

const ui = {
  $adCarousel: document.getElementById('ad-carousel')
}

function init() {
  carousel.init({
    el: ui.$adCarousel,
    speed: 300,
    style: {
      item: `
        padding-left: var(--padding);
        padding-right: var(--padding);
      `
    }
  })
}

export default {
  init
}
