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
  const indicators = myContainer.querySelectorAll(`.${defaultClassNames.INDICATOR}`)
  const panels = myContainer.querySelectorAll(`.${defaultClassNames.ITEM}`)

  t.is(
    indicators.length,
    imageCount,
    'Correct amount of indicators created'
  )

  t.is(
    myContainer.querySelectorAll(`.${defaultClassNames.INDICATOR_ACTIVE}`).length,
    1,
    'There is only one active indicator'
  )

  const activePanelIndex = 4
  const activeIndicator = indicators[activePanelIndex]
  const activePanel = panels[activePanelIndex]
  activeIndicator.click()
  t.true(
    activePanel.classList.contains(defaultClassNames.ITEM_ACTIVE),
    'When nth indicator is clicked, nth panel becomes active'
  )
})

test('classNames', t => {
  function expectClassName($el, className, title) {
    t.true(
      $el.classList.contains(className),
      `${title} gets className passed from classNames`
    )
  }

  const myContainer = createEl(3)

  const classNames = {
    el: 'test-el',
    container: 'test-container',
    indicators: 'test-indicators',
    indicator: 'test-indicator',
    indicatorActive: 'test-indicator-active',
    item: 'test-item',
    itemActive: 'test-item-active'
  }

  const myCarousel = carousel({
    el: myContainer,
    showIndicators: true,
    classNames
  })

  const { defaultClassNames } = myCarousel.__test__

  const $container = myContainer.querySelector(`.${defaultClassNames.CONTAINER}`)
  const $indicators = myContainer.querySelector(`.${defaultClassNames.INDICATORS}`)
  const $indicatorAll = myContainer.querySelectorAll(`.${defaultClassNames.INDICATOR}`)
  const $indicatorActive = myContainer.querySelector(`.${defaultClassNames.INDICATOR_ACTIVE}`)
  const $itemAll = myContainer.querySelectorAll(`.${defaultClassNames.ITEM}`)
  const $itemActive = myContainer.querySelector(`.${defaultClassNames.ITEM_ACTIVE}`)

  expectClassName(myContainer, classNames.el, 'Container')
  expectClassName($container, classNames.container, 'Item Container')
  expectClassName($indicators, classNames.indicators, 'Indicator Container')
  $indicatorAll.forEach($indicator => {
    expectClassName($indicator, classNames.indicator, 'Each indicator')
  })
  expectClassName($indicatorActive, classNames.indicatorActive, 'Active indicator')
  $itemAll.forEach($item => {
    expectClassName($item, classNames.item, 'Each item')
  })
  expectClassName($itemActive, classNames.itemActive, 'Active item')
})
