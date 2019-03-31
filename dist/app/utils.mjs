function debounce(fn, time) {
  let scheduled = false
  return (...args) => {
    if (scheduled) {
      return false
    }
    scheduled = true
    setTimeout(() => {
      fn(...args)
      scheduled = false
    }, time)
  }
}

function editClasses(el, mode, ...classes) {
  classes.forEach(className => {
    if (className != null && className !== '') {
      el.classList[mode](className)
    }
  })
}

function addClass(el, ...classes) {
  return editClasses(el, 'add', ...classes)
}

function removeClass(el, ...classes) {
  return editClasses(el, 'remove', ...classes)
}

export {
  debounce,
  addClass,
  removeClass
}
