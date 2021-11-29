import { Server } from 'socket.io';
export function handleSocketIo(io: Server) {
  io.on('connect', socket => {
    socket.on('send-chat-message', (message: string) => {
      socket.broadcast.emit('chat-message', message);
    });
  });
}
