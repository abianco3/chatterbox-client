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
      app.renderMessage(message);
      console.log('send worked', data);
    },
    error: function(data) {
      console.error('message failed?', data);
    }
  });
};

app.fetch = function(params) {
  $.ajax({
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    contentType: 'application/json',
    data: params,
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
  var $username = $('<h4 class="username"></h4>');
  $username.append(document.createTextNode(message.username));
  $username.addClass(message.username);
  var $text = $('<p></p>');
  $text.append(document.createTextNode(message.text));
  $tweet.append($username);
  $tweet.append($text);
  $('#chats').prepend($tweet);
  $('.username').on('click', app.handleUsernameClick);
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<option>' + roomName + '</option>');
};

app.handleUsernameClick = function() {
  // var $class = $(this).attr('class');
  // console.log($class);
  // //$(this).addClass('friend');
  // $('.' + $class).addClass('friend');

  var grabClasses = $(this).attr('class');
  var split = grabClasses.split(' ');
  var name = '.' + split[1];
  $(name).addClass('friend');

};

app.handleSubmit = function(event) {
  var message = {};
  message.username = window.username;
  message.text = $('#message').val();
  message.roomname = $('#roomSelect').val();
  console.log(message);
  this.send(message);
  return false;
};

document.addEventListener('DOMContentLoaded', function() {
  $('.submit').on('click', this.handleSubmit.bind(this));
  this.fetch({order: '-createdAt'});
  var urlParams = window.location.search.split('=');
  window.username = urlParams[urlParams.length - 1];
  console.log(username);
}.bind(app));

