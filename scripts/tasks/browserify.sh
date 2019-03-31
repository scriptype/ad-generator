$BIN/browserify \
  --delay=100 \
  --verbose \
  --transform [ babelify --presets [ @babel/preset-env ] ] \
  --outfile $output \
  --debug \
  $input
