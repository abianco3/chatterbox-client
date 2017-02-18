// YOUR CODE HERE:
//http://parse.sfm8.hackreactor.com/chatterbox/classes/messages

const app = {
  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages'
};

app.init = function() {};

app.send = function(message) {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function(data) {
      console.log('send worked', data);
    },
    error: function(data) {
      console.error('message failed?', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    success: (data) => {
      console.log('fetch worked', data);
      data.results.forEach((message, index) => {
        this.renderMessage(message);
      });
    },
    error: function(data) {
      console.error('failed ', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').children().remove();
};

app.renderMessage = function(message) {
  // var newUsername = '<div class="chat username">' + message.username + '</div>';
  // var newMessage = '<div class="chat">' + newUsername + message.text + '</div>';
  var $tweet = $('<div class="chat"></div>');
  var $username = $('<h4 class="username">' + message.username + '</h4>');
  var $text = $('<p>' + message.text + '</p>');
  $tweet.append($username);
  $tweet.append($text);
  $('#chats').prepend($tweet);
  $('.username').on('click', app.handleUsernameClick);
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<option>' + roomName + '</option>');
};

app.handleUsernameClick = function() {
  $(this).addClass('friend');
};

app.handleSubmit = function() {
  
  var message = {};
  message.username = /username=?[.]/.match(window.location.search).replace('username=', '');
  message.text = $('.message').value;
  message.roomname = $('#roomSelect').value;
  $(this).send(message);
};

$('.send').on('click', app.handleSubmit);

