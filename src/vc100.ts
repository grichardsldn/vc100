import express from 'express';

const app = express()
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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});