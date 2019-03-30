import { debounce } from '../utils.js'

function getDimensions({ el, items }) {
  const elDimensions = el.getBoundingClientRect()
  const itemDimensions = items[0].getBoundingClientRect()
  return {
    el: elDimensions,
    item: itemDimensions
  }
}

function getCSS(elements) {
  const dimensions = getDimensions(elements)

  const itemMaxWidth = dimensions.el.width
  const containerWidth = dimensions.el.width * elements.items.length
  const containerHeight = dimensions.item.height

  return `
    .js-carousel-container {
      width: ${containerWidth}px;
      height: ${containerHeight}px;
      overflow: hidden;
    }

    .js-carousel-item {
      width: ${itemMaxWidth}px;
      float: left;
      text-align: center;
    }

    .js-carousel-item-content {
      max-width: ${itemMaxWidth}px;
    }
  `
}

function addStyles(css) {
  const styleId = 'carousel-style'
  const oldStyle = document.getElementById(styleId)
  if (oldStyle) {
    oldStyle.remove()
  }
  const style = document.createElement('style')
  style.id = styleId
  style.innerText = css.replace(/\n/g, '')
  document.head.insertAdjacentHTML('afterBegin', style.outerHTML)
}

function addClassNames(el, items) {
  el.classList.add('js-carousel-container')
  items.forEach(item => {
    item.classList.add('js-carousel-item')
    ;[...item.children].forEach(child => {
      child.classList.add('js-carousel-item-content')
    })
  })
}

function getContainer(el, items) {
  const container = document.createElement('div')
  items.map(item => {
    const wrapper = document.createElement('div')
    wrapper.appendChild(item)
    container.appendChild(wrapper)
  })
  el.innerHTML = ''
  el.appendChild(container)
  return container
}

function resize(elements) {
  const css = getCSS(elements)
  addStyles(css)
}

function init({ el }) {
  const itemContents = [...el.children]
  const container = getContainer(el, itemContents)
  const items = [...container.children]
  addClassNames(container, items)

  const onResize = resize.bind(null, { el, items })
  window.addEventListener('resize', debounce(onResize, 100))
  onResize()
}

export default {
  init
}
