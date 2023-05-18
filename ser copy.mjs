#!/usr/bin/env node

import fs from 'fs'
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const port = 9444

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
app.use(express.static(`${__dirname}/dist`))

import bodyParser from 'body-parser'
import { Console } from 'console'
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

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

// main
app.post('/list',(req,res)=>{
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.send(data);
})

// jump_state
app.get('/start', (req,res) => {
  const data = JSON.parse(fs.readFileSync('jump_state.json'));
  const state = data['state']
  data['state'] = 'to_main'
  var str = JSON.stringify(data);
  fs.writeFile('jump_state.json', str, function (err) {
      if (err) {console.error(err);}
  })
  res.send(state)
})