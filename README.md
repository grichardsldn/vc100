# vc100

Authless row/column text-based display server for server/browser.  Click for fullscreen on devices that allow it.

## Post message interface

query params

* id - identify this text, messages for the same id replace earlier messages.
* msg - the text to display.
* row - zero-indexed row number.
* col - column number, defaults to 0.
* len - number of characters to block-out, default is the length of the message.
* style - NORMAL or BIG (double size). Defaults to NORMAL.
* colour - css colour, defaults to #b59900.

## Simplified interface

```
curl localhost:1664:/line/5?msg="this message goes on line 2"
curl -G --data-urlencode "msg=`uptime`" localhost:1664/line/1
```


