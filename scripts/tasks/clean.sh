# Delete all files inside $DIST, except minified html output.
find $DIST | grep -v $DIST\$ | grep -v $HTML_OUTPUT_MIN | xargs rm
