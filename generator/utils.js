function truncate(text, limit, withEllipsis) {
  if (limit && limit >= text.length) {
    return text
  }
  const truncatedText = text.slice(0, limit)
  const ellipsis = withEllipsis ? '...' : ''
  return truncatedText + ellipsis
}

module.exports = {
  truncate
}
