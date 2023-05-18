
$(document).ready(function(){
  const socket = io();

  //function appendMessage
  //把message加到畫面上
  //
  
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
    $('#content').append(div);
  }
  
  //用ajax的方法把聊天紀錄補出來
  //loadChatHistory();
  const loadChatHistory = () => {
    $.get('/chat_history', (data) => {
      const messages = data.trim().split('\n');
      messages.forEach((message) => {
        appendMessage(message);
      });
    });
  };

  loadChatHistory();
                                
  
  //一個傳送訊息的函数
  const sendMessage = () => {
    const message = $('#msg-input').val();
    if (message.trim() !== '') {
      
      socket.emit('chat message', message);
      $('#msg-input').val('');
    }
  }
  
  //按下傳送後傳送訊息
  $('#msg-form').submit((e) => {
    e.preventDefault();
    sendMessage();
  });

  socket.on('chat message', (msg) => {
    appendMessage(msg);
  });


  //按下傳送訊息後，聊天紀錄會自動跑到最下面
  const content = document.querySelector('#content');

  function scrollToBottom() {
    content.scrollTop = content.scrollHeight;
  }

  const form = document.querySelector('#msg-form');
  if (form) {
    form.addEventListener('submit', scrollToBottom);
  } else {
    console.error('Could not find #msg-form element');
  }
  
  if (content) {
    content.addEventListener('DOMNodeInserted', scrollToBottom);
  } else {
    console.error('Could not find #content element');
  }

  $('.back').click(function(){
    $('body').transition('fade left');
  })

  $('#deal').click((event) => {
    $.get('./to_deal', (data) => {})
    $(location).attr('href','http://luffy.ee.ncku.edu.tw:9444/index1.html')
  });

  $('#back').click((event) => {
    $.get('./to_chatlist', (data) => {})
    $(location).attr('href','http://luffy.ee.ncku.edu.tw:9444/index1.html')
  });

})
