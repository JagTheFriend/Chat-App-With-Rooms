const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const message = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const roomId = window.location.href.split('/')[4];
var username = sessionStorage.getItem('username');

if (username == undefined) {
  while (true) {
    username = prompt('Please enter your username: ');
    if (username.split(' ').join('')) break;
  }
}

appendMessage('You joined!');
fetch(`/chat/messages/${roomId}`, { method: 'POST' })
  .then(data => data.json())
  .then(data => {
    for (chatMessage of data.messages) {
      appendMessage(`${chatMessage.author}: ${chatMessage.content}`);
    }
  });

socket.emit('new-user', roomId, username);

socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', name => {
  appendMessage(`${name} connected!`);
});

socket.on('user-disconnect', name => {
  appendMessage(`${name} disconnected!`);
});

messageForm.addEventListener('submit', event => {
  event.preventDefault();
  socket.emit('send-chat-message', roomId, username, message.value);
  appendMessage(`${username}: ${message.value}`);
  message.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
