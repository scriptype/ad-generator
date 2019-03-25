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

## Generator CLI

```sh
node generator <id> [<options>]
```

### `id`

`example`: If you pass `example`, it will generate advertisement for the app that's used
for testing in the project. See `test-app-itunes.json`.

`id`: If you pass an application id here, it will generate ad for the
given application.

### `options`

When omitted, it will generate an ad, minify the output code and inline all assets
into the generated html file.

`--serve`: Same as omitting `options`, except it will serve the `dist` folder.

`--dev`: It will start development environment and serve unminified assets at localhost:8080.

## Development

To generate advertisement for an application, run:

```sh
node generator <id> --dev
```

Then open `localhost:8080` in your browser.

Further changes made in `src` folder will be watched and the page will be
automatically refreshed upon changes.

## Build

To finalize the work and produce a minimal build output, run:

```sh
node generator <id>
```

This will minify and inline all assets directly into html.

You can add `--serve` flag at the end, to also serve the `dist` folder:

```sh
node generator <id> --serve
```

You can check `localhost:8080` after the build process is completed.

## Working on a test application

If you pass `example` as the first argument to Generator, it will generate ad for
the selected example application. This can be useful for test purposes.

```sh
# Start dev environment with example app
node generator example --dev

# Build optimized ad
node generator example

# Also serve the output folder
node generator example --serve
```

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
