function truncate(text, limit, withEllipsis) {
  if (!limit || limit < 1 || limit !== parseInt(limit)) {
    throw Error('Expected second argument (limit) to be a positive integer')
  }
  if (limit >= text.length) {
    return text
  }
  const truncatedText = text.slice(0, limit)
  const ellipsis = withEllipsis ? '...' : ''
  return truncatedText + ellipsis
}

module.exports = {
  truncate
}
