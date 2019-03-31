module.exports = {
  "extends": "standard",
  "parser": "babel-eslint",
  "env": {
    "browser": true
  },
  "rules": {
    "space-before-function-paren": ["error", {
      "anonymous": "never",
      "named": "never",
      "asyncArrow": "always"
    }],
    "brace-style": "off",
    "no-new": "off"
  }
}
