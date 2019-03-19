module.exports = {
  'Hello test': function(browser) {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body')
      .assert.containsText('body', 'Lorem')
      .end()
  }
}
