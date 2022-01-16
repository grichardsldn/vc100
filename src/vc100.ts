import express from 'express';

const app = express()

app.get("/", async (req: express.Request, res: express.Response) => {
  console.log("call to / with query: " + JSON.stringify( req.query) )

  res.send('hello world')
})

app.listen(3000)