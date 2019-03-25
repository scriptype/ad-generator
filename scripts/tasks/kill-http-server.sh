ps aux \
  | grep http-server \
  | grep $(pwd) \
  | awk '{ print $2 }' \
  | xargs kill -9 &2> /dev/null
