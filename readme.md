# Ad Generator

Produces a single image advertisement with the given data

## Setup

```sh
$ npm -v
6.1.0

$ node -v
v10.6.0

# Install dependencies
$ npm i
```

## Development

To start the dev environment, run:

```sh
npm start
```

Then open `localhost:8080` in your browser.

Further changes made in `src` folder will be watched and the page will be
automatically refreshed upon changes.

## Build

To finalize the work and produce a minimal build output, run:

```sh
npm run build
```

This will minify and inline all assets directly into html. You can check
`localhost:8080` after the build process is completed.

## Test

For running all tests (unit and ui automation), run the command below:

```sh
npm test
```

Unit and UI tests can also be run separately:

```sh
# Runs UI tests
npm run test:ui

# Runs unit tests
npm run test:unit
```
