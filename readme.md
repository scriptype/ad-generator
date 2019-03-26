# Ad Generator

Generates a highly-optimized advertisement for apps from itunes store.

## Setup

```sh
$ npm -v
6.1.0

$ node -v
v10.6.0

# Install dependencies
$ npm i
```

## Generator CLI

```sh
node generator <type> <id> [<options>]
```

### type (single | carousel)

`single`: Generate a single image advertisement

`carousel`: Generate an advertisement with multiple images shown in a carousel.

### id (example | [app-id])

`example`: If you pass `example`, it will generate advertisement for the app that's used
for testing in the project. See `test-app-itunes.json`.

`id`: If you pass an application id here, it will generate ad for the
given application.

### options [--serve | --dev]

When omitted, it will generate an ad, minify the output code and inline all assets
into the generated html file.

`--serve`: Same as omitting `options`, except it will serve the `dist` folder.

`--dev`: It will start development environment and serve unminified assets at localhost:8080.

## Development

To generate advertisement for an application, run:

```sh
node generator <type> <id> --dev
```

Then open `localhost:8080` in your browser.

Further changes made in `src` folder will be watched and the page will be
automatically refreshed upon changes.

## Build

To finalize the work and produce a minimal build output, run:

```sh
node generator <type> <id>
```

This will minify and inline all assets directly into html.

You can add `--serve` flag at the end, to also serve the `dist` folder:

```sh
node generator <type> <id> --serve
```

You can check `localhost:8080` after the build process is completed.

## Working on a test application

If you pass `example` as the second argument (as `<id>`) to Generator, it will
generate ad for the selected example application. This can be useful for test purposes.

```sh
# Start dev environment with example app
node generator <type> example --dev

# Build optimized ad
node generator <type> example

# Also serve the output folder
node generator <type> example --serve
```

Same goals can be achieved npm scripts:

```sh
# Start dev environment with single image ad
npm start:single

# Start dev environment with carousel ad
npm start:carousel

# Generate and finalize the advertisement. Will also start http-server.
npm run build:single

# Same, but carousel ad
npm run build:carousel
```

## Test

For running all tests (unit and ui automation), run the command below:

```sh
npm test
```

Unit and UI tests can also be run separately:

```sh
# Run UI tests
npm run test:ui single
npm run test:ui carousel

# Run unit tests
npm run test:unit
```
