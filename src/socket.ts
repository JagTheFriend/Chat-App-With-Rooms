import { Server } from 'socket.io';

const users = {};
export function handleSocketIo(io: Server) {
  io.on('connect', socket => {
    socket.on('send-chat-message', (message: string) => {
      socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
    });

    socket.on('new-user', (name: string) => {
      users[socket.id] = name;
      socket.broadcast.emit('user-connected', name);
    });

    socket.on('disconnect', () => {
      const name: string = users[socket.id];
      delete users[socket.id];
      socket.broadcast.emit('user-disconnect', name);
    });
  });
}
