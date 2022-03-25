import express from 'express'
import {LineCommand, DisplayMessage, TextStyle} from "~shared/vc100"

const bodyParser = require('body-parser');
//const url = require('url');
//const querystring = require('querystring');

const app = express()
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket: any) => {
  console.log('a user connected');
  io.emit('message', 'hi');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


app.get("/background/:colour", async (req: express.Request, res: express.Response) => {
  //console.log("call to / with query: " + JSON.stringify( req.query) )
  console.log(`background: ${req.params.colour}`)
  io.emit('background', req.params.colour)
  res.send('ok')
})

app.get("/line/:line", async (req: express.Request, res: express.Response) => {
  io.emit('line', { line: Number(req.params.line), string: req.query.msg } as LineCommand)
  res.send('ok')
})

app.get("/test", async (req: express.Request, res: express.Response) => {
  io.emit('DISPLAY_MESSAGE', 
  [ 
    {
      rowIndex: 0,
      columnIndex: 0,
      message: "MMMHello world",
      boxLength: 15,
      style: "NORMAL",
      colour: "white",
    },
    {
      rowIndex: 1,
      columnIndex: 1,
      message: "A",
      boxLength: 1,
      style: "NORMAL",
      colour: "red",
    },
    {
      rowIndex: 5,
      columnIndex: 5,
      message: "Hello world2",
      boxLength: 20,
      style: "NORMAL",
      colour: "blue",
    },
    {
      rowIndex: 6,
      columnIndex: 4,
      message: "AB",
      boxLength: 2,
      style: "BIG",
      colour: "pink",
    },
  ] as DisplayMessage[])
  res.send('ok')
})

app.get('/', (req, res) => {
  res.sendFile('client/index.html', {'root': '../'});
});

app.get('/gridmono_1_1_1.ttf', (req, res) => {
  res.sendFile('client/include/gridmono_1_1_1.ttf', {'root': '../'});
});

app.get('/main.js', (req, res) => {
  console.log('client/dist/main.js');
  res.sendFile('client/dist/main.js', {'root': '../', headers: {
      'content-type': "text/javascript",
  }});
});

const port = 1664;
server.listen(port, () => {
  console.log(`listening on *:1664`);
});
