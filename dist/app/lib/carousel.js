import { debounce } from '../utils.js'

const Carousel = (() => {
  const classNames = {
    EL: 'js-carousel-el',
    CONTAINER: 'js-carousel-container',
    ITEM: 'js-carousel-item',
    ITEM_ACTIVE: 'js-carousel-item--active',
    ITEM_CONTENT: 'js-carousel-item-content',
  }

  const STYLE_TAG_ID = 'carousel-style'

  const options = {
    el: null,
    container: null,
    items: [],
    itemContents: [],
    speed: .3
  }

  const state = {
    pressed: false,
    x: -1
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

  function move(state, el) {
    return event => {
      if (state.pressed) {
        const left = el.getBoundingClientRect().left - 13
        const clientX = getX(event)
        const direction = state.x < clientX ? 1 : state.x > clientX ? -1 : 0
        const diff = Math.abs(state.x - clientX) * direction
        el.style.cssText += `;
          transform: translateX(${left + diff}px);
          transition: none;
        `
        state.x = clientX
      }
    }
  }

  function activatePanel() {
    const { items, container } = options
    const panelsWithPositions = items.map((item, index) => {
      return {
        item,
        index,
        posX: item.getBoundingClientRect().left
      }
    })

    const middle = window.innerWidth / 2
    const leftPanels = panelsWithPositions.filter(({ posX}) => {
      return posX < middle
    })

    const panelToActivate = leftPanels[leftPanels.length - 1] || panelsWithPositions[0]
    const itemWidth = items[0].getBoundingClientRect().width

    container.style.cssText += `;
      transform: translateX(${-itemWidth * panelToActivate.index}px);
      transition: transform .3s;
    `

    items.forEach(item => {
      if (item === panelToActivate.item) {
        item.classList.add('js-carousel-item--active')
      } else {
        item.classList.remove('js-carousel-item--active')
      }
    })
  }

  function addClassNames() {
    const { el, container, items } = options
    el.classList.add(classNames.EL)
    container.classList.add(classNames.CONTAINER)
    items.forEach(item => {
      item.classList.add(classNames.ITEM)
      ;[...item.children].forEach(child => {
        child.classList.add(classNames.ITEM_CONTENT)
      })
    })
  }

  function getDimensions() {
    const { el, items } = options
    const elDimensions = el.getBoundingClientRect()
    const itemDimensions = items[0].getBoundingClientRect()
    return {
      el: elDimensions,
      item: itemDimensions
    }
  }

  function getContainer() {
    const { el, itemContents } = options
    const container = document.createElement('div')
    itemContents.map(item => {
      const wrapper = document.createElement('div')
      wrapper.appendChild(item)
      container.appendChild(wrapper)
    })
    el.innerHTML = ''
    el.appendChild(container)
    return container
  }

  function getCSS() {
    const dimensions = getDimensions()

    const { items } = options
    const itemMaxWidth = dimensions.el.width
    const containerWidth = dimensions.el.width * items.length
    const containerHeight = dimensions.item.height

    return `
      .${classNames.EL} {}

      .${classNames.CONTAINER} {
        width: ${containerWidth}px;
        height: ${containerHeight}px;
        overflow: hidden;
      }

      .${classNames.ITEM} {
        width: ${itemMaxWidth}px;
        float: left;
        text-align: center;
        opacity: .3;
        transition: opacity ${options.speed}s;
      }

      .${classNames.ITEM_ACTIVE} {
        opacity: 1;
      }

      .${classNames.ITEM_CONTENT} {
        max-width: ${itemMaxWidth}px;
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

  function reset(event) {
    const { items, container } = options
    const css = getCSS()
    addStyles(css)
    activatePanel({ items, container })
  }

  function addEventListeners() {
    const { container } = options
    window.addEventListener('resize', debounce(reset, 100))
    const onTouchStart = togglePressed(true)
    const onTouchEnd = togglePressed(false)
    const onTouchMove = move(state, container)

    container.addEventListener('mousedown', onTouchStart)
    container.addEventListener('touchstart', onTouchStart)
    window.addEventListener('mousemove', onTouchMove)
    container.addEventListener('touchmove', onTouchMove)
    window.addEventListener('mouseup', onTouchEnd)
    container.addEventListener('touchend', onTouchEnd)
    container.addEventListener('touchcancel', onTouchEnd)
  }

  function init({ el, speed }) {
    options.el = el
    options.speed = speed || options.speed
    options.itemContents = [...el.children]
    options.container = getContainer()
    options.items = [...options.container.children]

    addClassNames()
    addEventListeners()
    reset()
  }

  return Object.freeze({
    init
  })
})()


export default Carousel
