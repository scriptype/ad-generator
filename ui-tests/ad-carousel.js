const testAppData = require('../test-app-itunes.json')
const { truncate } = require('../lib/utils')

function expectElementToBeVisible(browser, elementName) {
  return (
    browser
      .expect
      .element(`[data-test-name="${elementName}"]`)
      .to.be.visible
  )
}

module.exports = {
  '@tags': ['carousel'],

  'Description is visible': function(browser) {
    browser.url('http://localhost:8080')
    expectElementToBeVisible(browser, 'ad-description')
  },

  'Description is correct': function(browser) {
    browser
      .expect
      .element('[data-test-name="ad-description"]')
      .text
      .to
      .equal(truncate(testAppData.description, 157, true))
  },

  'CTA Button is visible': function(browser) {
    expectElementToBeVisible(browser, 'ad-cta')
  },

  'CTA Button contains price': function(browser) {
    const { formattedPrice } = testAppData
    const pricePattern = new RegExp(formattedPrice.replace('$', ''), 'gi')
    browser
      .expect
      .element('[data-test-name="ad-cta"]')
      .text
      .to
      .match(pricePattern)
    browser.end()
  }
}
