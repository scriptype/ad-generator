import test from 'ava'
import carousel from './carousel'

function getImageUrl(index) {
  return `<img src="http://lorempixel.com/800/800/sports/${index}" />`
}

function nArray(n, mapFn) {
  return [...Array(n)].map(mapFn)
}

function createEl(imageCount) {
  const markup = `
    <div id="my-el">
      ${nArray(imageCount, (item, index) => getImageUrl(index)).join('')}
    </div>
  `
  const el = document.createElement('div')
  el.innerHTML = markup
  return el.firstElementChild
}

test('Basic parameters', t => {
  const myContainer = createEl(3)
  carousel({
    el: myContainer
  })

  t.pass('It runs when no parameter other than el is passed')
})

test('Indicators', t => {
  const imageCount = 5
  const myContainer = createEl(imageCount)
  const myCarousel = carousel({
    el: myContainer,
    showIndicators: true
  })

  const { defaultClassNames } = myCarousel.__test__
  t.is(
    myContainer.querySelectorAll(`.${defaultClassNames.INDICATOR}`).length,
    imageCount,
    'Correct amount of indicators created'
  )

  t.is(
    myContainer.querySelectorAll(`.${defaultClassNames.INDICATOR_ACTIVE}`).length,
    1,
    'There is only one active indicator'
  )
})
