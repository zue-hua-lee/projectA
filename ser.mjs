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
const port = 9424 // change the port number9444

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
  if(`${req.body.name}` == "" || `${req.body.mail}` == "" || `${req.body.phone}` == "" || 
     `${req.body.password1}` == "" || `${req.body.password2}` == ""){
    res.send("請輸入基本資料及密碼。")
    return 0
  }
  if(/\s/.test(`${req.body.name}`)){
    res.send("帳號名稱不可包含空格，請重新輸入。")
    return 0
  }
  if(`${req.body.password1}` != `${req.body.password2}`){
    res.send("重複密碼錯誤，請重新輸入。")
    return 0
  }
  if(`${req.body.password1}`.toUpperCase() == `${req.body.password1}` ||
     `${req.body.password1}`.toLowerCase() == `${req.body.password1}` ||
     `${req.body.password1}`.length < 6 || `${req.body.password1}`.length > 18){
    res.send("密碼輸入有誤，請確認格式是否正確。")
    return 0
  }
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    for(var key in data){
      if(key == `${req.body.name}`){
        res.send("帳號名稱已經存在，請重新命名。")
        return 0
      }  
    }
    data[`${req.body.name}`] = {}
    data[`${req.body.name}`]["gender"] = "尚未填寫"
    data[`${req.body.name}`]["born"] = "尚未填寫"
    data[`${req.body.name}`]["birth"] = "尚未填寫"
    data[`${req.body.name}`]["mail"] = `${req.body.mail}`
    data[`${req.body.name}`]["phone"] = `${req.body.phone}`
    data[`${req.body.name}`]["password"] = `${req.body.password1}`
    data[`${req.body.name}`]["trip_num"] = 0 //總行程數
    data[`${req.body.name}`]["product_num"] = 0 //總商品數
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
      var n = data[req.query.user_name]['trip_num']
      data[req.query.user_name]['trip'+n] = {}
      data[req.query.user_name]['trip'+n]['departure_country'] = req.query.departure_country
      data[req.query.user_name]['trip'+n]['departure_city'] = req.query.departure_city
      data[req.query.user_name]['trip'+n]['entry_country'] = req.query.entry_country
      data[req.query.user_name]['trip'+n]['entry_city'] = req.query.entry_city
      data[req.query.user_name]['trip'+n]['departure_year'] = req.query.departure_year
      data[req.query.user_name]['trip'+n]['departure_month'] = req.query.departure_month
      data[req.query.user_name]['trip'+n]['departure_date'] = req.query.departure_date
      data[req.query.user_name]['trip'+n]['entry_year'] = req.query.entry_year
      data[req.query.user_name]['trip'+n]['entry_month'] = req.query.entry_month
      data[req.query.user_name]['trip'+n]['entry_date'] = req.query.entry_date
      data[req.query.user_name]['trip'+n]['product_list'] = req.query.product_list
      data[req.query.user_name]['trip'+n]['luggage_size_list'] = req.query.luggage_size_list
      data[req.query.user_name]['trip'+n]['luggage_space_list'] = req.query.luggage_space_list
      data[req.query.user_name]['trip'+n]['set_tip'] = req.query.set_tip

      data[req.query.user_name]['trip_num'] = parseInt(n,10)+1 //總行程數+1

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
      var n = data[req.query.user_name]['product_num']
      data[req.query.user_name]['product'+n] = {}
      data[req.query.user_name]['product'+n]['set_product_name'] = req.query.set_product_name
      data[req.query.user_name]['product'+n]['product_place_country'] = req.query.product_place_country
      data[req.query.user_name]['product'+n]['product_place_city'] = req.query.product_place_city
      data[req.query.user_name]['product'+n]['set_shop_name'] = req.query.set_shop_name
      data[req.query.user_name]['product'+n]['set_shop_address'] = req.query.set_shop_address
      data[req.query.user_name]['product'+n]['request_product_list'] = req.query.request_product_list
      data[req.query.user_name]['product'+n]['set_product_quantity'] = req.query.set_product_quantity
      data[req.query.user_name]['product'+n]['shipping_address_country'] = req.query.shipping_address_country
      data[req.query.user_name]['product'+n]['shipping_address_city'] = req.query.shipping_address_city
      data[req.query.user_name]['product'+n]['product_arrive_year'] = req.query.product_arrive_year
      data[req.query.user_name]['product'+n]['product_arrive_month'] = req.query.product_arrive_month
      data[req.query.user_name]['product'+n]['product_arrive_date'] = req.query.product_arrive_date
      data[req.query.user_name]['product'+n]['request_remark'] = req.query.request_remark

      data[req.query.user_name]['product_num'] = parseInt(n,10)+1 //總商品數+1

      var str = JSON.stringify(data);
      fs.writeFile('data.json', str, function (err) {
          if (err) {console.error(err);}
          console.log('Add new request...')
      })
  })
  res.send("bbb")
})

//product_contant
app.post('/product_contant', (req, res) => { //用get傳
  fs.readFile('./data.json', function (err, data) {
      if (err) throw err;
      //將二進制數據轉換為字串符
      //var stu_list = data.toString();
      //將字符串轉換為 JSON 對象
      data = JSON.parse(data);
      //將傳來的資訊推送到數組對象中
      let str = []
      str = data[req.body.user_name][req.body.product]
      res.send(str)
  })
})

// main //select bar
app.post('/list',(req,res)=>{
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.send(data);
})

// personal_page
app.post('/read_personal', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    var array = ["","","","",""]
    data = JSON.parse(data)
    array[0] = data[`${req.body.name}`]["gender"]
    array[1] = data[`${req.body.name}`]["born"]
    array[2] = data[`${req.body.name}`]["birth"]
    array[3] = data[`${req.body.name}`]["mail"]
    array[4] = data[`${req.body.name}`]["phone"]
    res.send(array)
  })
})
app.post('/save_personal', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    data[`${req.body.old_name}`]["gender"] = `${req.body.gender}`
    data[`${req.body.old_name}`]["born"] = `${req.body.born}`
    data[`${req.body.old_name}`]["birth"] = `${req.body.birth}`
    data[`${req.body.old_name}`]["mail"] = `${req.body.mail}`
    data[`${req.body.old_name}`]["phone"] = `${req.body.phone}`
    if(`${req.body.new_name}` != `${req.body.old_name}`){
      data[`${req.body.new_name}`] = data[`${req.body.old_name}`]
      delete data[`${req.body.old_name}`]
    }
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
    })
  })
})