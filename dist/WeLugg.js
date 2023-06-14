var user_name = ""
let state = [""]
var choose_box1 = 0;
var choose_box2 = 0;
var choose_box3 = 0;
var choose_box4 = 0;
var cho_submit = 0;
var add_product_img_state;
let add_product_img = [];





function all_display_none() {
  $('#homepage1').css({'display':'none'})
  $('#homepage2').css({'display':'none'})
  $('#register_success').css({'display':'none'})
  $('#personal_page').css({'display':'none'})
  $('#bm_credit_card').css({'display':'none'})
  $('#bm_edit_personal').css({'display':'none'})
  $('#bm_personal_togood').css({'display':'none'})
  $('#bm_personal_totrip').css({'display':'none'})
  $('#bm_personal_tochat').css({'display':'none'})

  $('#user_menu').css({'display':'none'})
  $('#menu_bar').css({'display':'none'})
  $('#selbar').css({'display':'none'})
  $('#moreofmine').css({'display':'none'})
  $('#subpage_title').css({'display':'none','background-color':'#7FD6D0'})

  $('#mainpage').css({'display':'none'})
  $('#show_schedule').css({'display':'none'})
  $('#show_need').css({'display':'none'})

  $('#add_new_journey').css({ 'display': 'none' })
  $('#add_new_request').css({ 'display': 'none' })
  $('#chat_main').css({ 'display': 'none' })
  $('#accept_case_list').css({ 'display': 'none' })
  $('#accept_case_list #no_customer').css({ 'display': 'none' })
  $('#accept_case_list #has_customer').css({ 'display': 'none' })
  $('#buy_case_list').css({ 'display': 'none' })
  $('#buy_case_list #no_buy').css({ 'display': 'none' })
  $('#buy_case_list #has_buy').css({ 'display': 'none' })
  $('#aft_shopping_cart').css({ 'display': 'none' })
  $('#deal_agree').css({ 'display': 'none' })
  $('#deal_success').css({ 'display': 'none' })
  $('#chat_box').css({ 'display': 'none' })
  $('#product_contant').css({ 'display': 'none' })
  $('#trip_contant').css({ 'display': 'none' })
  $('#self_product').css({ 'display': 'none' })
  $('#self_trip').css({ 'display': 'none' })
}

function accept_case() {
  $('#accept_case_list').css({ 'display': 'block' });
  $('#accept_case_list #has_customer').css({ 'display': 'flex' })
  $('#accept_case_list #has_customer').html('');
  console.log("hahhahah")
  $.ajax({
    type: 'POST',
    url: './list',
    success: async (data) => {
      console.log("hahhahahaaaa")
      for (const name in data) {
        for (const id in data[name]) {
          let prd_name = '';
          if (id.substring(0, 7) == "product" && id.substring(0, 8) != "product_") {
            if (data[name][id]["accept"] == 1 && data[name][id]["accepter"] == user_name) {
              for (const ids in data[name][id]) {
                if (ids == "set_product_name") {
                  prd_name = ` ${data[name][id][ids]}`;
                }
                if (ids == "request_product_list") {
                  if(data[name][id][ids] == "food"){
                    prd_type = `食物類`;
                  }
                  else if(data[name][id][ids] == "Apparel"){
                    prd_type = `服飾類`;
                  }
                  else if(data[name][id][ids] == "Cosmetic"){
                    prd_type = `彩妝保養類`;
                  }
                  else{
                    prd_type = `生活用品類`;
                  }
                }
                if (ids == "product_place_country") {
                  prd_country = `${data[name][id][ids]},`;
                }
                if (ids == "product_place_city") {
                  prd_country += `${data[name][id][ids]}`;
                }
                if (ids == "set_shop_address") {
                  prd_place = `${data[name][id][ids]}`;
                }

              }
              if (prd_name != '') {
                var contener = document.getElementById("has_customer")
                console.log("aaaaaaaaaaaaaaaaaa")
                $('#has_customer').append('<div class="' + name + ' ' + id + '"><img class="prd_img" src="https://ppt.cc/f6L57x@.png"/>' +
                  '<div class="prd_name">' + prd_name + '</div><div class="prd_type">' + prd_type + '</div><div class="prd_country">' + prd_country +
                  '</div><div class="prd_place">' + prd_place + '</div><img class="per_img" src="' + (await user_url(name)) + '"/>' +
                  '<div class="btm"><p class="bn_up">個人專頁</p><p class="bn_dn">進行聊天</p></div></div>');
                // 等同於下列程式碼
                //    <div class="user1 product0">
                //          <img class="prd_img" src="/src/user" />
                //          <div class="prd_name">prd_name</div>
            //              <div class="prd_type">prd_type</div>
            //              <div class="prd_country">prd_country</div>
            //              <div class="prd_place">prd_place</div>
            //              <img class="prd_img" src="/src/user" />
            //              <div class="btm">
                      //        <p class="bn_up">個人專頁</p>
                      //        <p class="bn_dn">進行聊天</p>
                //          </div>
                //    </div>

              }
            }

          }
        }
      }
    },
  })
}

function buy_case() {
  $('#buy_case_list').css({ 'display': 'block' });
  $('#buy_case_list #has_buy').css({ 'display': 'flex' })
  $('#buy_case_list #has_buy').html('');
  console.log("hahhahah")
  $.ajax({
    type: 'POST',
    url: './list',
    success: async (data) => {
      console.log("hahhahahaaaa")
        for (const id in data[user_name]) {
          let prd_name = '';
          if (id.substring(0, 7) == "product" && id.substring(0, 8) != "product_") {
            if (data[user_name][id]["accept"] == 1) {
              for (const ids in data[user_name][id]) {
                if (ids == "set_product_name") {
                  prd_name = ` ${data[user_name][id][ids]}`;
                }
                if (ids == "request_product_list") {
                  if(data[user_name][id][ids] == "food"){
                    prd_type = `食物類`;
                  }
                  else if(data[user_name][id][ids] == "Apparel"){
                    prd_type = `服飾類`;
                  }
                  else if(data[user_name][id][ids] == "Cosmetic"){
                    prd_type = `彩妝保養類`;
                  }
                  else{
                    prd_type = `生活用品類`;
                  }
                }
                if (ids == "product_place_country") {
                  prd_country = `${data[user_name][id][ids]},`;
                }
                if (ids == "product_place_city") {
                  prd_country += `${data[user_name][id][ids]}`;
                }
                if (ids == "set_shop_address") {
                  prd_place = `${data[user_name][id][ids]}`;
                }

              }
              if (prd_name != '') {
                var contener = document.getElementById("has_buy")
                console.log("aaaaaaaaaaaaaaaaaa")
                $('#has_buy').append('<div class="' + user_name + ' ' + id + '"><img class="prd_img" src="https://ppt.cc/f6L57x@.png"/>' +
                  '<div class="prd_name">' + prd_name + '</div><div class="prd_type">' + prd_type + '</div><div class="prd_country">' + prd_country +
                  '</div><div class="prd_place">' + prd_place + '</div><img class="per_img" src="' + (await user_url(user_name)) + '"/>' +
                  '<div class="btm"><p class="bn_up">個人專頁</p><p class="bn_dn">進行聊天</p></div></div>');
                // 等同於下列程式碼
                //    <div class="user1 product0">
                //          <img class="prd_img" src="/src/user" />
                //          <div class="prd_name">prd_name</div>
            //              <div class="prd_type">prd_type</div>
            //              <div class="prd_country">prd_country</div>
            //              <div class="prd_place">prd_place</div>
            //              <img class="prd_img" src="/src/user" />
            //              <div class="btm">
                      //        <p class="bn_up">個人專頁</p>
                      //        <p class="bn_dn">進行聊天</p>
                //          </div>
                //    </div>

              }
            }

          }
        }
      
    },
  })
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
  $('#moreofmine').css({ 'background-color': '#556B94'  });
  $('#moreofmine .moreofmine_dis').html('你需要的商品');
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

      var count=0;
      let moretoshow = '';
      for(const id in data[user_name]){
        if(count<2){
          if (id.substring(0, 7) == "product" && id.substring(0, 8) != "product_") {
            count++;
            for(const ids in data[user_name][id]){
              if (ids == "set_product_name") {
                moretoshow += `${data[user_name][id][ids]} <br>`;
              }
            }
          }
        }
      }
      if(count>0){
        $('#moreofmine').css({ 'display': 'block' });
        $('#moreofmine .moreofmine_content').html(moretoshow);
        console.log(moretoshow)
      }


      for (const name in data) {
        for (const id in data[name]) {
          let realshow = [];
          if (id.substring(0, 4) == "trip" && id.substring(0, 5) != "trip_" ) {
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

            if (namelist != '') {
              var contener = document.getElementById("show_schedule")
              $('#show_schedule').append('<div class="' + name + ' ' + id + '"><div class="w"><img class="user_img" src="' + (await user_url(name)) + '"/>'
                + '<div><div class="n">' + name + '</div>' + namelist + '</div></div><div class="gray"><div class="chat_button">' +
                '<p class="chat_no">旅程詳情</p><p class="chat_yes">進行聊天</p></div></div></div>');
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
  $('#moreofmine').css({ 'background-color': '#7FD6D0'  });
  $('#moreofmine .moreofmine_dis').html('你的行程');
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
      var count=0;
      let moretoshow = '';
      for(const id in data[user_name]){
        if(count<2){
          if (id.substring(0, 4) == "trip" && id.substring(0, 5) != "trip_") {
            count++;
            for(const ids in data[user_name][id]){
              if (ids == "departure_country") {
                moretoshow += `${data[user_name][id][ids]},`;
              }
              if (ids == "departure_city") {
                moretoshow += `${data[user_name][id][ids]} -> `;
              }
              if (ids == "entry_country") {
                moretoshow += `${data[user_name][id][ids]},`;
              }
              if (ids == "entry_city") {
                moretoshow += `${data[user_name][id][ids]}  `;
              }
              if (ids == "departure_year") {
                moretoshow += `${data[user_name][id][ids]}/`;
              }
              if (ids == "departure_month") {
                moretoshow += `${data[user_name][id][ids]}/`;
              }
              if (ids == "departure_date") {
                moretoshow += `${data[user_name][id][ids]} - `;
              }
              if (ids == "entry_year") {
                moretoshow += `${data[user_name][id][ids]}/`;
              }
              if (ids == "entry_month") {
                moretoshow += `${data[user_name][id][ids]}/`;
              }
              if (ids == "entry_date") {
                moretoshow += `${data[user_name][id][ids]} <br>`;
              }
            }
          }
        }
      }
      if(count>0){
        $('#moreofmine').css({ 'display': 'block' });
        $('#moreofmine .moreofmine_content').html(moretoshow);
        console.log(moretoshow)
      }

      for (const name in data) {
        for (const id in data[name]) {
          let realshow = [];
          if (id.substring(0, 7) == "product" && id.substring(0, 8) != "product_") {
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
                '<p class="chat_no">代購詳情</p><p class="chat_yes">進行聊天</p></div></div></div>');
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
function read_personal_page(){
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
    $('#personal_img').css({'background':'url('+res[5]+') no-repeat center/contain'})
  })
}
function save_personal_page(){
  return new Promise(function(resolve, reject) {
    event.preventDefault()
    $.post('./save_personal', {
      old_name: user_name,
      new_name: $('#personal_box2 input[name="personal_name"]').val(),
      gender: $('#personal_box2 input[name="personal_gender"]').val(),
      born: $('#personal_box2 input[name="personal_born"]').val(),
      birth: $('#personal_box2 input[name="personal_birth"]').val(),
      mail: $('#personal_box2 input[name="personal_mail"]').val(),
      phone: $('#personal_box2 input[name="personal_phone"]').val(),
    },(res) => {
      user_name = $('#personal_box2 input[name="personal_name"]').val()
      $('#subpage_title .subpage_word').html(user_name)
      $('#personal_box1 .word1').html(user_name)
      resolve()
    })
  })
}
function save_self_product_page() {
  return new Promise(function (resolve, reject) {
    event.preventDefault()
    $.post('./save_self_product', {
      user_name: user_name,
      product: "product0",
      self_shipping_address_country: $('#self_product select[name=self_shipping_address_country]').val(),
      self_shipping_address_city: $('#self_product select[name=self_shipping_address_city]').val(),
      self_product_place_country: $('#self_product select[name=self_product_place_country]').val(),
      self_product_place_city: $('#self_product select[name=self_product_place_city]').val(),
      self_set_product_name: $('#self_product input[name=self_set_product_name]').val(),
      self_set_shop_name: $('#self_product input[name=self_set_shop_name]').val(),
      self_set_shop_address: $('#self_product input[name=self_set_shop_address]').val(),
      self_product_list: $('#self_product select[name=self_product_list]').val(),
      self_set_product_quantity: $('#self_product input[name=self_set_product_quantity]').val(),
      self_product_arrive_year: $('#self_product select[name=self_product_arrive_year]').val(),
      self_product_arrive_month: $('#self_product select[name=self_product_arrive_month]').val(),
      self_product_arrive_date: $('#self_product select[name=self_product_arrive_date]').val(),
      self_request_remark: $('#self_product input[name=self_request_remark]').val(),
    }, (res) => {
      resolve()
    })
  })
}
function save_self_trip_page() {
  return new Promise(function (resolve, reject) {
    event.preventDefault()
    $.post('./save_self_trip', {
      user_name: user_name,
      trip: "trip0",
      self_departure_country: $('#self_trip select[name=self_departure_country]').val(),
      self_departure_city: $('#self_trip select[name=self_departure_city]').val(),
      self_entry_country: $('#self_trip select[name=self_entry_country]').val(),
      self_entry_city: $('#self_trip select[name=self_entry_city]').val(),
      self_departure_year: $('#self_trip select[name=self_departure_year]').val(),
      self_departure_month: $('#self_trip select[name=self_departure_month]').val(),
      self_departure_date: $('#self_trip select[name=self_departure_date]').val(),
      self_entry_year: $('#self_trip select[name=self_entry_year]').val(),
      self_entry_month: $('#self_trip select[name=self_entry_month]').val(),
      self_entry_date: $('#self_trip select[name=self_entry_date]').val(),
      self_trip_product_list: $('#self_trip select[name=self_trip_product_list]').val(),
      self_luggage_size_list: $('#self_trip select[name=self_luggage_size_list]').val(),
      self_luggage_space_list: $('#self_trip select[name=self_luggage_space_list]').val(),
      self_set_tip: $('#self_trip input[name=self_set_tip]').val(),
    }, (res) => {
      resolve()
    })
  })
}
function show(string) {
  if (string == "register_success") {
    all_display_none()
    state.push("register_success")
    $('#register_success').css({'display':'block'})
  }
  else if(string == "personal_page_my"){
    all_display_none()
    state.push("personal_page_my")
    $('#subpage_title').css({'display':'block'})
    $("#personal_state1").css({'background':'url(https://ppt.cc/frC2Jx@.png) no-repeat left/contain'});
    $('#subpage_title .subpage_word').html(user_name)
    $('#personal_box1 .word1').html(user_name)
    $('#personal_page').css({'display':'block'})
    $('#bm_credit_card').css({'display':'block'})
    $('#bm_edit_personal').css({'display':'block'})
    read_personal_page()
  }
  else if(string == "personal_page_other_green"){
    all_display_none()
    state.push("personal_page_other_green")
    $('#subpage_title').css({'display':'block'})
    $("#personal_state1").css({'background':'url(https://ppt.cc/frC2Jx@.png) no-repeat left/contain'});
    $('#personal_page').css({'display':'block'})
    $('#bm_personal_togood').css({'display':'block'})
    $('#bm_personal_tochat').css({'display':'block'})
    read_personal_page()
  }
  else if(string == "personal_page_other_blue"){
    all_display_none()
    state.push("personal_page_other_blue")
    $('#subpage_title').css({'display':'block','background-color':'#556B94'})
    $("#personal_state1").css({'background':'url(https://ppt.cc/fH0Tyx@.png) no-repeat left/contain'});
    $('#personal_page').css({'display':'block'})
    $('#bm_personal_totrip').css({'display':'block'})
    $('#bm_personal_tochat').css({'display':'block'})
    read_personal_page()
  }
  else if(string == "mainpage_schedule"){
    all_display_none()
    state.push("mainpage_schedule")
    $('#mainpage').css({'display':'block'})
    $('#user_menu').css({'display':'block'})
    $('#menu_bar').css({'display':'flex'})
    $('#selbar').css({'display':'flex'})
    // $('#moreofmine').css({'display':'block'})
    $('#user_menu .user_id').html("username:"+user_name)
    to_mainpage_schedule()
  }
  else if(string == "mainpage_need"){
    all_display_none()
    state.push("mainpage_need")
    $('#mainpage').css({'display':'block'})
    $('#user_menu').css({'display':'block'})
    $('#menu_bar').css({'display':'flex'})
    $('#selbar').css({'display':'flex'})
    // $('#moreofmine').css({'display':'block'})
    $('#user_menu .user_id').html("username:"+user_name)
    to_mainpage_need()
  }
  else if(string == "add_new_journey"){
    all_display_none()
    state.push("add_new_journey")
    $('#add_new_journey').css({'display':'block'})
    $('#user_menu').css({'display':'block'})
    $('#menu_bar').css({'display':'flex'})
  }
  else if(string == "add_new_request"){
    all_display_none()
    state.push("add_new_request")
    $('#add_new_request').css({'display':'block'})
    $('#user_menu').css({'display':'block'})
    $('#menu_bar').css({'display':'flex'})
  }
  /////
  // else if (string == "aft_shopping_cart") {
  //   all_display_none()
  //   state.push("aft_shopping_cart")
  //   $('#aft_shopping_cart').css({ 'display': 'block' })
  //   //$('#subpage_title').css({ 'display': 'block' })
  //   //$('#subpage_title .subpage_word').html("交易清單")
  //   $('#menu_bar').css({ 'display': 'flex' })
  //   //$('#has_customer').css({ 'display': 'block' })
  // }
  else if (string == "accept_case_list") {
    all_display_none()
    state.push("accept_case_list")
    $('#accept_case_list').css({ 'display': 'block' })
    $('#subpage_title').css({ 'display': 'block' })
    $('#aft_shopping_cart').css({ 'display': 'none' })
    $('#subpage_title .subpage_word').html("我的代購清單")
    $('#menu_bar').css({ 'display': 'flex' })
    $('#has_customer').css({ 'display': 'block' })
    accept_case()
  }
  else if (string == "buy_case_list") {
    all_display_none()
    state.push("buy_case_list")
    $('#buy_case_list').css({ 'display': 'block' })
    $('#subpage_title').css({ 'display': 'block' })
    $('#subpage_title').css({ 'background-color': '#556B94' })
    $('#aft_shopping_cart').css({ 'display': 'none' })
    $('#subpage_title .subpage_word').html("我的購物清單")
    $('#menu_bar').css({ 'display': 'flex' })
    $('#has_customer').css({ 'display': 'block' })
    console.log('sssssssssssss')
    buy_case()
  }
  else if(string == "chat_main"){
    all_display_none()
    state.push("chat_main")
    $('#chat_main').css({'display':'block'})
    $('#subpage_title').css({'display':'block'})
    $('#subpage_title .subpage_word').html("聊天紀錄")
    $('#menu_bar').css({'display':'flex'})
  }
  else if(string == "chat_box"){
    all_display_none()
    state.push("chat_box")
    $('#chat_box').css({'display':'block'})
  }
  else if(string == "product_contant"){
    all_display_none()
    state.push("product_contant")
    $('#product_contant').css({'display':'block'})
    $('#user_menu').css({'display':'block'})
    $('#menu_bar').css({'display':'flex'})
  }
  else if(string == "trip_contant"){
    all_display_none()
    state.push("trip_contant")
    $('#trip_contant').css({'display':'block'})
    $('#user_menu').css({'display':'block'})
    $('#menu_bar').css({'display':'flex'})
  }
  else if (string == "self_product") {
    all_display_none()
    state.push("self_product")
    $('#self_product').css({ 'display': 'block' })
    $('#subpage_title').css({'display':'block'})
    $('#subpage_title .subpage_word').html("你的委託商品")
    $('#menu_bar').css({ 'display': 'flex' })
  }
  else if (string == "self_trip") {
    all_display_none()
    state.push("self_trip")
    $('#self_trip').css({ 'display': 'block' })
    $('#subpage_title').css({'display':'block'})
    $('#subpage_title .subpage_word').html("你的行程清單")
    $('#menu_bar').css({ 'display': 'flex' })
  }
  else {
    console.log("changing error.")
  }
}

// homepage
$(document).ready(function() {
  $('#homepage1 button[name="login"]').click((event) => {
    event.preventDefault()
    $.post('./login', {
      account: $('#homepage1 input[name="account"]').val(),
      password: $('#homepage1 input[name="password"]').val(),
    }, (res) => {
      $('#homepage_output1').html(res)
      if(res=="帳號密碼正確"){
        user_name = $('#homepage1 input[name="account"]').val()
        show("mainpage_schedule")
      }
    })
  })

  $('#homepage1 button[name="register"]').click((event) => {
    $('#homepage1').css({'display':'none'})
    $('#homepage2').css({'display':'flex'})
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
      if(res=="註冊成功！"){
        show("register_success")
        user_name = $('#homepage2 input[name="user_name"]').val()
      }
    })
  })

  $('#backto_homepage').click((event) => {
    $('#homepage1').css({'display':'flex'})
    $('#homepage2').css({'display':'none'})
    $('#homepage_output2').html("<br>")
  })

  // register_success
  $('#register_success button[name="to_personal"]').click(function() {
    show("personal_page_my")
  });
  $('#register_success button[name="to_mainpage"]').click(function() {
    show("mainpage_schedule")
  });

  // personal_page
  var edit_state = 0;
  $('#bm_edit_personal').click(async function() {
    if(!edit_state){
      $('#personal_box2 input[type="text"]').attr("disabled", false);
      $('#personal_box2 input[type="text"]').css({'border-bottom':'solid 1px #939191','text-align':'left'})
      $('#personal_box_img #personal_mask').css({'display':'block'})
      $(this).css({'background':'#556B94','color':'#f6f6f6'})
      $(this).text("儲存變更")
      edit_state = 1
    }
    else{
      await save_personal_page()
      $('#personal_box2 input[type="text"]').attr("disabled", true);
      $('#personal_box2 input[type="text"]').css({'border-bottom':'solid 1px #F7F7F7','text-align':'right'})
      $('#personal_box_img #personal_mask').css({'display':'none'})
      $(this).css({'background':'#E8E8E8','color':'#000000'})
      $(this).text("編輯內容")
      edit_state = 0
    }
  });
  // 選不要儲存變更
  $("#personal_page_unsaved .deal_no").click(function() {
    $("#personal_page_unsaved").css({'display':'none'});
  });
  // 選同意儲存變更
  $("#personal_page_unsaved .deal_yes").click(async function() {
    $("#personal_page_unsaved").css({'display':'none'});
    await save_personal_page()
    state.pop()
    show(state.pop())
    $('#personal_box2 input[type="text"]').attr("disabled", true);
      $('#personal_box2 input[type="text"]').css({'border-bottom':'solid 1px #F7F7F7','text-align':'right'})
      $('#personal_box_img #personal_mask').css({'display':'none'})
      $('#bm_edit_personal').css({'background':'#E8E8E8','color':'#000000'})
      $('#bm_edit_personal').text("編輯內容")
    edit_state = 0
  });
  // 改變個人頭像
  $('#personal_box_img #personal_mask').click(function() {
    $('#change_personal_img').css({'display':'flex'})
    $('#change_img_box').css({'display':'flex'})
  });
  $('#personal_box_img #personal_img').click(function() {
    if(edit_state){
      $('#change_personal_img').css({'display':'flex'})
      $('#change_img_box').css({'display':'flex'})
  }
  });
  $('#change_personal_img').click(function() {
    $(this).css({'display':'none'})
    $('#upload_img_box').css({'display':'none'})
  });
  $("#change_img_box").click(function(event){ 
    event.stopPropagation(); 
  });
  $("#upload_img_box").click(function(event){ 
    event.stopPropagation(); 
  });
  $('#change_img1').click(function(event){ 
    $('#upload_file').click()
  });
  $('#change_img2').click(function(event){ 
    $('#camera_file').click()
  });

  // 上傳照片
  var $uploadCrop_circle;
  var $uploadCrop_square;
  var selectedFiles; // 用於存儲選擇的多個檔案
  var currentIndex; // 當前處理的檔案索引
  var product_img = [];

  function readFile(input,num) {
    product_img = [];
    selectedFiles = [];
    currentIndex = 0;
    if (input.files && input.files[0]) {
      uploadCrop = (num == 1)? $uploadCrop_circle:$uploadCrop_square;
      selectedFiles = input.files; // 將選擇的檔案存儲到selectedFiles陣列中
      showNextImage(); // 顯示下一個檔案的圖片並開始裁剪
    } else {
      alert("抱歉，你的瀏覽器不支援FileReader API");
    }
  }
  function showNextImage() {
    var reader = new FileReader();
    reader.onload = function (e) {
      uploadCrop.croppie("bind", {
        url: e.target.result
      });
    }
    reader.readAsDataURL(selectedFiles[currentIndex]);
  }
  function cropAndUpload() {
    return new Promise(function(resolve, reject) {
      uploadCrop.croppie("result", "blob").then(function (blob) {
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
            if(uploadCrop == $uploadCrop_circle){
              $('#personal_img').css({'background':'url('+response.url+') no-repeat center/contain'})
              $.post('./store_personal_img', {
                name: user_name,
                url: response.url,
              },{})
            }
            else{
              product_img.push(response.url)
            }
            currentIndex++; // 將索引指向下一個檔案
            if(currentIndex < selectedFiles.length) {
              showNextImage(); // 顯示下一個檔案的圖片並開始裁剪
            }
            else{
              console.log("所有圖片上傳完成！");
              resolve();
            }
          },
          error: function (error) {
            console.log("圖片上傳失敗：", error);
            reject()
          }
        });
      });
    })
  }
  $uploadCrop_circle = $('#upload_demo').croppie({
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
  $uploadCrop_square = $('#aaa_demo').croppie({
    viewport: {
      width: 250,
      height: 139,
      type: 'square'
    },
    boundary: {
      width: 250,
      height: 200
    },
    showZoomer: false,
  });
  // 上傳個人照片
  $('#upload_file').on('change', function () {
    $('#change_img_box').css({'display':'none'})
    $('#upload_img_box').css({'display':'flex'})
    readFile(this,1);
  });
  $('#camera_file').on('change', function () {
    $('#change_img_box').css({'display':'none'})
    $('#upload_img_box').css({'display':'flex'})
    readFile(this,1);
  });
  $('#upload_result').on('click', function (ev) {
    cropAndUpload();
    $('#change_personal_img').css({'display':'none'});
    $('#upload_img_box').css({'display':'none'});
  });

  // 上傳商品照片
  $('#upload_product_img').click(function() {
    $(this).css({'display':'none'})
  });
  $("#upload_product_box").click(function(event){ 
    event.stopPropagation(); 
  });
  $('#upload_product_picture').click(function(event){ 
    $('#aaa_file').click()
  });
  $('#aaa_file').on('change', function () {
    $('#upload_product_img').css({'display':'flex'})
    readFile(this,2);
  });
  $('#aaa_result').on('click', async function (ev) {
    await cropAndUpload();
    $('#upload_product_img').css({'display':'none'});
  });

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
    show("chat_box")
  });
  $('#mainpage').on('click', '#show_schedule :nth-child(n) .chat_no', function(){
    var nn = $(this).parent().parent().parent().attr('class')
    let ss = nn.split(/\s/);
    console.log(ss[0]) // user1
    console.log(ss[1]) // trip0

    event.preventDefault()
    $.post('./trip_contant', {
      user_name: ss[0],
      trip: ss[1],
    }, (data) => {
      $('#seller_name').html(ss[0])
      console.log(data)
      console.log(data[6])
      $('#seller_departure_country').html(data[0])
      $('#seller_departure_city').html(data[1])
      $('#seller_entry_country').html(data[2])
      $('#seller_entry_city').html(data[3])
      $('#seller_departure_year').html(data[4])
      $('#seller_departure_month').html(data[5])
      $('#seller_departure_date').html(data[6])
      $('#seller_entry_year').html(data[7])
      $('#seller_entry_month').html(data[8])
      $('#seller_entry_date').html(data[9])
      $('#seller_product_list').html(data[10])

      if (data[11]=='20') { $('#seller_luggage_size_list').html('20吋以下') }
      else if (data[11]=='21') { $('#seller_luggage_size_list').html('21~24吋') }
      else if (data[11]=='25') { $('#seller_luggage_size_list').html('25~28吋') }
      else if (data[11]=='29') { $('#seller_luggage_size_list').html('29吋以上') }
      
      $('#seller_luggage_space_list').html(data[12]+'%')

      index = data[12];
      if(index=="20"){$("#seller_big_luggage").attr("src","https://ppt.cc/flWv0x@.png");}
      else if(index=="40"){ $("#seller_big_luggage").attr("src","https://ppt.cc/fyz1fx@.png"); }
      else if(index=="60"){ $("#seller_big_luggage").attr("src","https://ppt.cc/faeuHx@.png"); }
      else if(index=="80"){ $("#seller_big_luggage").attr("src","https://ppt.cc/fOwTNx@.png"); }
      else if(index=="100"){ $("#seller_big_luggage").attr("src","https://ppt.cc/fbY02x@.png"); }

      $('#seller_set_tip').html(data[13]+" NTD")
      $('#seller_profile_img').attr("src",data[14])
      
      if(data[2]=="台灣"){$("#seller_trip_img").attr("src","https://ppt.cc/fa7zlx@.png");}
      else if(data[2]=="日本"){ $("#seller_trip_img").attr("src","https://ppt.cc/fS5lRx@.png"); }
      else if(data[2]=="韓國"){ $("#seller_trip_img").attr("src","https://ppt.cc/fDrVBx@.png"); }
      else if(data[2]=="中國"){ $("#seller_trip_img").attr("src","https://ppt.cc/fhGq4x@.png"); }
      else if(data[2]=="美國"){ $("#seller_trip_img").attr("src","https://ppt.cc/f8cxwx@.png"); }
      else if(data[2]=="法國"){ $("#seller_trip_img").attr("src","https://ppt.cc/f2ejAx@.png"); }
      else if(data[2]=="德國"){ $("#seller_trip_img").attr("src","https://ppt.cc/fdBU1x@.png"); }
    })

    show("trip_contant")
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
  $('#mainpage').on('click', '#show_need :nth-child(n) .chat_no', function(){
    var nn = $(this).parent().parent().parent().attr('class')
    let ss = nn.split(/\s/);
    console.log(ss[0]) // user1
    console.log(ss[1]) // product0

    event.preventDefault()
    $.post('./product_contant', {
      user_name: ss[0],
      product: ss[1],
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
      $('#buyer_profile_img').attr("src",data[13])

      add_product_img_num = 0;
      for(var i=14; i < data.length; i++){
        add_product_img[add_product_img_num] = data[i];
        add_product_img_num++;
      }

      if(add_product_img[0]){
        $('#buyer_product_img').attr("src", add_product_img[0])
        add_product_img_state = 0;
      }
      
    })

    show("product_contant")
  });

  // schedule 代購者頁面
  $('#user_menu .shopping_bag').click((event) => {
    if(state[state.length-1] == "mainpage_schedule")
      show("mainpage_need")
  })
  $('#bm_add_schedule').click((event) => {
    if(state[state.length-1] == "mainpage_schedule"){
      show("add_new_journey")
    }
  })
  // need 購買者頁面
  $('#user_menu .mid_luggage').click((event) => {
    if(state[state.length-1] == "mainpage_need")
      show("mainpage_schedule")
  })
  $('#bm_add_schedule').click((event) => {
    if(state[state.length-1] == "mainpage_need"){
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
    $('#aft_shopping_cart').css({'display':'flex'})
    $('#aft_shopping_cart_box').css({'display':'flex'})
    // $('#aft_shopping_cart').css({ 'display': 'block' })
  })
  $("#aft_shopping_cart").click(function(event){ 
    $('#aft_shopping_cart').css({'display':'none'})
  });
  $("#aft_shopping_cart_box").click(function(event){ 
    event.stopPropagation(); 
  });

  $('#aft_shopping_cart .to_sellist').click((event) => {
    show("accept_case_list")
  })
  ///////////////////////////
  $('#aft_shopping_cart .to_buylist').click((event) => {
    show("buy_case_list")
  })


  $('#menu_bar .chat_list').click((event) => {
    show("chat_main")
  })
  // subpage
  $('#subpage_title .case_back_button').click((event) => {
    if(state[state.length-1] == "personal_page_my" && edit_state){
      $('#personal_page_unsaved').css({'display':'flex'})
    }
    else if(state[state.length-1] == "self_product" && edit_product_state){
      $('#self_product_page_unsaved').css({'display':'flex'})
    }
    else if(state[state.length-1] == "self_trip" && edit_trip_state){
      $('#self_trip_page_unsaved').css({'display':'flex'})
    }
    else{
      state.pop()
      show(state.pop())
    }
  })
  // // accept_case_list
  // var check_state1 = 0;
  // $(".cus_list_check1").click(function() {
  //   if(check_state1 == 0)
  //   {
  //     $('.cus_list_check1').css({'opacity':'1'});
  //     check_state1 = 1;
  //   }
  //   else if(check_state1 == 1)
  //   {
  //     $('.cus_list_check1').css({'opacity':'0'});
  //     check_state1 = 0;
  //   }
  // });
  // var check_state2 = 0;
  // $(".cus_list_check2").click(function() {
  //   if(check_state2 == 0)
  //   {
  //     $('.cus_list_check2').css({'opacity':'1'});
  //     check_state2 = 1;
  //   }
  //   else if(check_state2 == 1)
  //   {
  //     $('.cus_list_check2').css({'opacity':'0'});
  //     check_state2 = 0;
  //   }
  // });
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
  $('#product_place_country').change(function(){
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
    console.log(product_img)
    $.get('./request_data', {
      user_name: user_name,
      shipping_address_country: $('#request_data select[name=shipping_address_country]').val(),
      shipping_address_city: $('#request_data select[name=shipping_address_city]').val(),
      product_place_country: $('#request_data select[name=product_place_country]').val(),
      product_place_city: $('#request_data select[name=product_place_city]').val(),
      product_arrive_year: $('#request_data select[name=product_arrive_year]').val(),
      product_arrive_month: $('#request_data select[name=product_arrive_month]').val(),
      product_arrive_date: $('#request_data select[name=product_arrive_date]').val(),
      set_product_name: $('#request_data input[name=set_product_name]').val(),
      set_shop_name: $('#request_data input[name=set_shop_name]').val(),
      set_shop_address: $('#request_data input[name=set_shop_address]').val(),
      request_product_list: $('#request_data select[name=request_product_list]').val(),
      set_product_quantity: $('#request_data input[name=set_product_quantity]').val(),
      request_remark: $('#request_data input[name=request_remark]').val(),
      product_img: product_img,
      //ID: $('#add input[name=ID]').val(), //前面的fname和ser.js的req.query.fname為同者 後面的fname和exercise.html的name=fname為同者
      //name: $('#add input[name=name]').val(),
    }, (data) => {
      show("mainpage_need")
      //$('#add-output').html(data) //讓html中#ajax-output那段的內容變更為data的內容
    })
  })


  //product contant page
  $('.right_arrow').click((event) => {
    if(add_product_img_state < (add_product_img.length-1)){
      add_product_img_state = add_product_img_state+1;
    }
    else {
      add_product_img_state = 0;
    }
    console.log(add_product_img_state)
    console.log(add_product_img[add_product_img_state])
    $('#buyer_product_img').attr("src", add_product_img[add_product_img_state])
    $('#self_product_img').attr("src", add_product_img[add_product_img_state])
  })

  $('.left_arrow').click((event) => {
    if(add_product_img_state == 0){
      add_product_img_state = add_product_img.length-1;
    }
    else {
      add_product_img_state = add_product_img_state - 1;
    }
    console.log(add_product_img_state)
    console.log(add_product_img[add_product_img_state])
    $('#buyer_product_img').attr("src", add_product_img[add_product_img_state])
    $('#self_product_img').attr("src", add_product_img[add_product_img_state])
  })

/* 等著換觸發條件 不要刪掉！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
  //self_product_page
  $('#user_menu .bell').click(function () {

    event.preventDefault()
      $.post('./read_self_product', {
        user_name: user_name,
        product: "product0",
      }, (data) => {
        console.log(data)
        console.log(data[2])
        console.log(data[8])
        $('#self_set_product_name').val(data[0])
        $('#self_product_place_country').val(data[1])

        if(data[1]=="台灣"){index = 1;}
        else if(data[1]=="日本"){index = 2;}
        else if(data[1]=="韓國"){index = 3;}
        else if(data[1]=="中國"){index = 4;}
        else if(data[1]=="美國"){index = 5;}
        else if(data[1]=="法國"){index = 6;}
        else if(data[1]=="德國"){index = 7;}
        var Sinner='';
        for(var i=0;i<city[index].length;i++){
            Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
        }
        $('#self_product_place_city').html(Sinner);
        $('#self_product_place_city').val(data[2])

        $('#self_set_shop_name').val(data[3])
        $('#self_set_shop_address').val(data[4])
        $('#self_product_list').val(data[5])
        $('#self_set_product_quantity').val(data[6])
        $('#self_shipping_address_country').val(data[7])

        if(data[7]=="台灣"){index = 1;}
        else if(data[7]=="日本"){index = 2;}
        else if(data[7]=="韓國"){index = 3;}
        else if(data[7]=="中國"){index = 4;}
        else if(data[7]=="美國"){index = 5;}
        else if(data[7]=="法國"){index = 6;}
        else if(data[7]=="德國"){index = 7;}
        Sinner='';
        for(var i=0;i<city[index].length;i++){
            Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
        }
        $('#self_shipping_address_city').html(Sinner);
        $('#self_shipping_address_city').val(data[8])

        $('#self_product_arrive_year').val(data[9])
        $('#self_product_arrive_month').val(data[10])

        index = data[10]; //從1開始 第幾個選項(數字)
        Sinner='';
        if(index=='1' || index=='3' || index=='5' || index=='7' || index=='8' || index=='10' || index=='12'){
            for(var i=1;i<=31;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        else if(index=='4' || index=='6' || index=='9' || index=='11'){
            for(var i=1;i<=30;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        else if(index=='2'){
            for(var i=1;i<=28;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        $('#self_product_arrive_date').html(Sinner);
        $('#self_product_arrive_date').val(data[11])

        $('#self_request_remark').val(data[12])
        add_product_img_num = 0;
        for(var i=13; i < data.length; i++){
          add_product_img[add_product_img_num] = data[i];
          add_product_img_num++;
        }
  
        if(add_product_img[0]){
          $('#self_product_img').attr("src", add_product_img[0])
          add_product_img_state = 0;
        }
        
      })
    show("self_product")
  });

  $('#self_product_place_country').change(function(){
      index=this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      for(var i=0;i<city[index].length;i++){
          Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
      }
      $('#self_product_place_city').html(Sinner);
  });

  $('#self_shipping_address_country').change(function(){
      index=this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      for(var i=0;i<city[index].length;i++){
          Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
      }
      $('#self_shipping_address_city').html(Sinner);
  });

  $('#self_product_arrive_month').change(function(){
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

      $('#self_product_arrive_date').html(Sinner);
  });

  var edit_product_state = 0;
  $('#edit_self_product').click(async function () {
    if (!edit_product_state) {
      $('#self_product input[type="text"]').attr("disabled", false);
      $('#self_product input[type="text"]').css({ 'border-bottom': 'solid 1px #939191'})
      $('#self_product select').attr("disabled", false);
      $('#self_product_img_place #self_product_img_mask').css({ 'display': 'block' })
      $(this).text("儲存變更")
      edit_product_state = 1
    }
    else {
      await save_self_product_page()
      $('#self_product input[type="text"]').attr("disabled", true);
      $('#self_product input[type="text"]').css({ 'border': 'solid 1px #F7F7F7'})
      $('#self_product select').attr("disabled", true);
      $('#self_product_img_place #self_product_img_mask').css({ 'display': 'none' })
      $(this).text("編輯內容")
      edit_product_state = 0
    }
  });
  
  // 選不要儲存變更
  $("#self_product_page_unsaved .deal_no").click(function () {
    $("#self_product_page_unsaved").css({ 'display': 'none' });
  });
  // 選同意儲存變更
  $("#self_product_page_unsaved .deal_yes").click(async function () {
    $("#self_product_page_unsaved").css({ 'display': 'none' });
    await save_self_product_page()
    state.pop()
    show(state.pop())
    $('#self_product input[type="text"]').attr("disabled", true);
    $('#self_product input[type="text"]').css({ 'border-bottom': 'solid 1px #F7F7F7'})
    $('#self_product select').attr("disabled", true);
    $('#self_product_img_place #self_product_img_mask').css({ 'display': 'none' })
    $('#edit_self_product').text("編輯內容")
    edit_product_state = 0;
  });
*/

  //self_trip_page
  $('#user_menu .bell').click(function () {

    event.preventDefault()
      $.post('./read_self_trip', {
        user_name: user_name,
        trip: "trip0",
      }, (data) => {
        console.log(data)
        console.log(data[2])
        console.log(data[8])
        $('#self_departure_country').val(data[0])

        if(data[0]=="台灣"){index = 1;}
        else if(data[0]=="日本"){index = 2;}
        else if(data[0]=="韓國"){index = 3;}
        else if(data[0]=="中國"){index = 4;}
        else if(data[0]=="美國"){index = 5;}
        else if(data[0]=="法國"){index = 6;}
        else if(data[0]=="德國"){index = 7;}
        var Sinner='';
        for(var i=0;i<city[index].length;i++){
            Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
        }
        $('#self_departure_city').html(Sinner);
        $('#self_departure_city').val(data[1])

        $('#self_entry_country').val(data[2])
        if(data[2]=="台灣"){$("#self_trip_img").attr("src","https://ppt.cc/fa7zlx@.png");}
        else if(data[2]=="日本"){ $("#self_trip_img").attr("src","https://ppt.cc/fS5lRx@.png"); }
        else if(data[2]=="韓國"){ $("#self_trip_img").attr("src","https://ppt.cc/fDrVBx@.png"); }
        else if(data[2]=="中國"){ $("#self_trip_img").attr("src","https://ppt.cc/fhGq4x@.png"); }
        else if(data[2]=="美國"){ $("#self_trip_img").attr("src","https://ppt.cc/f8cxwx@.png"); }
        else if(data[2]=="法國"){ $("#self_trip_img").attr("src","https://ppt.cc/f2ejAx@.png"); }
        else if(data[2]=="德國"){ $("#self_trip_img").attr("src","https://ppt.cc/fdBU1x@.png"); }

        if(data[2]=="台灣"){index = 1;}
        else if(data[2]=="日本"){index = 2;}
        else if(data[2]=="韓國"){index = 3;}
        else if(data[2]=="中國"){index = 4;}
        else if(data[2]=="美國"){index = 5;}
        else if(data[2]=="法國"){index = 6;}
        else if(data[2]=="德國"){index = 7;}
        Sinner='';
        for(var i=0;i<city[index].length;i++){
            Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
        }
        $('#self_entry_city').html(Sinner);
        $('#self_entry_city').val(data[3])

        $('#self_departure_year').val(data[4])
        $('#self_departure_month').val(data[5])

        index = data[5]; //從1開始 第幾個選項(數字)
        Sinner='';
        if(index=='1' || index=='3' || index=='5' || index=='7' || index=='8' || index=='10' || index=='12'){
            for(var i=1;i<=31;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        else if(index=='4' || index=='6' || index=='9' || index=='11'){
            for(var i=1;i<=30;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        else if(index=='2'){
            for(var i=1;i<=28;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        $('#self_departure_date').html(Sinner);
        $('#self_departure_date').val(data[6])

        $('#self_entry_year').val(data[7])
        $('#self_entry_month').val(data[8])

        index = data[8]; //從1開始 第幾個選項(數字)
        Sinner='';
        if(index=='1' || index=='3' || index=='5' || index=='7' || index=='8' || index=='10' || index=='12'){
            for(var i=1;i<=31;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        else if(index=='4' || index=='6' || index=='9' || index=='11'){
            for(var i=1;i<=30;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        else if(index=='2'){
            for(var i=1;i<=28;i++){
                Sinner=Sinner+'<option value='+i+'>'+i+"日"+'</option>';
            }
        }
        $('#self_entry_date').html(Sinner);
        $('#self_entry_date').val(data[9])

        $('#self_trip_product_list').val(data[10])
        $('#self_luggage_size_list').val(data[11])
        $('#self_luggage_space_list').val(data[12])
        
        index = data[12];
        if(index=="20"){$("#self_big_luggage").attr("src","https://ppt.cc/flWv0x@.png");}
        else if(index=="40"){ $("#self_big_luggage").attr("src","https://ppt.cc/fyz1fx@.png"); }
        else if(index=="60"){ $("#self_big_luggage").attr("src","https://ppt.cc/faeuHx@.png"); }
        else if(index=="80"){ $("#self_big_luggage").attr("src","https://ppt.cc/fOwTNx@.png"); }
        else if(index=="100"){ $("#self_big_luggage").attr("src","https://ppt.cc/fbY02x@.png"); }

        $('#self_set_tip').val(data[13])


        
      })
    show("self_trip")
  });

  $('#self_departure_country').change(function(){
      index=this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      for(var i=0;i<city[index].length;i++){
          Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
      }
      $('#self_departure_city').html(Sinner);
  });

  $('#self_entry_country').change(function(){
      index=this.selectedIndex; //從1開始 第幾個選項(數字)
      var Sinner='';
      for(var i=0;i<city[index].length;i++){
          Sinner=Sinner+'<option value='+city[index][i]+'>'+city[index][i]+'</option>';
      }
      $('#self_entry_city').html(Sinner);

      if(index==1){$("#self_trip_img").attr("src","https://ppt.cc/fa7zlx@.png");}
      else if(index==2){ $("#self_trip_img").attr("src","https://ppt.cc/fS5lRx@.png"); }
      else if(index==3){ $("#self_trip_img").attr("src","https://ppt.cc/fDrVBx@.png"); }
      else if(index==4){ $("#self_trip_img").attr("src","https://ppt.cc/fhGq4x@.png"); }
      else if(index==5){ $("#self_trip_img").attr("src","https://ppt.cc/f8cxwx@.png"); }
      else if(index==6){ $("#self_trip_img").attr("src","https://ppt.cc/f2ejAx@.png"); }
      else if(index==7){ $("#self_trip_img").attr("src","https://ppt.cc/fdBU1x@.png"); }
  });

  $('#self_departure_month').change(function(){
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

      $('#self_departure_date').html(Sinner);
  });

  $('#self_entry_month').change(function(){
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

      $('#self_entry_date').html(Sinner);
  });

  $('#self_luggage_space_list').change(function(){
    index = this.selectedIndex; //從1開始 第幾個選項(數字)
    if(index==1){
        $("#self_big_luggage").attr("src","https://ppt.cc/flWv0x@.png");
    }
    else if(index==2){
        $("#self_big_luggage").attr("src","https://ppt.cc/fyz1fx@.png");
    }
    else if(index==3){
        $("#self_big_luggage").attr("src","https://ppt.cc/faeuHx@.png");
    }
    else if(index==4){
        $("#self_big_luggage").attr("src","https://ppt.cc/fOwTNx@.png");
    }
    else if(index==5){
        $("#self_big_luggage").attr("src","https://ppt.cc/fbY02x@.png");
    }
  });

  var edit_trip_state = 0;
  $('#edit_self_trip').click(async function () {
    if (!edit_trip_state) {
      $('#self_trip input[type="text"]').attr("disabled", false);
      $('#self_trip input[type="text"]').css({ 'border-bottom': 'solid 1px #939191'})
      $('#self_trip select').attr("disabled", false);
      $(this).text("儲存變更")
      edit_trip_state = 1
    }
    else {
      await save_self_trip_page()
      $('#self_trip input[type="text"]').attr("disabled", true);
      $('#self_trip input[type="text"]').css({ 'border': 'solid 1px #F7F7F7'})
      $('#self_trip select').attr("disabled", true);
      $(this).text("編輯內容")
      edit_trip_state = 0
    }
  });
  
  // 選不要儲存變更
  $("#self_trip_page_unsaved .deal_no").click(function () {
    $("#self_trip_page_unsaved").css({ 'display': 'none' });
  });
  // 選同意儲存變更
  $("#self_trip_page_unsaved .deal_yes").click(async function () {
    $("#self_trip_page_unsaved").css({ 'display': 'none' });
    await save_self_trip_page()
    state.pop()
    show(state.pop())
    $('#self_trip input[type="text"]').attr("disabled", true);
    $('#self_trip input[type="text"]').css({ 'border-bottom': 'solid 1px #F7F7F7'})
    $('#self_trip select').attr("disabled", true);
    $('#edit_self_trip').text("編輯內容")
    edit_trip_state = 0;
  });
  

  const socket = io();

// chat_box
//function appendMessage
//把message加到畫面上
const appendMessage = (message, isSelf) => {
  const div = document.createElement('div');
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;

  messageDiv.classList.add('message');

  if (isSelf) {
    div.classList.add('self');
  } else {
    div.classList.add('other');
  }
  div.appendChild(messageDiv);
  $('#chat_content').append(div);
}


//用ajax的方法把聊天紀錄補出來
//loadChatHistory();
const loadChatHistory = () => {
  $.get('/chat_history', (data) => {
    const chatRecords = JSON.parse(data);
    const allMessages = [];

    for (const username in chatRecords.users) {
      const messages = chatRecords.users[username] || [];
      const isSelf = (username === user_name);

      messages.forEach((message) => {
        allMessages.push({ ...message, isSelf });
      });
    }

    allMessages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    allMessages.forEach((message) => {
      appendMessage(message.message, message.isSelf);
    });
  });
};


$('.chat_yes').click(function() {
  loadChatHistory();
});


// 清空聊天內容的函式
const clearChatContent = () => {
  $('#chat_content').empty();
};

  //一個傳送訊息的函数
  const sendMessage = () => {
    const message = $('#chat_box input[name="msg-input"]').val();
    if (message.trim() !== '') {
      const chatData = {
        user_name: user_name,
        timestamp: new Date().toISOString(),
        message: message
      };
      socket.emit('chat message', chatData);
      $('#chat_box input[name="msg-input"]').val('');
    }
  }
  
  //按下傳送後傳送訊息
  $('#chat_box button[name="chat_submit"]').click((event) => {
    event.preventDefault();
    sendMessage();
  });
  socket.on('chat message', (chatData) => {
    // appendMessage(msg);
    appendMessage(chatData.message, chatData.user_name === user_name);
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
    clearChatContent();
    state.pop()
    show(state.pop())
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
    $("#blank").css({'display':'block'});
    $("#blank2").css({'display':'block'});
});

//let select bar disappear
$('#blank').click(function() {
  $("#choose").css({'display':'none'});
  $("#blank").css({'display':'none'});
  $("#blank2").css({'display':'none'});
});
$('#blank2').click(function() {
  $("#choose").css({'display':'none'});
  $("#blank").css({'display':'none'});
  $("#blank2").css({'display':'none'});
});

$('#select_checkbox1').click(function() {
  choose_box1=1;
  $("#select_check1").css({'display':'block'});
});
$('#select_check1').click(function() {
  choose_box1=0;
  $("#select_check1").css({'display':'none'});
  console.log( 'state'+choose_box1)
});
$('#select_checkbox2').click(function() {
  choose_box2=1;
  $("#select_check2").css({'display':'block'});
});
$('#select_check2').click(function() {
  choose_box2=0;
  $("#select_check2").css({'display':'none'});
});
$('#select_checkbox3').click(function() {
  choose_box3=1;
  $("#select_check3").css({'display':'block'});
});
$('#select_check3').click(function() {
  choose_box3=0;
  $("#select_check3").css({'display':'none'});
});
$('#select_checkbox4').click(function() {
  choose_box4=1;
  $("#select_check4").css({'display':'block'});
});
$('#select_check4').click(function() {
  choose_box4=0;
  $("#select_check4").css({'display':'none'});
});
// $('#cho_submit').click(function() {
//   cho_submit=1;
//   $("#choose").css({'display':'none'});
//   show("mainpage_schedule")
// });
// $('#cho_reset').click(function() {
//   //cho_submit=1;
//   $("#choose").css({'display':'none'});
//   show("mainpage_schedule")
  
// });

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