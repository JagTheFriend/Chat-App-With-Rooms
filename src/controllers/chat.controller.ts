// import { logger } from '@utils/logger';
import chatModel from '@models/chat.model';
import { NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';

export class HandleSocket {
  io: Server;
  constructor(io: Server) {
    if (io) this.io = io;
  }
}

class ChatController extends HandleSocket {
  constructor(io?: Server) {
    super(io);
  }
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render('index');
    } catch (error) {
      next(error);
    }
  };

  public createNewRoom = async (req: Request, res: Response, next: NextFunction) => {
    const roomName: string = req.body.name;
    const createdBy: string = req.body.owner;
    const roomId: string = Date.now().toString();
    try {
      const newRoom = await chatModel.create({
        roomName: roomName,
        createdBy: createdBy,
        roomId: roomId,
      });
      res.send({ link: newRoom.roomId, roomName: newRoom.roomName, createdBy: newRoom.createdBy });
      this.io.emit('room-created', roomName);
    } catch (error) {
      next(error);
    }
  };
}

export default ChatController;
