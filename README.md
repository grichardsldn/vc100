# vc100

```
curl localhost:1664:/line/5?msg="hello@20world"
curl -G --data-urlencode "msg=`uptime`" localhost:1664/line/1
```

# bundled assets

This article explains how to include fonts and css view webpack, at the moment
this is just included by the server manually:

https://webpack.js.org/guides/asset-management/

# target interface

- page state held in server
- text colour
- positioning in 80x25 grid
- wallpaper definition in config
- double size text
- messages time out
- messages length settable, pads with spaces
- left/right/centre align?
