#!/usr/bin/env node

import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from 'socket.io'



const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 9867 // change the port number

app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected')

    // 建立讀取聊天紀錄的路由(ajax)
    app.get('/chat_history', (req, res) => {
      fs.readFile(`${__dirname}/chat.txt`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        res.send(data);
      });
    });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
    io.emit('chat message', msg)
    fs.appendFile(`${__dirname}/chat.txt`, `${msg}\n`, (err) => {
      if (err) console.log(err)
    })
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

//fff
app.get('/to_deal', (req,res) => {
  const data = JSON.parse(fs.readFileSync('jump_state.json'));
  // console.log(data['state'])
  data['state'] = 'to_deal'
  var str = JSON.stringify(data);
  fs.writeFile('jump_state.json', str, function (err) {
      if (err) {console.error(err);}
      console.log('err1')
  })
})
app.get('/to_chatlist', (req,res) => {
  const data = JSON.parse(fs.readFileSync('jump_state.json'));
  // console.log(data['state'])
  data['state'] = 'to_chatlist'
  var str = JSON.stringify(data);
  fs.writeFile('jump_state.json', str, function (err) {
      if (err) {console.error(err);}
      console.log('err2')
  })
})
