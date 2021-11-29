import { Server } from 'socket.io';

function handleSocketIo_(io: Server) {
  io.on('connect', socket => {
    socket.on('new-user', (roomId: string) => {
      socket.join(roomId);
      socket.to(roomId).emit('user-connected', 'jag');
    });

    socket.on('send-chat-message', (roomId: string, message: string) => {
      console.log(message);
      socket.to(roomId).emit('chat-message', { message: message, name: 'jag' });
    });

    socket.on('disconnect', () => {
      socket.broadcast.emit('user-disconnect', 'jag');
    });
  });
}

export class handleSocketIo {
  public static io: Server;

  public static SetIo(io_: Server) {
    handleSocketIo.io = io_;
    handleSocketIo_(io_);
  }
  public static getIo(): Server {
    return handleSocketIo.io;
  }
}
