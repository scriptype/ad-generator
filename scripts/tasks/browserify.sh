$BIN/browserify \
  --delay=100 \
  --verbose \
  --transform [ babelify --presets [ @babel/preset-env ] ] \
  --outfile $JS_OUTPUT \
  --debug \
  $JS_INPUT
