function expectElementToBeVisible(browser, elementName) {
  return (
    browser
      .expect
      .element(`[data-test-name="${elementName}"]`)
      .to.be.visible
  )
}

module.exports = {
  'Banner is visible': function(browser) {
    browser.url('http://localhost:8080')
    expectElementToBeVisible(browser, 'ad-banner')
  },

  'Description is visible': function(browser) {
    expectElementToBeVisible(browser, 'ad-description')
  },

  'CTA Button is visible': function(browser) {
    expectElementToBeVisible(browser, 'ad-cta')
    browser.end()
  }
}
