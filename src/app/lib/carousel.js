import {
  debounce,
  addClass,
  removeClass
} from '../utils.js'

function carousel(params) {
  const options = {}
  const elements = {}
  const state = {
    pressed: false,
    x: -1,
    active: 0
  }

  const defaultClassNames = {
    EL: 'js-carousel-el',
    CONTAINER: 'js-carousel-container',
    INDICATORS: 'js-carousel-indicators',
    INDICATOR: 'js-carousel-indicator',
    INDICATOR_ACTIVE: 'js-carousel-indicator--active',
    ITEM: 'js-carousel-item',
    ITEM_ACTIVE: 'js-carousel-item--active'
  }

  const STYLE_TAG_ID = 'carousel-style'

  init(params)

  function getCSS() {
    const { style, speed } = options
    const { items } = elements
    const dimensions = getDimensions()

    const itemMaxWidth = dimensions.el.width
    const containerWidth = dimensions.el.width * items.length
    const containerHeight = dimensions.item.height

    const {
      EL,
      CONTAINER,
      INDICATORS,
      INDICATOR,
      INDICATOR_ACTIVE,
      ITEM,
      ITEM_ACTIVE
    } = defaultClassNames

    return `
      .${EL} {
        --js-carousel-indicator-size: .5em;
        position: relative;
        ${style.el};
      }

      .${CONTAINER} {
        width: ${containerWidth}px;
        height: ${containerHeight}px;
        overflow: hidden;
        ${style.container};
      }

      .${INDICATORS} {
        position: absolute;
        left: 50%;
        top: calc(100% + var(--js-carousel-indicator-size));
        display: inline-block;
        height: var(--js-carousel-indicator-size);
        overflow: hidden;
        transform: translate(-50%, 0);
        ${style.indicators};
      }

      .${INDICATOR} {
        display: block;
        float: left;
        width: var(--js-carousel-indicator-size);
        height: var(--js-carousel-indicator-size);
        background: rgba(0, 0, 0, .5);
        box-shadow: 0 0 0 rgba(255, 255, 255, .5);
        border-radius: 50%;
        vertical-align: middle;
        transform: scale(.66);
        transition: all ${speed}ms;
        ${style.indicator};
      }

      .${INDICATOR}:not(:first-child) {
        margin-left: calc(var(--js-carousel-indicator-size) * 2);
      }

      .${INDICATOR_ACTIVE} {
        background: rgba(0, 0, 0, .75);
        box-shadow: 0 0 0 rgba(255, 255, 255, .75);
        transform: scale(1);
      }

      .${ITEM} {
        width: ${itemMaxWidth}px;
        float: left;
        text-align: center;
        opacity: .3;
        transition: opacity ${speed}ms;
        ${style.item};
      }

      .${ITEM_ACTIVE} {
        opacity: 1;
        ${style.itemActive};
      }
    `
  }

  function addStyles(css) {
    const oldStyle = document.getElementById(STYLE_TAG_ID)
    if (oldStyle) {
      oldStyle.remove()
    }
    const style = document.createElement('style')
    style.id = STYLE_TAG_ID
    style.innerText = css.replace(/\n/g, '')
    document.head.insertAdjacentHTML('afterBegin', style.outerHTML)
  }

  function getX(event) {
    return event.clientX || event.touches[0].clientX
  }

  function togglePressed(isActive) {
    return event => {
      if (state.pressed === isActive) {
        return
      }
      state.pressed = isActive
      state.x = isActive ? getX(event) : -1
      if (!isActive) {
        activatePanel()
      }
    }
  }

  function move() {
    const { container } = elements
    return event => {
      if (state.pressed) {
        const left = container.getBoundingClientRect().left
        const clientX = getX(event)
        const direction = state.x < clientX ? 1 : state.x > clientX ? -1 : 0
        const diff = Math.abs(state.x - clientX) * direction
        container.style.cssText += `;
          transform: translateX(${left + diff}px);
          transition: none;
        `
        state.x = clientX
      }
    }
  }

  function activatePanel() {
    const { speed, alternateSpeed, classNames } = options
    const { items, container, indicators } = elements

    const panels = items.map((item, index) => ({
      item,
      index
    }))

    const middle = window.innerWidth / 2
    const leftPanels = panels.filter(({ item }) => (
      item.getBoundingClientRect().left < middle
    ))

    const panelToActivate = leftPanels[leftPanels.length - 1] || panels[0]
    const isDifferentPanel = state.active !== panelToActivate.index
    const itemWidth = items[0].getBoundingClientRect().width

    container.style.cssText += `;
      transform: translateX(${-itemWidth * panelToActivate.index}px);
      transition: transform ${isDifferentPanel ? speed : alternateSpeed}ms;
    `

    items.forEach(item => {
      if (item === panelToActivate.item) {
        addClass(
          item,
          defaultClassNames.ITEM_ACTIVE,
          classNames.itemActive
        )
      } else {
        removeClass(
          item,
          defaultClassNames.ITEM_ACTIVE,
          classNames.itemActive
        )
      }
    })

    ;[...indicators.children].forEach((indicator, index) => {
      if (index === panelToActivate.index) {
        addClass(
          indicator,
          defaultClassNames.INDICATOR_ACTIVE,
          classNames.indicatorActive
        )
      } else {
        removeClass(
          indicator,
          defaultClassNames.INDICATOR_ACTIVE,
          classNames.indicatorActive
        )
      }
    })

    state.active = panelToActivate.index
  }

  function getDimensions() {
    const { el, items } = elements
    const elDimensions = el.getBoundingClientRect()
    const itemDimensions = items[0].getBoundingClientRect()
    return {
      el: elDimensions,
      item: itemDimensions
    }
  }

  function buildUI(el, itemContents) {
    const { showIndicators, classNames } = options
    el.innerHTML = ''
    addClass(el, defaultClassNames.EL, classNames.el)

    const container = document.createElement('div')
    addClass(container, defaultClassNames.CONTAINER, classNames.items)
    itemContents.map(item => {
      const wrapper = document.createElement('div')
      wrapper.appendChild(item)
      addClass(wrapper, defaultClassNames.ITEM, classNames.item)
      container.appendChild(wrapper)
    })
    el.appendChild(container)

    let indicators = null
    if (showIndicators) {
      indicators = document.createElement('div')
      addClass(
        indicators,
        defaultClassNames.INDICATORS,
        classNames.indicators
      )
      itemContents.forEach((item, index) => {
        const indicator = document.createElement('span')
        addClass(
          indicator,
          defaultClassNames.INDICATOR,
          classNames.indicator
        )
        indicators.appendChild(indicator)
      })
      el.appendChild(indicators)
    }

    return {
      container,
      indicators
    }
  }

  function addEventListeners() {
    const { container } = elements
    window.addEventListener('resize', debounce(reset, 100))
    const onTouchStart = togglePressed(true)
    const onTouchEnd = togglePressed(false)
    const onTouchMove = move()

    container.addEventListener('mousedown', onTouchStart)
    container.addEventListener('touchstart', onTouchStart)

    window.addEventListener('mousemove', onTouchMove)
    container.addEventListener('touchmove', onTouchMove)

    window.addEventListener('mouseup', onTouchEnd)
    container.addEventListener('touchend', onTouchEnd)
    container.addEventListener('touchcancel', onTouchEnd)
  }

  function reset() {
    addStyles(getCSS())
    activatePanel()
  }

  function init(params) {
    const {
      el,
      showIndicators = false,
      speed = 100,
      alternateSpeed,
      style = {},
      classNames = {}
    } = params

    Object.assign(options, {
      el,
      showIndicators,
      speed,
      alternateSpeed: alternateSpeed || speed * 1.5,

      style: Object.assign({
        el: '',
        container: '',
        indicators: '',
        indicator: '',
        item: '',
        itemActive: ''
      }, style),

      classNames: Object.assign({
        el: '',
        container: '',
        indicators: '',
        indicator: '',
        item: '',
        itemActive: ''
      }, classNames)
    })

    const itemContents = [...el.children]
    const { container, indicators } = buildUI(el, itemContents)
    const items = [...container.children]

    Object.assign(elements, {
      el,
      container,
      items,
      itemContents,
      indicators
    })

    addEventListeners()
    reset()
  }
}

export default carousel
