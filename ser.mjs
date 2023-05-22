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
const port = 9444 // change the port number9444

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

// homepage
app.post('/login', (req, res) => {
  if(`${req.body.account}` == "" || `${req.body.password}` == ""){
    res.send("請輸入帳號及密碼。")
    return 0
  }
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    var found = 0
    for(var key in data){
      if(key == `${req.body.account}` && data[key]["password"] == `${req.body.password}`){
        res.send("帳號密碼正確")
        return 0
      }  
    }
    res.send("帳號或密碼錯誤，請重新確認！")
  })
})
app.post('/register', (req, res) => {
  if(`${req.body.account}` == "" || `${req.body.password}` == ""){
    res.send("請輸入帳號及密碼。")
    return 0
  }  
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    for(var key in data){
      if(key == `${req.body.account}`){
        res.send("帳號名稱已經存在，請重新命名。")
        return 0
      }  
    }
    
    data[`${req.body.account}`] = {}
    data[`${req.body.account}`]["password"] = `${req.body.password}`
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
    })
    res.send("註冊成功！")
  })
})

// add_new_journey
app.get('/journey_data', (req, res) => { //用get傳
  fs.readFile('./data.json', function (err, data) {
      if (err) throw err;
      //將二進制數據轉換為字串符
      //var stu_list = data.toString();
      //將字符串轉換為 JSON 對象
      data = JSON.parse(data);
      //將傳來的資訊推送到數組對象中
      data[req.query.user_name]['departure_country'] = req.query.departure_country
      data[req.query.user_name]['departure_city'] = req.query.departure_city
      data[req.query.user_name]['entry_country'] = req.query.entry_country
      data[req.query.user_name]['entry_city'] = req.query.entry_city
      data[req.query.user_name]['departure_year'] = req.query.departure_year
      data[req.query.user_name]['departure_month'] = req.query.departure_month
      data[req.query.user_name]['departure_date'] = req.query.departure_date
      data[req.query.user_name]['entry_year'] = req.query.entry_year
      data[req.query.user_name]['entry_month'] = req.query.entry_month
      data[req.query.user_name]['entry_date'] = req.query.entry_date
      data[req.query.user_name]['product_list'] = req.query.product_list
      data[req.query.user_name]['luggage_size_list'] = req.query.luggage_size_list
      data[req.query.user_name]['luggage_space_list'] = req.query.luggage_space_list
      data[req.query.user_name]['set_tip'] = req.query.set_tip
      var str = JSON.stringify(data);
      fs.writeFile('data.json', str, function (err) {
          if (err) {console.error(err);}
          console.log('Add new trip...')
      })
  })
  res.send("aaa")
})

// add_new_request
app.get('/request_data', (req, res) => { //用get傳
  fs.readFile('./data.json', function (err, data) {
      if (err) throw err;
      //將二進制數據轉換為字串符
      //var stu_list = data.toString();
      //將字符串轉換為 JSON 對象
      data = JSON.parse(data);
      //將傳來的資訊推送到數組對象中
      data[req.query.user_name]['set_product_name'] = req.query.set_product_name
      data[req.query.user_name]['product_place_country'] = req.query.product_place_country
      data[req.query.user_name]['product_place_city'] = req.query.product_place_city
      data[req.query.user_name]['set_shop_name'] = req.query.set_shop_name
      data[req.query.user_name]['set_shop_address'] = req.query.set_shop_address
      data[req.query.user_name]['request_product_list'] = req.query.request_product_list
      data[req.query.user_name]['set_product_quantity'] = req.query.set_product_quantity
      data[req.query.user_name]['shipping_address_country'] = req.query.shipping_address_country
      data[req.query.user_name]['shipping_address_city'] = req.query.shipping_address_city
      data[req.query.user_name]['product_arrive_year'] = req.query.product_arrive_year
      data[req.query.user_name]['product_arrive_month'] = req.query.product_arrive_month
      data[req.query.user_name]['product_arrive_date'] = req.query.product_arrive_date
      data[req.query.user_name]['request_remark'] = req.query.request_remark
      var str = JSON.stringify(data);
      fs.writeFile('data.json', str, function (err) {
          if (err) {console.error(err);}
          console.log('Add new request...')
      })
  })
  res.send("bbb")
})

// main
app.post('/list',(req,res)=>{
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.send(data);
})