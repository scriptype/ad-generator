import { debounce } from '../utils.js'

const classNames = {
  EL: 'js-carousel-el',
  CONTAINER: 'js-carousel-container',
  ITEM: 'js-carousel-item',
  ITEM_ACTIVE: 'js-carousel-item--active'
}

const STYLE_TAG_ID = 'carousel-style'

function addClassNames({ el, container, items }) {
  el.classList.add(classNames.EL)
  container.classList.add(classNames.CONTAINER)
  items.forEach(item => {
    item.classList.add(classNames.ITEM)
  })
}

function getCSS(options) {
  const { items, style } = options
  const dimensions = getDimensions(options)

  const itemMaxWidth = dimensions.el.width
  const containerWidth = dimensions.el.width * items.length
  const containerHeight = dimensions.item.height

  return `
    .${classNames.EL} {
      ${style.el};
    }

    .${classNames.CONTAINER} {
      width: ${containerWidth}px;
      height: ${containerHeight}px;
      overflow: hidden;
      ${style.container};
    }

    .${classNames.ITEM} {
      width: ${itemMaxWidth}px;
      float: left;
      text-align: center;
      opacity: .3;
      transition: opacity ${options.speed}ms;
      ${style.item};
    }

    .${classNames.ITEM_ACTIVE} {
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

function togglePressed(options, state, isActive) {
  return event => {
    if (state.pressed === isActive) {
      return
    }
    state.pressed = isActive
    state.x = isActive ? getX(event) : -1
    if (!isActive) {
      activatePanel(options)
    }
  }
}

function move({ container }, state) {
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

function activatePanel({ items, container, speed }) {
  const panels = items.map((item, index) => ({
    item,
    index
  }))

  const middle = window.innerWidth / 2
  const leftPanels = panels.filter(({ item }) => (
    item.getBoundingClientRect().left < middle
  ))

  const panelToActivate = leftPanels[leftPanels.length - 1] || panels[0]
  const itemWidth = items[0].getBoundingClientRect().width

  container.style.cssText += `;
    transform: translateX(${-itemWidth * panelToActivate.index}px);
    transition: transform ${speed}ms;
  `

  items.forEach(item => {
    if (item === panelToActivate.item) {
      item.classList.add(classNames.ITEM_ACTIVE)
    } else {
      item.classList.remove(classNames.ITEM_ACTIVE)
    }
  })
}

function getDimensions({ el, items }) {
  const elDimensions = el.getBoundingClientRect()
  const itemDimensions = items[0].getBoundingClientRect()
  return {
    el: elDimensions,
    item: itemDimensions
  }
}

function getContainer(el, itemContents) {
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

function reset(options) {
  const css = getCSS(options)
  addStyles(css)
  activatePanel(options)
}

function addEventListeners(options, state) {
  const { container } = options
  const onResize = reset.bind(null, options)
  window.addEventListener('resize', debounce(onResize, 100))
  const onTouchStart = togglePressed(options, state, true)
  const onTouchEnd = togglePressed(options, state, false)
  const onTouchMove = move(options, state)

  container.addEventListener('mousedown', onTouchStart)
  container.addEventListener('touchstart', onTouchStart)
  window.addEventListener('mousemove', onTouchMove)
  container.addEventListener('touchmove', onTouchMove)
  window.addEventListener('mouseup', onTouchEnd)
  container.addEventListener('touchend', onTouchEnd)
  container.addEventListener('touchcancel', onTouchEnd)
}

function init({ el, speed, style }) {
  const itemContents = [...el.children]
  const container = getContainer(el, itemContents)
  const items = [...container.children]

  const options = {
    el,
    container,
    items,
    itemContents,
    speed,
    style: Object.assign({
      el: '',
      container: '',
      item: '',
      itemActive: ''
    }, style)
  }

  const state = {
    pressed: false,
    x: -1
  }

  addClassNames(options)
  addEventListeners(options, state)
  reset(options)
}

export default {
  init
}
