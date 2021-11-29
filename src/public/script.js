const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container');
const message = document.getElementById('message-input');

socket.on('chat-message', data => {
  console.log(data);
});

messageForm.addEventListener('submit', event => {
  event.preventDefault();
  socket.emit('send-chat-message', message.value);
  message.value = '';
});
