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
const port = 9484// change the port number9444

app.use(express.static(`${__dirname}/dist`))
app.use(bodyParser.urlencoded({ extended: true}))

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
  if(`${req.body.name}` == "user"){
    res.send("帳號名稱已經存在，請重新命名。")
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
    data[`${req.body.name}`]["url"] = "/src/user"
    data[`${req.body.name}`]["gender"] = "尚未填寫"
    data[`${req.body.name}`]["born"] = "尚未填寫"
    data[`${req.body.name}`]["birth"] = "尚未填寫"
    data[`${req.body.name}`]["mail"] = `${req.body.mail}`
    data[`${req.body.name}`]["phone"] = `${req.body.phone}`
    data[`${req.body.name}`]["password"] = `${req.body.password1}`
    data[`${req.body.name}`]["trip_num"] = 0
    data[`${req.body.name}`]["product_num"] = 0
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
      data[req.query.user_name]['trip'+n]['accept'] = 0 //接受交易
      data[req.query.user_name]['trip'+n]['accepter'] = "" //接受交易
      data[req.query.user_name]['trip_num'] = parseInt(n,10)+1 //總行程數+1
      var str = JSON.stringify(data);
      fs.writeFile('data.json', str, function (err) {
          if (err) {console.error(err);}
          console.log('Add new trip...')
      })
  })
  res.send("aaa")
})

//trip_contant
app.post('/trip_contant', (req, res) => { //用get傳
  fs.readFile('./data.json', function (err, data) {
      if (err) throw err;
      //將二進制數據轉換為字串符
      //var stu_list = data.toString();
      //將字符串轉換為 JSON 對象
      data = JSON.parse(data);
      //將傳來的資訊推送到數組對象中
      let str = []
      str[0] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_country"]
      str[1] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_city"]
      str[2] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_country"]
      str[3] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_city"]
      str[4] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_year"]
      str[5] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_month"]
      str[6] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_date"]
      str[7] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_year"]
      str[8] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_month"]
      str[9] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_date"]
      str[10] = data[`${req.body.user_name}`][`${req.body.trip}`]["product_list"]
      str[11] = data[`${req.body.user_name}`][`${req.body.trip}`]["luggage_size_list"]
      str[12] = data[`${req.body.user_name}`][`${req.body.trip}`]["luggage_space_list"]
      str[13] = data[`${req.body.user_name}`][`${req.body.trip}`]["set_tip"]
      str[14] = data[`${req.body.user_name}`]["url"]

      res.send(str)
  })
})


// add_new_request
app.get('/request_data', (req, res) => { //用get傳
    console.log(req.query.product_img)
    fs.readFile('./data.json', function (err, data) {
      if (err) throw err;
      //將二進制數據轉換為字串符
      //var stu_list = data.toString();
      //將字符串轉換為 JSON 對象
      data = JSON.parse(data);
      //將傳來的資訊推送到數組對象中
      var n = data[req.query.user_name]['product_num']
      data[req.query.user_name]['product'+n] = {}
      data[req.query.user_name]['product'+n]['shipping_address_country'] = req.query.shipping_address_country
      data[req.query.user_name]['product'+n]['shipping_address_city'] = req.query.shipping_address_city
      data[req.query.user_name]['product'+n]['product_place_country'] = req.query.product_place_country
      data[req.query.user_name]['product'+n]['product_place_city'] = req.query.product_place_city
      data[req.query.user_name]['product'+n]['set_product_name'] = req.query.set_product_name
      data[req.query.user_name]['product'+n]['set_shop_name'] = req.query.set_shop_name
      data[req.query.user_name]['product'+n]['set_shop_address'] = req.query.set_shop_address
      data[req.query.user_name]['product'+n]['request_product_list'] = req.query.request_product_list
      data[req.query.user_name]['product'+n]['set_product_quantity'] = req.query.set_product_quantity
      data[req.query.user_name]['product'+n]['product_arrive_year'] = req.query.product_arrive_year
      data[req.query.user_name]['product'+n]['product_arrive_month'] = req.query.product_arrive_month
      data[req.query.user_name]['product'+n]['product_arrive_date'] = req.query.product_arrive_date
      data[req.query.user_name]['product'+n]['request_remark'] = req.query.request_remark
      data[req.query.user_name]['product'+n]['accept'] = 0 //接受交易
      data[req.query.user_name]['product'+n]['accepter'] = "" //接受交易者
      data[req.query.user_name]['product_num'] = parseInt(n,10)+1 //總商品數+1
      if(req.query.product_img != null){
        for(var i = 0; i < req.query.product_img.length; i++){
          data[req.query.user_name]['product'+n]['url'+i] = req.query.product_img[i]
        }
      }
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
      str[0] = data[`${req.body.user_name}`][`${req.body.product}`]["set_product_name"]
      str[1] = data[`${req.body.user_name}`][`${req.body.product}`]["product_place_country"]
      str[2] = data[`${req.body.user_name}`][`${req.body.product}`]["product_place_city"]
      str[3] = data[`${req.body.user_name}`][`${req.body.product}`]["set_shop_name"]
      str[4] = data[`${req.body.user_name}`][`${req.body.product}`]["set_shop_address"]
      str[5] = data[`${req.body.user_name}`][`${req.body.product}`]["request_product_list"]
      str[6] = data[`${req.body.user_name}`][`${req.body.product}`]["set_product_quantity"]
      str[7] = data[`${req.body.user_name}`][`${req.body.product}`]["shipping_address_country"]
      str[8] = data[`${req.body.user_name}`][`${req.body.product}`]["shipping_address_city"]
      str[9] = data[`${req.body.user_name}`][`${req.body.product}`]["product_arrive_year"]
      str[10] = data[`${req.body.user_name}`][`${req.body.product}`]["product_arrive_month"]
      str[11] = data[`${req.body.user_name}`][`${req.body.product}`]["product_arrive_date"]
      str[12] = data[`${req.body.user_name}`][`${req.body.product}`]["request_remark"]
      str[13] = data[`${req.body.user_name}`]["url"]
      
      var url_place = 14

      for(const id in data[`${req.body.user_name}`][`${req.body.product}`]){
        if(id.substring(0, 3) == "url"){
          str[url_place] = data[`${req.body.user_name}`][`${req.body.product}`][id];
          url_place++;
        }
      }
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
    var array = ["","","","","",""]
    data = JSON.parse(data)
    array[0] = data[`${req.body.name}`]["gender"]
    array[1] = data[`${req.body.name}`]["born"]
    array[2] = data[`${req.body.name}`]["birth"]
    array[3] = data[`${req.body.name}`]["mail"]
    array[4] = data[`${req.body.name}`]["phone"]
    array[5] = data[`${req.body.name}`]["url"]
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
      res.send("save personal success.")
    })
  })
})

// self_product_page
app.post('/read_self_product', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    let str = []
    str[0] = data[`${req.body.user_name}`][`${req.body.product}`]["set_product_name"]
    str[1] = data[`${req.body.user_name}`][`${req.body.product}`]["product_place_country"]
    str[2] = data[`${req.body.user_name}`][`${req.body.product}`]["product_place_city"]
    str[3] = data[`${req.body.user_name}`][`${req.body.product}`]["set_shop_name"]
    str[4] = data[`${req.body.user_name}`][`${req.body.product}`]["set_shop_address"]
    str[5] = data[`${req.body.user_name}`][`${req.body.product}`]["request_product_list"]
    str[6] = data[`${req.body.user_name}`][`${req.body.product}`]["set_product_quantity"]
    str[7] = data[`${req.body.user_name}`][`${req.body.product}`]["shipping_address_country"]
    str[8] = data[`${req.body.user_name}`][`${req.body.product}`]["shipping_address_city"]
    str[9] = data[`${req.body.user_name}`][`${req.body.product}`]["product_arrive_year"]
    str[10] = data[`${req.body.user_name}`][`${req.body.product}`]["product_arrive_month"]
    str[11] = data[`${req.body.user_name}`][`${req.body.product}`]["product_arrive_date"]
    str[12] = data[`${req.body.user_name}`][`${req.body.product}`]["request_remark"]

    var url_place = 13

    for(const id in data[`${req.body.user_name}`][`${req.body.product}`]){
      if(id.substring(0, 3) == "url"){
        str[url_place] = data[`${req.body.user_name}`][`${req.body.product}`][id];
        url_place++;
      }
    }

    res.send(str)
  })
})
app.post('/save_self_product', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)

    data[req.body.user_name][req.body.product]['shipping_address_country'] = req.body.self_shipping_address_country
    data[req.body.user_name][req.body.product]['shipping_address_city'] = req.body.self_shipping_address_city
    data[req.body.user_name][req.body.product]['product_place_country'] = req.body.self_product_place_country
    data[req.body.user_name][req.body.product]['product_place_city'] = req.body.self_product_place_city
    data[req.body.user_name][req.body.product]['set_product_name'] = req.body.self_set_product_name
    data[req.body.user_name][req.body.product]['set_shop_name'] = req.body.self_set_shop_name
    data[req.body.user_name][req.body.product]['set_shop_address'] = req.body.self_set_shop_address
    data[req.body.user_name][req.body.product]['request_product_list'] = req.body.self_product_list
    data[req.body.user_name][req.body.product]['set_product_quantity'] = req.body.self_set_product_quantity
    data[req.body.user_name][req.body.product]['product_arrive_year'] = req.body.self_product_arrive_year
    data[req.body.user_name][req.body.product]['product_arrive_month'] = req.body.self_product_arrive_month
    data[req.body.user_name][req.body.product]['product_arrive_date'] = req.body.self_product_arrive_date
    data[req.body.user_name][req.body.product]['request_remark'] = req.body.self_request_remark

    for(var i = 13; i < data[req.body.user_name][req.body.product].length; i++){
      delete data[req.body.user_name][req.body.product][i]
    }
    if(req.body.self_product_img != null){
      for(var i = 0; i < req.body.self_product_img.length; i++){
        data[req.body.user_name][req.body.product]['url'+i] = req.body.self_product_img[i]
      }
    }
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
      res.send("save self product success.")
    })
  })
})

// self_trip_page
app.post('/read_self_trip', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    let str = []
    str[0] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_country"]
    str[1] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_city"]
    str[2] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_country"]
    str[3] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_city"]
    str[4] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_year"]
    str[5] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_month"]
    str[6] = data[`${req.body.user_name}`][`${req.body.trip}`]["departure_date"]
    str[7] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_year"]
    str[8] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_month"]
    str[9] = data[`${req.body.user_name}`][`${req.body.trip}`]["entry_date"]
    str[10] = data[`${req.body.user_name}`][`${req.body.trip}`]["product_list"]
    str[11] = data[`${req.body.user_name}`][`${req.body.trip}`]["luggage_size_list"]
    str[12] = data[`${req.body.user_name}`][`${req.body.trip}`]["luggage_space_list"]
    str[13] = data[`${req.body.user_name}`][`${req.body.trip}`]["set_tip"]

    res.send(str)
  })
})
app.post('/save_self_trip', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)

    data[req.body.user_name][req.body.trip]['departure_country'] = req.body.self_departure_country
    data[req.body.user_name][req.body.trip]['departure_city'] = req.body.self_departure_city
    data[req.body.user_name][req.body.trip]['entry_country'] = req.body.self_entry_country
    data[req.body.user_name][req.body.trip]['entry_city'] = req.body.self_entry_city
    data[req.body.user_name][req.body.trip]['departure_year'] = req.body.self_departure_year
    data[req.body.user_name][req.body.trip]['departure_month'] = req.body.self_departure_month
    data[req.body.user_name][req.body.trip]['departure_date'] = req.body.self_departure_date
    data[req.body.user_name][req.body.trip]['entry_year'] = req.body.self_entry_year
    data[req.body.user_name][req.body.trip]['entry_month'] = req.body.self_entry_month
    data[req.body.user_name][req.body.trip]['entry_date'] = req.body.self_entry_date
    data[req.body.user_name][req.body.trip]['product_list'] = req.body.self_trip_product_list
    data[req.body.user_name][req.body.trip]['luggage_size_list'] = req.body.self_luggage_size_list
    data[req.body.user_name][req.body.trip]['luggage_space_list'] = req.body.self_luggage_space_list
    data[req.body.user_name][req.body.trip]['set_tip'] = req.body.self_set_tip

    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
      res.send("save self trip success.")
    })
  })
})

// upload personal img
import multer from 'multer'
const upload = multer({ dest: "src/" });
app.use("/src", express.static("src"));

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("沒有選擇圖片");
  }
  const imageUrl = "/src/" + req.file.filename;
  res.json({ url: imageUrl });
});
app.post('/store_personal_img', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    data[`${req.body.name}`]["url"] = `${req.body.url}`
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
    })
  })
})
app.post('/submit_score_green', (req, res) => {
  var max_num = 0;
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    for(var id in data[`${req.body.user_name}`]){
      if (id.substring(0, 8) == "commentA" && id[8] > max_num){
        max_num = id;
      }
    }
    data[`${req.body.user_name}`]["commentA"+(max_num+1)] = {}
    data[`${req.body.user_name}`]["commentA"+(max_num+1)]["writer_name"] = `${req.body.writer_name}`
    data[`${req.body.user_name}`]["commentA"+(max_num+1)]["star"] = `${req.body.score}`
    data[`${req.body.user_name}`]["commentA"+(max_num+1)]["word"] = (`${req.body.comment_input}` != "")? `${req.body.comment_input}`:`${req.body.comment_state}`;
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
    })
    res.send("submit score_green seccuss.")
  })
})

// 
app.post('/buydone', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    data[req.body.user][req.body.product]['accept'] = 2
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
      res.send("save self product success.")
    })
  })
})

app.post('/scheduledone', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    data[req.body.user][req.body.product]['accept'] = 2
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
      res.send("save self product success.")
    })
  })
})

app.post('/scheduledel', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    data[req.body.user][req.body.product]['accept'] = 2
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
      res.send("save self product success.")
    })
  })
})

app.post('/buydel', (req, res) => {
  fs.readFile('./data.json', function (err, data) {
    if(err){return console.error(err)}
    data = JSON.parse(data)
    data[req.body.user][req.body.product]['accept'] = 2
    fs.writeFile('./data.json', JSON.stringify(data), function (err) {
      if(err){return console.error(err)}
      res.send("save self product success.")
    })
  })
})