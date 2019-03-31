export default {
  require: [
    'esm',
    './browser-env.js'
  ],

  babel: {
    extensions: [
      'js',
      'mjs'
    ],
    testOptions: {
      presets: [
        ['module:ava/stage-4', { modules: false }]
      ]
    }
  },

  files: [
    'src/**/*.spec.js',
    'scripts/**/*.spec.js',
    'generator/**/*.spec.js',
    'lib/**/*.spec.js'
  ],

  verbose: true
}
