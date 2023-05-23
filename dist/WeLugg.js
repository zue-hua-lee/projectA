var user_name = ""
var state1 = "homepage"
var state2 = "homepage"

// chat_box
//用ajax的方法把聊天紀錄補出來
//loadChatHistory();
const loadChatHistory = () => {
  $.get('/chat_history', (data) => {
    console.log(data)
    const messages = data.trim().split('\n');
    messages.forEach((message) => {
      appendMessage(message);
    });
  });
};
loadChatHistory();
//function appendMessage
//把message加到畫面上
const appendMessage = (message, isSelf) => {
  const div = document.createElement('div');
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  if (isSelf) {
    messageDiv.classList.add('self-message');
  } else {
    messageDiv.classList.add('other-message');
  }
  messageDiv.style.display = 'inline-block';
  div.appendChild(messageDiv);
  $('#chat_content').append(div);
}

function all_display_none() {
  $('#homepage').css({'display':'none'})
  $('#homepage_box1').css({'display':'none'})
  $('#homepage_box2').css({'display':'none'})

  $('#user_menu').css({'display':'none'})
  $('#menu_bar').css({'display':'none'})
  $('#selbar').css({'display':'none'})
  $('#subpage_title').css({'display':'none'})

  $('#mainpage').css({'display':'none'})
  $('#show_schedule').css({'display':'none'})
  $('#show_need').css({'display':'none'})

  $('#add_new_journey').css({'display':'none'})
  $('#add_new_request').css({'display':'none'})
  $('#chat_main').css({'display':'none'})
  $('#accept_case_list').css({'display':'none'})
  $('#accept_case_list #no_customer').css({'display':'none'})
  $('#accept_case_list #has_customer').css({'display':'none'})

  $('#deal_agree').css({'display':'none'})
  $('#deal_success').css({'display':'none'})
  $('#chat_box').css({'display':'none'})
}
function to_mainpage_need() {
  $('#user_menu .mid_luggage').css({'opacity':'0.5'});
  $('#user_menu .shopping_bag').css({'opacity':'1'});
  $('#show_schedule').css({'display':'block'});
  $('#show_need').css({'display':'none'});
  $('#recommend_w').html('推薦代購者');
  $('#bm_add_schedule').html('填寫行程');
  $('#bm_add_schedule').css({'background-color':'#7FD6D0'});
  $('#show_schedule').html('');
  $.ajax({
    type: 'POST',
    url: './list',
    success: (data) => {
      for (const name in data) {
        let namelist = '';
        for(const id in data[name]){
          if(id=="departure_country"){
              namelist += `居住地: ${data[name][id]},`;
          }
          if(id=="departure_city"){
            namelist += `${data[name][id]} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;`;
          }
          if(id=="entry_country"){
          namelist += `抵達地: ${data[name][id]},`;
          }
          if(id=="entry_city"){
          namelist += `${data[name][id]}<br>`;
          }
          if(id=="departure_year"){
            namelist += `旅行日期: ${data[name][id]} / `;
          }
          if(id=="departure_month"){
          namelist += `${data[name][id]} / `;
          }
          if(id=="departure_date"){
          namelist += `${data[name][id]} - `;
          }
          if(id=="entry_year"){
          namelist += `${data[name][id]} / `;
          }
          if(id=="entry_month"){
          namelist += `${data[name][id]} / `;
          }
          if(id=="entry_date"){
          namelist += `${data[name][id]}<br>`;
          }
          if(id=="luggage_size_list"){
          namelist += `行李箱: ${data[name][id]}吋/inch &nbsp; &nbsp; &nbsp;`;
          }
          if(id=="luggage_space_list"){
          namelist += `代購容量: ${data[name][id]}%`;
          }
        }
        if(namelist != ''){
          var contener = document.getElementById("show_schedule")
          $('#show_schedule').append('<div class="'+name+'"><div class="w">'
          +'<div class="n">'+name+'</div>'+namelist+'</div><div class="gray"><div class="chat_button">'+
          '<p class="chat_no">查看詳情</p><p class="chat_yes">進行聊天</p></div></div></div>');
        }
      }
    },
  })
}
function to_mainpage_schedule() {
  $('#user_menu .mid_luggage').css({'opacity':'1'});
  $('#user_menu .shopping_bag').css({'opacity':'0.5'});
  $('#show_schedule').css({'display':'none'});
  $('#show_need').css({'display':'block'});
  $('#recommend_w').html('推薦購買者');
  $('#bm_add_schedule').html('填寫商品');
  $('#bm_add_schedule').css({'background-color':'#556B94'});
  $('#show_need').html('');
  $.ajax({
    type: 'POST',
    url: './list',
    success: (data) => {
      for (const name in data) {
        let namelist = '';
        for(const id in data[name]){
          if(id=="live_country"){
             namelist += `居住地: ${data[name][id]},`;
          }
          if(id=="live_city"){
            namelist += `${data[name][id]} &nbsp;`;
          }
          if(id=="good_country"){
            namelist += `商品地: ${data[name][id]},`;
          }
          if(id=="good_city"){
            namelist += `${data[name][id]} &nbsp;`;
          }
          if(id=="arrive_year"){
            namelist += `${data[name][id]}/`;
          }
          if(id=="arrive_month"){
            namelist += `${data[name][id]}/`;
          }
          if(id=="arrive_date"){
            namelist += `${data[name][id]}<br>`;
          }
          if(id=="good_name"){
            namelist += `需求商品: ${data[name][id]}<br>`;
          }
          if(id=="amount"){
            namelist += `數量: ${data[name][id]} 件<br>`;
          }
        }
        if(namelist!=''){
          var contener = document.getElementById("show_need")
          $('#show_need').append('<div class="'+name+'"><div class="w">'
          +'<div class="n">'+name+'</div>'+namelist+'</div><div class="gray"><div class="chat_button">'+
          '<p class="chat_no">個人資料</p><p class="chat_yes">進行聊天</p></div></div></div>');
        }
      }
    },
  })
}
function show(string){
  if(string == "mainpage_schedule"){
    all_display_none()
    $('#mainpage').css({'display':'block'})
    $('#user_menu').css({'display':'block'})
    $('#user_menu .user_id').html("username:"+user_name)
    $('#menu_bar').css({'display':'flex'})
    $('#selbar').css({'display':'flex'})
    state1 = state2
    state2 = "mainpage_schedule"
    to_mainpage_schedule()
  }
  else if(string == "mainpage_need"){
    all_display_none()
    $('#mainpage').css({'display':'block'})
    $('#user_menu').css({'display':'block'})
    $('#menu_bar').css({'display':'flex'})
    $('#selbar').css({'display':'flex'})
    state1 = state2
    state2 = "mainpage_need"
    to_mainpage_need()
  }
  else if(string == "accept_case_list"){
    all_display_none()
    state1 = state2
    state2 = "accept_case_list"
    $('#accept_case_list').css({'display':'block'})
    $('#subpage_title').css({'display':'block'})
    $('#subpage_title .subpage_word').html("代購清單")
    $('#menu_bar').css({'display':'flex'})
    $('#has_customer').css({'display':'block'})
  }
  else if(string == "chat_main"){
    all_display_none()
    state1 = state2
    state2 = "chat_main"
    $('#chat_main').css({'display':'block'})
    $('#subpage_title').css({'display':'block'})
    $('#subpage_title .subpage_word').html("聊天紀錄")
    $('#menu_bar').css({'display':'flex'})
  }
  else if(string == "chat_box"){
    all_display_none()
    state1 = state2
    state2 = "chat_box"
    $('#chat_box').css({'display':'block'})
  }
  else{
    console.log("changing error.")
  }
}

// // jump_state
// $(document).ready(function() {
//   $.get('./start', (data) => {
//     if(data == "to_chatlist"){
//       $('#chat_main').css({'display':'block'})
//     }
//     else if(data == "to_deal"){
//       $('#deal_agree').css({'display':'block'})
//     }
//     else{
//       $('#homepage').css({'display':'block'})
//     }
//   })
// })

// homepage
$(document).ready(function() {
  $('#homepage button[name="login"]').click((event) => {
    event.preventDefault()
    $.post('./login', {
      account: $('#homepage input[name="account"]').val(),
      password: $('#homepage input[name="password"]').val(),
    }, (res) => {
      $('#homepage_output').html(res)
      if(res=="帳號密碼正確"){
        user_name = $('#homepage input[name="account"]').val()
        show("mainpage_schedule")
      }
    })
  })

  $('#homepage button[name="register"]').click((event) => {
    $('#homepage_box1').css({'display':'none'})
    $('#homepage_box2').css({'display':'block'})
    $('#homepage_output').html("<br>")
  })

  $('#homepage button[name="register_submit"]').click((event) => {
    event.preventDefault()
    $.post('./register', {
      account: $('#homepage input[name="account"]').val(),
      password: $('#homepage input[name="password"]').val(),
    }, (res) => {
      $('#homepage_output').html(res)
    })
  })

  $('#homepage button[name="backto_homepage"]').click((event) => {
    $('#homepage_box1').css({'display':'block'})
    $('#homepage_box2').css({'display':'none'})
    $('#homepage_output').html("<br>")
  })

  // mainpage-我是代購者
  var prenum = 0;
  $('#mainpage').on('click', '#show_schedule :nth-child(n) .w', function(){
    var num = $(this).parent().index()+1;
    if(num != prenum){
      $('#show_schedule :nth-child(n) .gray').css({'display':'none'});
      $('#show_schedule :nth-child('+num+') .gray').css({'display':'block'});
      prenum = num;
    }
    else{
      $('#show_schedule :nth-child('+num+') .gray').css({'display':'none'});
      prenum = 0;
    }
  });
  $('#mainpage').on('click', '#show_schedule :nth-child(n) .chat_yes', function(){
    var nn = $(this).parent().parent().parent().attr('class')
    // var num=$(this).parent().parent().parent().index()+1;
    // $('#show_chatmain :nth-child('+num+') .gray .chat_button .chat_yes').css({'display':'block'});
    // $(location).attr('href','http://luffy.ee.ncku.edu.tw:9867/')
    show("chat_box")
    console.log(nn)
  });

  // mainpage-我是購買者
  var prenum1 = 0;
  $('#mainpage').on('click', '#show_need :nth-child(n) .w', function(){
    var num1 = $(this).parent().index()+1;
    if(num1 != prenum1){
      $('#show_need :nth-child(n) .gray').css({'display':'none'});
      $('#show_need :nth-child('+num1+') .gray').css({'display':'block'});
      prenum1 = num1;
    }
    else{
      $('#show_need :nth-child('+num1+') .gray').css({'display':'none'});
      prenum1 = 0;
    }
  });
  $('#mainpage').on('click', '#show_need :nth-child(n) .chat_yes', function(){
    var nn = $(this).parent().parent().parent().attr('class')
    // var num=$(this).parent().parent().parent().index()+1;
    // $('#show_chatmain :nth-child('+num+') .gray .chat_button .chat_yes').css({'display':'block'});
    // $(location).attr('href','http://luffy.ee.ncku.edu.tw:9867/')
    show("chat_box")
    console.log(nn)
  });

  // schedule 代購者頁面
  $('#user_menu .shopping_bag').click((event) => {
    if(state2 == "mainpage_schedule")
      show("mainpage_need")
  })
  $('#bm_add_schedule').click((event) => {
    if(state2 == "mainpage_schedule"){
      state1 = state2
      state2 = "add_new_journey"
      $('#add_new_journey').css({'display':'block'})
      $('#mainpage').css({'display':'none'})
      $('#selbar').css({'display':'none'})
    }
  })
  // need 購買者頁面
  $('#user_menu .mid_luggage').click((event) => {
    if(state2 == "mainpage_need")
      show("mainpage_schedule")
  })
  $('#bm_add_schedule').click((event) => {
    if(state2 == "mainpage_need"){
      state1 = state2
      state2 = "add_new_request"
      $('#add_new_request').css({'display':'block'})
      $('#mainpage').css({'display':'none'})
      $('#selbar').css({'display':'none'})
    }
  })

  // menu_bar
  $('#menu_bar .home').click((event) => {
    show("mainpage_schedule")
  })
  $('#menu_bar .user_profile').click((event) => {
  })
  $('#menu_bar .case_list').click((event) => {
    show("accept_case_list")
  })
  $('#menu_bar .chat_list').click((event) => {
    show("chat_main")
  })
  // subpage
  $('#subpage_title .case_back_button').click((event) => {
    show("mainpage_schedule")
  })
  // accept_case_list
  var check_state1 = 0;
  $(".cus_list_check1").click(function() {
    if(check_state1 == 0)
    {
      $('.cus_list_check1').css({'opacity':'1'});
      check_state1 = 1;
    }
    else if(check_state1 == 1)
    {
      $('.cus_list_check1').css({'opacity':'0'});
      check_state1 = 0;
    }
  });
  var check_state2 = 0;
  $(".cus_list_check2").click(function() {
    if(check_state2 == 0)
    {
      $('.cus_list_check2').css({'opacity':'1'});
      check_state2 = 1;
    }
    else if(check_state2 == 1)
    {
      $('.cus_list_check2').css({'opacity':'0'});
      check_state2 = 0;
    }
  });
  // chatmain
  var prenum2 = 0;
  $('#chat_main').on('click', '#show_chatmain :nth-child(n) .w', function(){
    var num = $(this).parent().index()+1;
    if(num != prenum2){
      $('#show_chatmain :nth-child(n) .gray').css({'display':'none'});
      $('#show_chatmain :nth-child('+num+') .gray').css({'display':'block'});
      prenum2 = num;
    }
    else{
      $('#show_chatmain :nth-child('+num+') .gray').css({'display':'none'});
      prenum2 = 0;
    }
  });
  $('#chat_main .chat_yes').click(function(){
    // $(location).attr('href','http://luffy.ee.ncku.edu.tw:9867/')
    show("chat_box")
  });


  // add_new_journey
  var city = new Array();
  city[1] = ['台北','台中','台南','高雄']; //台灣
  city[2] = ['東京','大阪','京都','北海道']; //日本
  city[3] = ['首爾','釜山']; //韓國
  city[4] = ['北京','上海','香港']; //中國
  city[5] = ['紐約','洛杉磯','舊金山']; //美國
  city[6] = ['巴黎','馬賽','里昂']; //法國
  city[7] = ['慕尼黑','法蘭克福','柏林']; //德國

  $('#departure_country').change(function(){
      index=this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      for(var i=0;i<city[index].length;i++){
          Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
      }
      $('#departure_city').html(Sinner);
      $('#departure_city').attr("disabled",false);
  });

  $('#entry_country').change(function(){
      index=this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      for(var i=0;i<city[index].length;i++){
          Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
      }
      $('#entry_city').html(Sinner);
      $('#entry_city').attr("disabled",false);
  });

  $('#departure_month').change(function(){
      index = this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      if(index==1 || index==3 || index==5 || index==7 || index==8 || index==10 || index==12){
          for(var i=1;i<=31;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }
      else if(index==4 || index==6 || index==9 || index==11){
          for(var i=1;i<=30;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }
      else if(index==2){
          for(var i=1;i<=28;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }

      $('#departure_date').html(Sinner);
      $('#departure_date').attr("disabled",false);
  });

  $('#entry_month').change(function(){
      index = this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      if(index==1 || index==3 || index==5 || index==7 || index==8 || index==10 || index==12){
          for(var i=1;i<=31;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }
      else if(index==4 || index==6 || index==9 || index==11){
          for(var i=1;i<=30;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }
      else if(index==2){
          for(var i=1;i<=28;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }

      $('#entry_date').html(Sinner);
      $('#entry_date').attr("disabled",false);
      //alert(index);
  });

  $('#luggage_space_list').change(function(){
      index = this.selectedIndex; //從1開始 第幾個選項(數字)
      if(index==1){
          $("#big_luggage").attr("src","https://ppt.cc/flWv0x@.png");
      }
      else if(index==2){
          $("#big_luggage").attr("src","https://ppt.cc/fyz1fx@.png");
      }
      else if(index==3){
          $("#big_luggage").attr("src","https://ppt.cc/faeuHx@.png");
      }
      else if(index==4){
          $("#big_luggage").attr("src","https://ppt.cc/fOwTNx@.png");
      }
      else if(index==5){
          $("#big_luggage").attr("src","https://ppt.cc/fbY02x@.png");
      }
  });

  $('#submit_trip').click((event) => {
    event.preventDefault()
    $.get('./journey_data', {
      user_name: user_name,
      departure_country: $('#journey_data select[name=departure_country]').val(),
      departure_city: $('#journey_data select[name=departure_city]').val(),
      entry_country: $('#journey_data select[name=entry_country]').val(),
      entry_city: $('#journey_data select[name=entry_city]').val(),
      departure_year: $('#journey_data select[name=departure_year]').val(),
      departure_month: $('#journey_data select[name=departure_month]').val(),
      departure_date: $('#journey_data select[name=departure_date]').val(),
      entry_year: $('#journey_data select[name=entry_year]').val(),
      entry_month: $('#journey_data select[name=entry_month]').val(),
      entry_date: $('#journey_data select[name=entry_date]').val(),
      product_list: $('#journey_data select[name=product_list]').val(),
      luggage_size_list: $('#journey_data select[name=luggage_size_list]').val(),
      luggage_space_list: $('#journey_data select[name=luggage_space_list]').val(),
      set_tip: $('#journey_data input[name=set_tip]').val(),

      //ID: $('#add input[name=ID]').val(), //前面的fname和ser.js的req.query.fname為同者 後面的fname和exercise.html的name=fname為同者
      //name: $('#add input[name=name]').val(),
    }, (data) => {
      show("mainpage_schedule")
      //$('#add-output').html(data) //讓html中#ajax-output那段的內容變更為data的內容
    })
  })


  // add_new_request
  var city = new Array();
  city[1] = ['台北','台中','台南','高雄']; //台灣
  city[2] = ['東京','大阪','京都','北海道']; //日本
  city[3] = ['首爾','釜山']; //韓國
  city[4] = ['北京','上海','香港']; //中國
  city[5] = ['紐約','洛杉磯','舊金山']; //美國
  city[6] = ['巴黎','馬賽','里昂']; //法國
  city[7] = ['慕尼黑','法蘭克福','柏林']; //德國

  $('#product_place_country_country').change(function(){
      index=this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      for(var i=0;i<city[index].length;i++){
          Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
      }
      $('#product_place_city').html(Sinner);
      $('#product_place_city').attr("disabled",false);
  });

  $('#shipping_address_country').change(function(){
      index=this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      for(var i=0;i<city[index].length;i++){
          Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
      }
      $('#shipping_address_city').html(Sinner);
      $('#shipping_address_city').attr("disabled",false);
  });

  $('#product_arrive_month').change(function(){
      index = this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      if(index==1 || index==3 || index==5 || index==7 || index==8 || index==10 || index==12){
          for(var i=1;i<=31;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }
      else if(index==4 || index==6 || index==9 || index==11){
          for(var i=1;i<=30;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }
      else if(index==2){
          for(var i=1;i<=28;i++){
              Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
          }
      }

      $('#product_arrive_date').html(Sinner);
      $('#product_arrive_date').attr("disabled",false);
  });

  $('#submit_request').click((event) => {
    event.preventDefault()
    $.get('./request_data', {
      user_name: user_name,
      set_product_name: $('#request_data input[name=set_product_name]').val(),
      product_place_country: $('#request_data select[name=product_place_country]').val(),
      product_place_city: $('#request_data select[name=product_place_city]').val(),
      set_shop_name: $('#request_data input[name=set_shop_name]').val(),
      set_shop_address: $('#request_data input[name=set_shop_address]').val(),
      request_product_list: $('#request_data select[name=request_product_list]').val(),
      set_product_quantity: $('#request_data input[name=set_product_quantity]').val(),
      shipping_address_country: $('#request_data select[name=shipping_address_country]').val(),
      shipping_address_city: $('#request_data select[name=shipping_address_city]').val(),
      product_arrive_year: $('#request_data select[name=product_arrivee_year]').val(),
      product_arrive_month: $('#request_data select[name=product_arrive_month]').val(),
      product_arrive_date: $('#request_data select[name=product_arrive_date]').val(),
      request_remark: $('#request_data input[name=request_remark]').val(),

      //ID: $('#add input[name=ID]').val(), //前面的fname和ser.js的req.query.fname為同者 後面的fname和exercise.html的name=fname為同者
      //name: $('#add input[name=name]').val(),
    }, (data) => {
      show("mainpage_need")
      //$('#add-output').html(data) //讓html中#ajax-output那段的內容變更為data的內容
    })
  })



  const socket = io();
  //一個傳送訊息的函数
  const sendMessage = () => {
    const message = $('#chat_box input[name="msg-input"]').val();
    if (message.trim() !== '') {
      socket.emit('chat message', message);
      $('#chat_box input[name="msg-input"]').val('');
    }
  }
  
  //按下傳送後傳送訊息
  $('#chat_box button[name="chat_submit"]').click((event) => {
    event.preventDefault();
    sendMessage();
  });
  socket.on('chat message', (msg) => {
    appendMessage(msg);
  });

  //按下傳送訊息後，聊天紀錄會自動跑到最下面
  const content = document.querySelector('#chat_content');

  function scrollToBottom() {
    content.scrollTop = content.scrollHeight;
  }

  const form = document.querySelector('#chat_bottom');
  if (form) {
    form.addEventListener('submit', scrollToBottom);
  } else {
    console.error('Could not find #chat_bottom element');
  }
  
  if (content) {
    content.addEventListener('DOMNodeInserted', scrollToBottom);
  } else {
    console.error('Could not find #content element');
  }
  // chat_box: back
  $('#chat_box .back').click(function(){
    show("mainpage_schedule")
  })
  // chat_box: chat_deal
  $('#chat_deal').click(function(){
    $("#deal_agree").css({'display':'flex'});
  })

  //選取消交易
  $("#deal_box .deal_no").click(function() {
    $("#deal_agree").css({'display':'none'});
  });
  
  //選同意交易
  $("#deal_box .deal_yes").click(function() {
      all_display_none()
      $("#deal_success").css({'display':'block'});
    });
  
  //deal_success
  $('#deal_success button[name="to_list"]').click(function() {
    $("#deal_success").css({'display':'none'});
    show("accept_case_list")
  });
  $('#deal_success button[name="to_mainpage"]').click(function() {
    $("#deal_success").css({'display':'none'});
    show("mainpage_schedule")
  });
})


//select bar in mainpage
$('#selbar').click(function() {
    $("#choose").css({'display':'block'});
});
$(document).click(function (event) {
  //目標--點這些東西之外就會不見
  let testInput1 = $('#selbar');
  let testInput2 = $('#choose');
  let testInput4 = $('.choose_pic');
  let testInput3 = $('#select_country');
  if (!testInput1.is(event.target) && !testInput2.is(event.target) && !testInput3.is(event.target))
    $("#choose").slideUp(4);
});