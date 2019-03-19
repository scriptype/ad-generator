module.exports = {
  "extends": "standard",
  "parser": "babel-eslint",
  "rules": {
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }]
  }
}
