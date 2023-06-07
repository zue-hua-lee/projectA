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
const port = 9473 // change the port number9444

app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
  console.log('a user connected')

    // 建立讀取聊天紀錄的路由(ajax)
    app.get('/chat_history', (req, res) => {
      fs.readFile(`${__dirname}/chat_records.json`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Internal Server Error');
        }
        res.send(data);
      });
    });


    socket.on('join room', (user_name) => {
      loadChatHistory(user_name, (chatHistory) => {
        socket.emit('chat history', chatHistory);
      });
    });

    socket.on('chat message', (chatData) => {
      console.log('message: ' + chatData.message);
      saveChatRecord(chatData); // 儲存新訊息到本地聊天紀錄
      io.emit('chat message', chatData); // 將訊息傳送給所有使用者，更新聊天室訊息
    });

    socket.on('update chat', (chatData) => {
      io.emit('chat message', chatData); // 將訊息傳送給所有使用者，更新聊天室訊息
    });

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

function loadChatHistory(user_name, callback) {
  fs.readFile(`${__dirname}/chat_records.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let chatRecords = {};
    if (data) {
      chatRecords = JSON.parse(data);
    }
    const chatHistory = chatRecords.users && chatRecords.users[user_name] ? chatRecords.users[user_name] : [];
    callback(chatHistory);
  });
}

function saveChatRecord(chatData) {
  fs.readFile(`${__dirname}/chat_records.json`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let chatRecords = {};
    if (data) {
      chatRecords = JSON.parse(data);
    }
    const user_name = chatData.user_name;
    if (!chatRecords.users || !chatRecords.users[user_name]) {
      chatRecords.users = chatRecords.users || {};
      chatRecords.users[user_name] = [];
    }
    chatRecords.users[user_name].push(chatData);
    fs.writeFile(`${__dirname}/chat_records.json`, JSON.stringify(chatRecords), (err) => {
      if (err) console.error(err);
    });
  });
}


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
  if(`${req.body.user_name}` == "" || `${req.body.user_mail}` == "" || `${req.body.user_phone}` == "" || 
     `${req.body.user_password1}` == "" || `${req.body.user_password2}` == ""){
    res.send("請輸入基本資料及密碼。")
    return 0
  }
  if(`${req.body.user_password1}` != `${req.body.user_password2}`){
    res.send("重複密碼錯誤，請重新輸入。")
    return 0
  }
  if(`${req.body.user_password1}`.toUpperCase() == `${req.body.user_password1}` ||
     `${req.body.user_password1}`.toLowerCase() == `${req.body.user_password1}` ||
     `${req.body.user_password1}`.length < 6 || `${req.body.user_password1}`.length > 18){
    res.send("密碼輸入有誤，請確認格式是否正確。")
    return 0
  }
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    for(var key in data){
      if(key == `${req.body.user_name}`){
        res.send("帳號名稱已經存在，請重新命名。")
        return 0
      }  
    }
    
    data[`${req.body.user_name}`] = {}
    data[`${req.body.user_name}`]["phone"] = `${req.body.user_phone}`
    data[`${req.body.user_name}`]["mail"] = `${req.body.user_mail}`
    data[`${req.body.user_name}`]["password"] = `${req.body.user_password1}`
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

// main //select bar
app.post('/list',(req,res)=>{
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.send(data);
})

