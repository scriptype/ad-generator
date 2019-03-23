const https = require('https')

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

function GET(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => resolve(data))
    })
    req.on('error', reject)
  })
}

module.exports = {
  truncate,
  GET
}
