const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const message = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');
const name = sessionStorage.getItem('username');

appendMessage('You joined!');

socket.emit('new-user', name);

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
  socket.emit('send-chat-message', message.value);
  appendMessage(`${name}: ${message.value}`);
  message.value = '';
});

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
