import { Server } from 'socket.io';
export function handleSocketIo(io: Server) {
  io.on('connect', socket => {
    socket.emit('chat-message', 'hello world');
  });
}
