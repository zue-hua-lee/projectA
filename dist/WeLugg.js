var user_name = ""
let state = [""]
<<<<<<< HEAD
var choose_box1=0;
var choose_box2=0;
var choose_box3=0;
var choose_box4=0;
var cho_submit=0;
var product_img_state;
let product_img = [];
=======
var choose_box1 = 0;
var choose_box2 = 0;
var choose_box3 = 0;
var choose_box4 = 0;
var cho_submit = 0;
>>>>>>> 9de2b4b02f0c86049392b90861ca6aa4b4ba7462

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
  $('#homepage1').css({ 'display': 'none' })
  $('#homepage2').css({ 'display': 'none' })
  $('#register_success').css({ 'display': 'none' })
  $('#personal_page').css({ 'display': 'none' })
  $('#bm_credit_card').css({ 'display': 'none' })
  $('#bm_edit_personal').css({ 'display': 'none' })
  $('#bm_personal_togood').css({ 'display': 'none' })
  $('#bm_personal_totrip').css({ 'display': 'none' })
  $('#bm_personal_tochat').css({ 'display': 'none' })

  $('#user_menu').css({ 'display': 'none' })
  $('#menu_bar').css({ 'display': 'none' })
  $('#selbar').css({ 'display': 'none' })
  $('#subpage_title').css({ 'display': 'none', 'background-color': '#7FD6D0' })

  $('#mainpage').css({ 'display': 'none' })
  $('#show_schedule').css({ 'display': 'none' })
  $('#show_need').css({ 'display': 'none' })

  $('#add_new_journey').css({ 'display': 'none' })
  $('#add_new_request').css({ 'display': 'none' })
  $('#chat_main').css({ 'display': 'none' })
  $('#accept_case_list').css({ 'display': 'none' })
  $('#accept_case_list #no_customer').css({ 'display': 'none' })
  $('#accept_case_list #has_customer').css({ 'display': 'none' })

  $('#deal_agree').css({ 'display': 'none' })
  $('#deal_success').css({ 'display': 'none' })
  $('#chat_box').css({ 'display': 'none' })
  $('#product_contant').css({ 'display': 'none' })
}
function user_url(name) {
  return new Promise(function (resolve, reject) {
    event.preventDefault()
    $.post('./read_personal', {
      name: name,
    }, (res) => {
      resolve(res[5])
    })
  })
}
function to_mainpage_need() {
  $('#user_menu .mid_luggage').css({ 'opacity': '0.5' });
  $('#user_menu .shopping_bag').css({ 'opacity': '1' });
  $('#show_schedule').css({ 'display': 'block' });
  $('#show_need').css({ 'display': 'none' });
  $('#recommend_w').html('推薦代購者');
  $('#bm_add_schedule').html('填寫商品');
  $('#bm_add_schedule').css({ 'background-color': '#556B94' });
  $('#show_schedule').html('');
  let sel_country;
  let sel_prod_country;
  let sel_year;
  let sel_month;
  let sel_type;
  if (cho_submit == 1) {
    if (choose_box1 == 1) {
      sel_country = $('#choose_place select[name=select_country]').val()
    }
    if (choose_box2 == 1) {
      sel_prod_country = $('#choose select[name=select_product_country]').val()
    }
    if (choose_box3 == 1) {
      sel_year = $('#choose select[name=select_year]').val()
      sel_month = $('#choose select[name=select_month]').val()
    }
    if (choose_box4 == 1) {
      sel_type = $('#choose select[name=select_type]').val()
    }
  }
  $.ajax({
    type: 'POST',
    url: './list',
    success: async (data) => {
      for (const name in data) {
        for (const id in data[name]) {
          let realshow = [];
          if (id.substring(0, 4) == "trip") {
            var data_imp = 0;
            for (const ids in data[name][id]) {
              if (ids == "departure_country" && data[name][id][ids] == sel_country) {
                data_imp++;
              }
              else if (ids == "departure_country" && sel_country == undefined) {
                data_imp++;
              }
              if (ids == "entry_country" && data[name][id][ids] == sel_prod_country) {
                data_imp++;
              }
              else if (ids == "entry_country" && sel_prod_country == undefined) {
                data_imp++;
              }
              if (ids == "departure_year" && data[name][id][ids] == sel_year) {
                data_imp++;
              }
              else if (ids == "departure_year" && sel_year == undefined) {
                data_imp++;
              }
              if (ids == "departure_month" && data[name][id][ids] == sel_month) {
                data_imp++;
              }
              else if (ids == "departure_month" && sel_month == undefined) {
                data_imp++;
              }
              if (ids == "product_list" && data[name][id][ids] == sel_type) {
                data_imp++;
              }
              else if (ids == "product_list" && sel_type == undefined) {
                data_imp++;
              }
            }
            if (data_imp == 5) {
              //console.log('addadd')
              realshow[realshow.length] = data[name][id];
            }
          }

          for (var ll = 0; ll < realshow.length; ll++) {
            let namelist = '';
            for (const ids in realshow[ll]) {
              if (ids == "departure_country") {
                namelist += `居住地: ${realshow[ll][ids]},`;
              }
              if (ids == "departure_city") {
                namelist += `${realshow[ll][ids]} &nbsp;`;
              }
              if (ids == "entry_country") {
                namelist += `商品地: ${realshow[ll][ids]},`;
              }
              if (ids == "entry_city") {
                namelist += `${realshow[ll][ids]} &nbsp; <br>`;
              }
              if (ids == "departure_month") {
                namelist += `${realshow[ll][ids]} / `;
              }
              if (ids == "departure_date") {
                namelist += `${realshow[ll][ids]} - `;
              }
              if (ids == "entry_year") {
                namelist += `${realshow[ll][ids]} / `;
              }
              if (ids == "entry_month") {
                namelist += `${realshow[ll][ids]} / `;
              }
              if (ids == "entry_date") {
                namelist += `${realshow[ll][ids]}<br>`;
              }
              if (ids == "luggage_size_list") {
                namelist += `行李箱: ${realshow[ll][ids]}吋/inch &nbsp; &nbsp; &nbsp;`;
              }
              if (ids == "luggage_space_list") {
                namelist += `代購容量: ${realshow[ll][ids]}%`;
              }
            }

            if(namelist != ''){
            var contener = document.getElementById("show_schedule")
            $('#show_schedule').append('<div class="'+name+' '+id+'"><div class="w"><img class="user_img" src="'+(await user_url(name))+'"/>'
              +'<div><div class="n">'+name+'</div>'+namelist+'</div></div><div class="gray"><div class="chat_button">'+
              '<p class="chat_no">代購詳情</p><p class="chat_yes">進行聊天</p></div></div></div>');
            }
          }
        }

      }
    },
  })
}
function to_mainpage_schedule() {
  $('#user_menu .mid_luggage').css({ 'opacity': '1' });
  $('#user_menu .shopping_bag').css({ 'opacity': '0.5' });
  $('#show_schedule').css({ 'display': 'none' });
  $('#show_need').css({ 'display': 'block' });
  $('#recommend_w').html('推薦購買者');
  $('#bm_add_schedule').html('填寫行程');
  $('#bm_add_schedule').css({ 'background-color': '#7FD6D0' });
  $('#show_need').html('');
  let sel_country;
  let sel_prod_country;
  let sel_year;
  let sel_month;
  let sel_type;
  if (cho_submit == 1) {
    if (choose_box1 == 1) {
      sel_country = $('#choose_place select[name=select_country]').val()
    }
    if (choose_box2 == 1) {
      sel_prod_country = $('#choose select[name=select_product_country]').val()
    }
    if (choose_box3 == 1) {
      sel_year = $('#choose select[name=select_year]').val()
      sel_month = $('#choose select[name=select_month]').val()
    }
    if (choose_box4 == 1) {
      sel_type = $('#choose select[name=select_type]').val()
    }
  }
  $.ajax({
    type: 'POST',
    url: './list',
    contentType: 'application/json',
    success: async (data) => {
      for (const name in data) {
        for (const id in data[name]) {
          let realshow = [];
          if (id.substring(0, 7) == "product") {
            var data_imp = 0;
            for (const ids in data[name][id]) {
              if (ids == "shipping_address_country" && data[name][id][ids] == sel_country) {
                data_imp++;
              }
              else if (ids == "shipping_address_country" && sel_country == undefined) {
                data_imp++;
              }
              if (ids == "product_place_country" && data[name][id][ids] == sel_prod_country) {
                data_imp++;
              }
              else if (ids == "product_place_country" && sel_prod_country == undefined) {
                data_imp++;
              }
              if (ids == "product_arrive_year" && data[name][id][ids] == sel_year) {
                data_imp++;
              }
              else if (ids == "product_arrive_year" && sel_year == undefined) {
                data_imp++;
              }
              if (ids == "product_arrive_month" && data[name][id][ids] == sel_month) {
                data_imp++;
              }
              else if (ids == "product_arrive_month" && sel_month == undefined) {
                data_imp++;
              }
              if (ids == "request_product_list" && data[name][id][ids] == sel_type) {
                data_imp++;
              }
              else if (ids == "request_product_list" && sel_type == undefined) {
                data_imp++;
              }
            }

            if (data_imp == 5) {
              //console.log('addadd')
              realshow[realshow.length] = data[name][id];
            }
            //console.log(realshow);
            //console.log('njn'+data_imp);
          }

          for (var ll = 0; ll < realshow.length; ll++) {
            let namelist = '';
            for (const ids in realshow[ll]) {
              if (ids == "shipping_address_country") {
                namelist += `居住地: ${realshow[ll][ids]},`;
              }
              if (ids == "shipping_address_city") {
                namelist += `${realshow[ll][ids]} &nbsp;`;
              }
              if (ids == "product_place_country") {
                namelist += `商品地: ${realshow[ll][ids]},`;
              }
              if (ids == "product_place_city") {
                namelist += `${realshow[ll][ids]} &nbsp; <br>`;
              }
              if (ids == "set_product_name") {
                namelist += `需求商品: ${realshow[ll][ids]}<br>`;
              }
              if (ids == "set_product_quantity") {
                namelist += `數量: ${realshow[ll][ids]} 件 &nbsp; &nbsp; &nbsp; `;
              }
              if (ids == "product_arrive_year") {
                namelist += `${realshow[ll][ids]}/`;
              }
              if (ids == "product_arrive_month") {
                namelist += `${realshow[ll][ids]}/`;
              }
              if (ids == "product_arrive_date") {
                namelist += `${realshow[ll][ids]}<br>`;
              }
            }

            if (namelist != '') {
              var contener = document.getElementById("show_need")
              $('#show_need').append('<div class="' + name + ' ' + id + '"><div class="w"><img class="user_img" src="' + (await user_url(name)) + '"/>'
                + '<div><div class="n">' + name + '</div>' + namelist + '</div></div><div class="gray"><div class="chat_button">' +
                '<p class="chat_no">旅遊詳情</p><p class="chat_yes">進行聊天</p></div></div></div>');
              //     // 等同於下列程式碼
              //     // <div class="user1 product1">
              //     //   <div class="w">
              //     //     <div class="n">user1</div>namelist
              //     //   </div>
              //     //   <div class="gray">
              //     //     <div class="chat_button">
              //     //       <p class="chat_no">旅遊詳情</p>
              //     //       <p class="chat_yes">進行聊天</p>
              //     //     </div>
              //     //   </div>
              //     // </div>
            }
          }
        }
        //////////////////////////////////////////
        // for(const id in data[name]){
        //   let namelist = '';
        //   if (id.substring(0,7)=="product")
        //   {
        //     for(const ids in data[name][id]){
        //       // console.log("h23232");
        //       if(ids=="shipping_address_country"){
        //         namelist += `居住地: ${data[name][id][ids]},`;
        //       }
        //       if(ids=="shipping_address_city"){
        //         namelist += `${data[name][id][ids]} &nbsp;`;
        //       }
        //       if(ids=="product_place_country"){
        //         namelist += `商品地: ${data[name][id][ids]},`;
        //       }
        //       if(ids=="product_place_city"){
        //         namelist += `${data[name][id][ids]} &nbsp; <br>`;
        //       }
        //       if(ids=="set_product_name"){
        //         namelist += `需求商品: ${data[name][id][ids]}<br>`;
        //       }
        //       if(ids=="set_product_quantity"){
        //         namelist += `數量: ${data[name][id][ids]} 件 &nbsp; &nbsp; &nbsp; `;
        //       }
        //       if(ids=="product_arrive_year"){
        //         namelist += `${data[name][id][ids]}/`;
        //       }
        //       if(ids=="product_arrive_month"){
        //         namelist += `${data[name][id][ids]}/`;
        //       }
        //       if(ids=="product_arrive_date"){
        //         namelist += `${data[name][id][ids]}<br>`;
        //       }
        //     }
        //   }
        //   if(namelist!=''){
        //     var contener = document.getElementById("show_need")
        //     $('#show_need').append('<div class="'+name+' '+id+'"><div class="w"><img class="user_img" src="'+(await user_url(name))+'"/>'
        //     +'<div><div class="n">'+name+'</div>'+namelist+'</div></div><div class="gray"><div class="chat_button">'+
        //     '<p class="chat_no">旅遊詳情</p><p class="chat_yes">進行聊天</p></div></div></div>');
        //     // 等同於下列程式碼
        //     // <div class="user1 product1">
        //     //   <div class="w">
        //     //     <div class="n">user1</div>namelist
        //     //   </div>
        //     //   <div class="gray">
        //     //     <div class="chat_button">
        //     //       <p class="chat_no">旅遊詳情</p>
        //     //       <p class="chat_yes">進行聊天</p>
        //     //     </div>
        //     //   </div>
        //     // </div>
        //   }
        // }

      }
    },
  })
}
function read_personal_page() {
  event.preventDefault()
  $.post('./read_personal', {
    name: user_name,
  }, (res) => {
    $('#subpage_title .subpage_word').html(user_name)
    $('#personal_box1 .word1').html(user_name)
    $('#personal_box2 input[name="personal_name"]').val(user_name)
    $('#personal_box2 input[name="personal_gender"]').val(res[0])
    $('#personal_box2 input[name="personal_born"]').val(res[1])
    $('#personal_box2 input[name="personal_birth"]').val(res[2])
    $('#personal_box2 input[name="personal_mail"]').val(res[3])
    $('#personal_box2 input[name="personal_phone"]').val(res[4])
    $('#personal_img').css({ 'background': 'url(' + res[5] + ') no-repeat center/contain' })
  })
}
function save_personal_page() {
  return new Promise(function (resolve, reject) {
    event.preventDefault()
    $.post('./save_personal', {
      old_name: user_name,
      new_name: $('#personal_box2 input[name="personal_name"]').val(),
      gender: $('#personal_box2 input[name="personal_gender"]').val(),
      born: $('#personal_box2 input[name="personal_born"]').val(),
      birth: $('#personal_box2 input[name="personal_birth"]').val(),
      mail: $('#personal_box2 input[name="personal_mail"]').val(),
      phone: $('#personal_box2 input[name="personal_phone"]').val(),
    }, (res) => {
      user_name = $('#personal_box2 input[name="personal_name"]').val()
      $('#subpage_title .subpage_word').html(user_name)
      $('#personal_box1 .word1').html(user_name)
      resolve()
    })
  })
}
function show(string) {
  if (string == "register_success") {
    all_display_none()
    state.push("register_success")
    $('#register_success').css({ 'display': 'block' })
  }
  else if (string == "personal_page_my") {
    all_display_none()
    state.push("personal_page_my")
    $('#subpage_title').css({ 'display': 'block' })
    $("#personal_state1").css({ 'background': 'url(https://ppt.cc/frC2Jx@.png) no-repeat left/contain' });
    $('#subpage_title .subpage_word').html(user_name)
    $('#personal_box1 .word1').html(user_name)
    $('#personal_page').css({ 'display': 'block' })
    $('#bm_credit_card').css({ 'display': 'block' })
    $('#bm_edit_personal').css({ 'display': 'block' })
    read_personal_page()
  }
  else if (string == "personal_page_other_green") {
    all_display_none()
    state.push("personal_page_other_green")
    $('#subpage_title').css({ 'display': 'block' })
    $("#personal_state1").css({ 'background': 'url(https://ppt.cc/frC2Jx@.png) no-repeat left/contain' });
    $('#personal_page').css({ 'display': 'block' })
    $('#bm_personal_togood').css({ 'display': 'block' })
    $('#bm_personal_tochat').css({ 'display': 'block' })
    read_personal_page()
  }
  else if (string == "personal_page_other_blue") {
    all_display_none()
    state.push("personal_page_other_blue")
    $('#subpage_title').css({ 'display': 'block', 'background-color': '#556B94' })
    $("#personal_state1").css({ 'background': 'url(https://ppt.cc/fH0Tyx@.png) no-repeat left/contain' });
    $('#personal_page').css({ 'display': 'block' })
    $('#bm_personal_totrip').css({ 'display': 'block' })
    $('#bm_personal_tochat').css({ 'display': 'block' })
    read_personal_page()
  }
  else if (string == "mainpage_schedule") {
    all_display_none()
    state.push("mainpage_schedule")
    $('#mainpage').css({ 'display': 'block' })
    $('#user_menu').css({ 'display': 'block' })
    $('#menu_bar').css({ 'display': 'flex' })
    $('#selbar').css({ 'display': 'flex' })
    $('#user_menu .user_id').html("username:" + user_name)
    to_mainpage_schedule()
  }
  else if (string == "mainpage_need") {
    all_display_none()
    state.push("mainpage_need")
    $('#mainpage').css({ 'display': 'block' })
    $('#user_menu').css({ 'display': 'block' })
    $('#menu_bar').css({ 'display': 'flex' })
    $('#selbar').css({ 'display': 'flex' })
    $('#user_menu .user_id').html("username:" + user_name)
    to_mainpage_need()
  }
  else if (string == "add_new_journey") {
    all_display_none()
    state.push("add_new_journey")
    $('#add_new_journey').css({ 'display': 'block' })
    $('#user_menu').css({ 'display': 'block' })
    $('#menu_bar').css({ 'display': 'flex' })
  }
  else if (string == "add_new_request") {
    all_display_none()
    state.push("add_new_request")
    $('#add_new_request').css({ 'display': 'block' })
    $('#user_menu').css({ 'display': 'block' })
    $('#menu_bar').css({ 'display': 'flex' })
  }
  else if (string == "accept_case_list") {
    all_display_none()
    state.push("accept_case_list")
    $('#accept_case_list').css({ 'display': 'block' })
    $('#subpage_title').css({ 'display': 'block' })
    $('#subpage_title .subpage_word').html("代購清單")
    $('#menu_bar').css({ 'display': 'flex' })
    $('#has_customer').css({ 'display': 'block' })
  }
  else if (string == "chat_main") {
    all_display_none()
    state.push("chat_main")
    $('#chat_main').css({ 'display': 'block' })
    $('#subpage_title').css({ 'display': 'block' })
    $('#subpage_title .subpage_word').html("聊天紀錄")
    $('#menu_bar').css({ 'display': 'flex' })
  }
  else if (string == "chat_box") {
    all_display_none()
    state.push("chat_box")
    $('#chat_box').css({ 'display': 'block' })
  }
  else if (string == "product_contant") {
    all_display_none()
    state.push("product_contant")
    $('#product_contant').css({ 'display': 'block' })
    $('#user_menu').css({ 'display': 'block' })
    $('#menu_bar').css({ 'display': 'flex' })
  }
  else {
    console.log("changing error.")
  }
}

// homepage
$(document).ready(function () {
  $('#homepage1 button[name="login"]').click((event) => {
    event.preventDefault()
    $.post('./login', {
      account: $('#homepage1 input[name="account"]').val(),
      password: $('#homepage1 input[name="password"]').val(),
    }, (res) => {
      $('#homepage_output1').html(res)
      if (res == "帳號密碼正確") {
        user_name = $('#homepage1 input[name="account"]').val()
        show("mainpage_schedule")
      }
    })
  })

  $('#homepage1 button[name="register"]').click((event) => {
    $('#homepage1').css({ 'display': 'none' })
    $('#homepage2').css({ 'display': 'flex' })
    $('#homepage_output1').html("<br>")
  })

  $('#homepage2 button[name="register_submit"]').click((event) => {
    event.preventDefault()
    $.post('./register', {
      name: $('#homepage2 input[name="user_name"]').val(),
      phone: $('#homepage2 input[name="user_phone"]').val(),
      mail: $('#homepage2 input[name="user_mail"]').val(),
      password1: $('#homepage2 input[name="user_password1"]').val(),
      password2: $('#homepage2 input[name="user_password2"]').val(),
    }, (res) => {
      $('#homepage_output2').html(res)
      if (res == "註冊成功！") {
        show("register_success")
        user_name = $('#homepage2 input[name="user_name"]').val()
      }
    })
  })

  $('#backto_homepage').click((event) => {
    $('#homepage1').css({ 'display': 'flex' })
    $('#homepage2').css({ 'display': 'none' })
    $('#homepage_output2').html("<br>")
  })

  // register_success
  $('#register_success button[name="to_personal"]').click(function () {
    show("personal_page_my")
  });
  $('#register_success button[name="to_mainpage"]').click(function () {
    show("mainpage_schedule")
  });

  // personal_page
  var edit_state = 0;
  $('#bm_edit_personal').click(async function () {
    if (!edit_state) {
      $('#personal_box2 input[type="text"]').attr("disabled", false);
      $('#personal_box2 input[type="text"]').css({ 'border-bottom': 'solid 1px #939191', 'text-align': 'left' })
      $('#personal_box_img #personal_mask').css({ 'display': 'block' })
      $(this).css({ 'background': '#556B94', 'color': '#f6f6f6' })
      $(this).text("儲存變更")
      edit_state = 1
    }
    else {
      await save_personal_page()
      $('#personal_box2 input[type="text"]').attr("disabled", true);
      $('#personal_box2 input[type="text"]').css({ 'border-bottom': 'solid 1px #F7F7F7', 'text-align': 'right' })
      $('#personal_box_img #personal_mask').css({ 'display': 'none' })
      $(this).css({ 'background': '#E8E8E8', 'color': '#000000' })
      $(this).text("編輯內容")
      edit_state = 0
    }
  });
  // 選不要儲存變更
  $("#personal_page_unsaved .deal_no").click(function () {
    $("#personal_page_unsaved").css({ 'display': 'none' });
  });
  // 選同意儲存變更
  $("#personal_page_unsaved .deal_yes").click(async function () {
    $("#personal_page_unsaved").css({ 'display': 'none' });
    await save_personal_page()
    state.pop()
    show(state.pop())
    $('#personal_box2 input[type="text"]').attr("disabled", true);
    $('#personal_box2 input[type="text"]').css({ 'border-bottom': 'solid 1px #F7F7F7', 'text-align': 'right' })
    $('#personal_box_img #personal_mask').css({ 'display': 'none' })
    $('#bm_edit_personal').css({ 'background': '#E8E8E8', 'color': '#000000' })
    $('#bm_edit_personal').text("編輯內容")
    edit_state = 0
  });
  // 改變個人頭像
  $('#personal_box_img #personal_mask').click(function () {
    $('#change_personal_img').css({ 'display': 'flex' })
    $('#change_img_box').css({ 'display': 'flex' })
  });
  $('#personal_box_img #personal_img').click(function () {
    if (edit_state) {
      $('#change_personal_img').css({ 'display': 'flex' })
      $('#change_img_box').css({ 'display': 'flex' })
    }
  });
  $('#change_personal_img').click(function () {
    $(this).css({ 'display': 'none' })
  });
  $("#change_img_box").click(function (event) {
    event.stopPropagation();
  });
  $("#upload_img_box").click(function (event) {
    event.stopPropagation();
  });
  $('#change_img1').click(function (event) {
    $('#upload_file').click()
  });
  $('#change_img2').click(function (event) {
    console.log("change_img2")
    // all_display_none()
  });

  // 上傳個人照片
  var $uploadCrop;
  function readFile(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $uploadCrop.croppie('bind', {
          url: e.target.result
        });
      }
      reader.readAsDataURL(input.files[0]);
    }
    else {
      alert("Sorry - you're browser doesn't support the FileReader API");
    }
  }
  function cropAndUpload() {
    $uploadCrop.croppie("result", "blob").then(function (blob) {
      var formData = new FormData();
      formData.append("image", blob);
      // 上傳圖片到後端
      $.ajax({
        url: "/upload",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          console.log("圖片上傳成功！");
          console.log("圖片網址：", response.url);
          $('#personal_img').css({ 'background': 'url(' + response.url + ') no-repeat center/contain' })
          $.post('./store_personal_img', {
            name: user_name,
            url: response.url,
          }, {})
        },
        error: function (error) {
          console.log("圖片上傳失敗：", error);
        }
      });
    });
  }
  $uploadCrop = $('#upload_demo').croppie({
    viewport: {
      width: 150,
      height: 150,
      type: 'circle'
    },
    boundary: {
      width: 200,
      height: 200
    },
    showZoomer: false,
  });
  $('#upload_file').on('change', function () {
    $('#change_img_box').css({ 'display': 'none' })
    $('#upload_img_box').css({ 'display': 'flex' })
    readFile(this);
  });
  $('#upload_result').on('click', function (ev) {
    $uploadCrop.croppie('result', 'canvas').then(function (resp) {
      cropAndUpload();
      $('#change_personal_img').css({ 'display': 'none' });
      $('#upload_img_box').css({ 'display': 'none' });
    });
  });

  // mainpage-我是代購者
  var prenum = 0;
  $('#mainpage').on('click', '#show_schedule :nth-child(n) .w', function () {
    var num = $(this).parent().index() + 1;
    if (num != prenum) {
      $('#show_schedule :nth-child(n) .gray').css({ 'display': 'none' });
      $('#show_schedule :nth-child(' + num + ') .gray').css({ 'display': 'block' });
      prenum = num;
    }
    else {
      $('#show_schedule :nth-child(' + num + ') .gray').css({ 'display': 'none' });
      prenum = 0;
    }
  });
  $('#mainpage').on('click', '#show_schedule :nth-child(n) .chat_yes', function () {
    var nn = $(this).parent().parent().parent().attr('class')
    show("chat_box")
  });
  $('#mainpage').on('click', '#show_schedule :nth-child(n) .chat_no', function () {
    var nn = $(this).parent().parent().parent().attr('class')
    let ss = nn.split(/\s/);
    console.log(ss[0]) // user1
    console.log(ss[1]) // trip0
  });

  // mainpage-我是購買者
  var prenum1 = 0;
  $('#mainpage').on('click', '#show_need :nth-child(n) .w', function () {
    var num1 = $(this).parent().index() + 1;
    if (num1 != prenum1) {
      $('#show_need :nth-child(n) .gray').css({ 'display': 'none' });
      $('#show_need :nth-child(' + num1 + ') .gray').css({ 'display': 'block' });
      prenum1 = num1;
    }
    else {
      $('#show_need :nth-child(' + num1 + ') .gray').css({ 'display': 'none' });
      prenum1 = 0;
    }
  });
  $('#mainpage').on('click', '#show_need :nth-child(n) .chat_yes', function () {
    var nn = $(this).parent().parent().parent().attr('class')
    // var num=$(this).parent().parent().parent().index()+1;
    // $('#show_chatmain :nth-child('+num+') .gray .chat_button .chat_yes').css({'display':'block'});
    // $(location).attr('href','http://luffy.ee.ncku.edu.tw:9867/')
    show("chat_box")
    console.log(nn)
  });
  $('#mainpage').on('click', '#show_need :nth-child(n) .chat_no', function () {
    var nn = $(this).parent().parent().parent().attr('class')
    let ss = nn.split(/\s/);

    show("product_contant")
    console.log(ss[0]) // user1
    console.log(ss[1]) // product0

    event.preventDefault()
    $.post('./product_contant', {
      user_name: ss[0],
      product: ss[1],
      // set_product_name: $('#request_data input[name=set_product_name]').val(),
      // product_place_country: $('#request_data select[name=product_place_country]').val(),
      // product_place_city: $('#request_data select[name=product_place_city]').val(),
      // set_shop_name: $('#request_data input[name=set_shop_name]').val(),
      // set_shop_address: $('#request_data input[name=set_shop_address]').val(),
      // request_product_list: $('#request_data select[name=request_product_list]').val(),
      // set_product_quantity: $('#request_data input[name=set_product_quantity]').val(),
      // shipping_address_country: $('#request_data select[name=shipping_address_country]').val(),
      // shipping_address_city: $('#request_data select[name=shipping_address_city]').val(),
      // product_arrive_year: $('#request_data select[name=product_arrive_year]').val(),
      // product_arrive_month: $('#request_data select[name=product_arrive_month]').val(),
      // product_arrive_date: $('#request_data select[name=product_arrive_date]').val(),
      // request_remark: $('#request_data input[name=request_remark]').val(),

      //ID: $('#add input[name=ID]').val(), //前面的fname和ser.js的req.query.fname為同者 後面的fname和exercise.html的name=fname為同者
      //name: $('#add input[name=name]').val(),
    }, (data) => {
      $('#buyer_name').html(ss[0])
      console.log(data)
      console.log(data[6])
      $('#buyer_set_product_name').html(data[0])
      $('#buyer_product_place_country').html(data[1])
      $('#buyer_product_place_city').html(data[2])
      $('#buyer_set_shop_name').html(data[3])
      $('#buyer_set_shop_address').html(data[4])
      $('#buyer_request_product_list').html(data[5])
      $('#buyer_set_product_quantity').html(data[6])
      $('#buyer_shipping_address_country').html(data[7])
      $('#buyer_shipping_address_city').html(data[8])
      $('#buyer_product_arrive_year').html(data[9])
      $('#buyer_product_arrive_month').html(data[10])
      $('#buyer_product_arrive_date').html(data[11])
      $('#buyer_request_remark').html(data[12])
      show("product_contant")
      //$('#add-output').html(data) //讓html中#ajax-output那段的內容變更為data的內容
    })

    product_img_state = 0;
    product_img[0] = "https://ppt.cc/fjLLEx@.png"
    product_img[1] = "https://ppt.cc/fCBEmx@.png"
    product_img[2] = "https://ppt.cc/fpJrYx@.png"
    product_img[3] = "https://ppt.cc/fvMcWx@.png"
  });

  // schedule 代購者頁面
  $('#user_menu .shopping_bag').click((event) => {
    if (state[state.length - 1] == "mainpage_schedule")
      show("mainpage_need")
  })
  $('#bm_add_schedule').click((event) => {
    if (state[state.length - 1] == "mainpage_schedule") {
      show("add_new_journey")
    }
  })
  // need 購買者頁面
  $('#user_menu .mid_luggage').click((event) => {
    if (state[state.length - 1] == "mainpage_need")
      show("mainpage_schedule")
  })
  $('#bm_add_schedule').click((event) => {
    if (state[state.length - 1] == "mainpage_need") {
      show("add_new_request")
    }
  })

  // menu_bar
  $('#menu_bar .home').click((event) => {
    show("mainpage_schedule")
  })
  $('#menu_bar .user_profile').click((event) => {
    show("personal_page_my")
  })
  $('#menu_bar .case_list').click((event) => {
    show("accept_case_list")
  })
  $('#menu_bar .chat_list').click((event) => {
    show("chat_main")
  })
  // subpage
  $('#subpage_title .case_back_button').click((event) => {
    if (state[state.length - 1] == "personal_page_my" && edit_state) {
      $('#personal_page_unsaved').css({ 'display': 'flex' })
    }
    else {
      state.pop()
      show(state.pop())
    }
  })
  // accept_case_list
  var check_state1 = 0;
  $(".cus_list_check1").click(function () {
    if (check_state1 == 0) {
      $('.cus_list_check1').css({ 'opacity': '1' });
      check_state1 = 1;
    }
    else if (check_state1 == 1) {
      $('.cus_list_check1').css({ 'opacity': '0' });
      check_state1 = 0;
    }
  });
  var check_state2 = 0;
  $(".cus_list_check2").click(function () {
    if (check_state2 == 0) {
      $('.cus_list_check2').css({ 'opacity': '1' });
      check_state2 = 1;
    }
    else if (check_state2 == 1) {
      $('.cus_list_check2').css({ 'opacity': '0' });
      check_state2 = 0;
    }
  });
  // chatmain
  var prenum2 = 0;
  $('#chat_main').on('click', '#show_chatmain :nth-child(n) .w', function () {
    var num = $(this).parent().index() + 1;
    if (num != prenum2) {
      $('#show_chatmain :nth-child(n) .gray').css({ 'display': 'none' });
      $('#show_chatmain :nth-child(' + num + ') .gray').css({ 'display': 'block' });
      prenum2 = num;
    }
    else {
      $('#show_chatmain :nth-child(' + num + ') .gray').css({ 'display': 'none' });
      prenum2 = 0;
    }
  });
  $('#chat_main .chat_yes').click(function () {
    // $(location).attr('href','http://luffy.ee.ncku.edu.tw:9867/')
    show("chat_box")
  });


  // add_new_journey
  var city = new Array();
  city[1] = ['台北', '台中', '台南', '高雄']; //台灣
  city[2] = ['東京', '大阪', '京都', '北海道']; //日本
  city[3] = ['首爾', '釜山']; //韓國
  city[4] = ['北京', '上海', '香港']; //中國
  city[5] = ['紐約', '洛杉磯', '舊金山']; //美國
  city[6] = ['巴黎', '馬賽', '里昂']; //法國
  city[7] = ['慕尼黑', '法蘭克福', '柏林']; //德國

  $('#departure_country').change(function () {
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    var Sinner = '';
    for (var i = 0; i < city[index].length; i++) {
      Sinner = Sinner + '<option value=' + city[index][i] + '>' + city[index][i] + '</option>';
    }
    $('#departure_city').html(Sinner);
    $('#departure_city').attr("disabled", false);
  });

  $('#entry_country').change(function () {
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    var Sinner = '';
    for (var i = 0; i < city[index].length; i++) {
      Sinner = Sinner + '<option value=' + city[index][i] + '>' + city[index][i] + '</option>';
    }
    $('#entry_city').html(Sinner);
    $('#entry_city').attr("disabled", false);
  });

  $('#departure_month').change(function () {
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    var Sinner = '';
    if (index == 1 || index == 3 || index == 5 || index == 7 || index == 8 || index == 10 || index == 12) {
      for (var i = 1; i <= 31; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }
    else if (index == 4 || index == 6 || index == 9 || index == 11) {
      for (var i = 1; i <= 30; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }
    else if (index == 2) {
      for (var i = 1; i <= 28; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }

    $('#departure_date').html(Sinner);
    $('#departure_date').attr("disabled", false);
  });

  $('#entry_month').change(function () {
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    var Sinner = '';
    if (index == 1 || index == 3 || index == 5 || index == 7 || index == 8 || index == 10 || index == 12) {
      for (var i = 1; i <= 31; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }
    else if (index == 4 || index == 6 || index == 9 || index == 11) {
      for (var i = 1; i <= 30; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }
    else if (index == 2) {
      for (var i = 1; i <= 28; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }

    $('#entry_date').html(Sinner);
    $('#entry_date').attr("disabled", false);
    //alert(index);
  });

  $('#luggage_space_list').change(function () {
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    if (index == 1) {
      $("#big_luggage").attr("src", "https://ppt.cc/flWv0x@.png");
    }
    else if (index == 2) {
      $("#big_luggage").attr("src", "https://ppt.cc/fyz1fx@.png");
    }
    else if (index == 3) {
      $("#big_luggage").attr("src", "https://ppt.cc/faeuHx@.png");
    }
    else if (index == 4) {
      $("#big_luggage").attr("src", "https://ppt.cc/fOwTNx@.png");
    }
    else if (index == 5) {
      $("#big_luggage").attr("src", "https://ppt.cc/fbY02x@.png");
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
  $('#product_place_country').change(function () {
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    var Sinner = '';
    for (var i = 0; i < city[index].length; i++) {
      Sinner = Sinner + '<option value=' + city[index][i] + '>' + city[index][i] + '</option>';
    }
    $('#product_place_city').html(Sinner);
    $('#product_place_city').attr("disabled", false);
  });

  $('#shipping_address_country').change(function () {
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    var Sinner = '';
    for (var i = 0; i < city[index].length; i++) {
      Sinner = Sinner + '<option value=' + city[index][i] + '>' + city[index][i] + '</option>';
    }
    $('#shipping_address_city').html(Sinner);
    $('#shipping_address_city').attr("disabled", false);
  });

  $('#product_arrive_month').change(function () {
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    var Sinner = '';
    if (index == 1 || index == 3 || index == 5 || index == 7 || index == 8 || index == 10 || index == 12) {
      for (var i = 1; i <= 31; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }
    else if (index == 4 || index == 6 || index == 9 || index == 11) {
      for (var i = 1; i <= 30; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }
    else if (index == 2) {
      for (var i = 1; i <= 28; i++) {
        Sinner = Sinner + '<option value=' + i + '>' + i + "日" + '</option>';
      }
    }

    $('#product_arrive_date').html(Sinner);
    $('#product_arrive_date').attr("disabled", false);
  });

  $('#submit_request').click((event) => {
    event.preventDefault()
    $.get('./request_data', {
      user_name: user_name,
      shipping_address_country: $('#request_data select[name=shipping_address_country]').val(),
      shipping_address_city: $('#request_data select[name=shipping_address_city]').val(),
      product_place_country: $('#request_data select[name=product_place_country]').val(),
      product_place_city: $('#request_data select[name=product_place_city]').val(),
      set_product_name: $('#request_data input[name=set_product_name]').val(),
      set_shop_name: $('#request_data input[name=set_shop_name]').val(),
      set_shop_address: $('#request_data input[name=set_shop_address]').val(),
      request_product_list: $('#request_data select[name=request_product_list]').val(),
      set_product_quantity: $('#request_data input[name=set_product_quantity]').val(),
      product_arrive_year: $('#request_data select[name=product_arrive_year]').val(),
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

  //product contant page
  $('#right_arrow').click((event) => {
    if(product_img_state < (product_img.length-1)){
      product_img_state = product_img_state+1;
    }
    else {
      product_img_state = 0;
    }
    console.log(product_img_state)
    console.log(product_img[product_img_state])
    $('#buyer_product_img').attr("src",product_img[product_img_state])
  })

  $('#left_arrow').click((event) => {
    if(product_img_state == 0){
      product_img_state = product_img.length-1;
    }
    else {
      product_img_state = product_img_state-1;
    }
    console.log(product_img_state)
    console.log(product_img[product_img_state])
    $('#buyer_product_img').attr("src",product_img[product_img_state])
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
  $('#chat_box .back').click(function () {
    state.pop()
    show(state.pop())
  })
  // chat_box: chat_deal
  $('#chat_deal').click(function () {
    $("#deal_agree").css({ 'display': 'flex' });
  })

  //選取消交易
  $("#deal_box .deal_no").click(function () {
    $("#deal_agree").css({ 'display': 'none' });
  });
  //選同意交易
  $("#deal_box .deal_yes").click(function () {
    all_display_none()
    $("#deal_success").css({ 'display': 'block' });
  });

  //deal_success
  $('#deal_success button[name="to_list"]').click(function () {
    $("#deal_success").css({ 'display': 'none' });
    show("accept_case_list")
  });
  $('#deal_success button[name="to_mainpage"]').click(function () {
    $("#deal_success").css({ 'display': 'none' });
    show("mainpage_schedule")
  });
})

//select bar in mainpage
$('#selbar').click(function () {
  $("#choose").css({ 'display': 'block' });
  $("#blank").css({ 'display': 'block' });
  $("#blank2").css({ 'display': 'block' });
});

//let select bar disappear
$('#blank').click(function () {
  $("#choose").css({ 'display': 'none' });
  $("#blank").css({ 'display': 'none' });
  $("#blank2").css({ 'display': 'none' });
});
$('#blank2').click(function () {
  $("#choose").css({ 'display': 'none' });
  $("#blank").css({ 'display': 'none' });
  $("#blank2").css({ 'display': 'none' });
});

$('#select_checkbox1').click(function () {
  choose_box1 = 1;
  $("#select_check1").css({ 'display': 'block' });
});
$('#select_check1').click(function () {
  choose_box1 = 0;
  $("#select_check1").css({ 'display': 'none' });
  console.log('state' + choose_box1)
});
$('#select_checkbox2').click(function () {
  choose_box2 = 1;
  $("#select_check2").css({ 'display': 'block' });
});
$('#select_check2').click(function () {
  choose_box2 = 0;
  $("#select_check2").css({ 'display': 'none' });
});
$('#select_checkbox3').click(function () {
  choose_box3 = 1;
  $("#select_check3").css({ 'display': 'block' });
});
$('#select_check3').click(function () {
  choose_box3 = 0;
  $("#select_check3").css({ 'display': 'none' });
});
$('#select_checkbox4').click(function () {
  choose_box4 = 1;
  $("#select_check4").css({ 'display': 'block' });
});
$('#select_check4').click(function () {
  choose_box4 = 0;
  $("#select_check4").css({ 'display': 'none' });
});
$('#cho_submit').click(function () {
  cho_submit = 1;
  $("#choose").css({ 'display': 'none' });
  if (state[state.length - 1] == "mainpage_schedule") {
    to_mainpage_schedule()
  }
  else {
    to_mainpage_need()
  }
});
$('#cho_reset,.mid_luggage,.shopping_bag').click(function () {
  cho_submit = 0;
  $("#select_check1").css({ 'display': 'none' });
  $("#select_check2").css({ 'display': 'none' });
  $("#select_check3").css({ 'display': 'none' });
  $("#select_check4").css({ 'display': 'none' });
  $("#choose").css({ 'display': 'none' });
  if (state[state.length - 1] == "mainpage_schedule") {
    to_mainpage_schedule()
  }
  else {
    to_mainpage_need()
  }
});

// $(document).click(function (event) {
//   //目標--點這些東西之外就會不見
//   let testInput1 = $('#selbar');
//   let testInput2 = $('#choose');
//   let testInput4 = $('.select_checkbox');
//   let testInput3 = $('#choose_place');
//   if (!testInput1.is(event.target) && !testInput2.is(event.target) && !testInput3.is(event.target) && !testInput4.is(event.target))
//     $("#choose").slideUp(4);
// });