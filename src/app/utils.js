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

export {
  debounce
}
