// import { logger } from '@utils/logger';
import chatModel from '@models/chat.model';
import { NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import { handleSocketIo } from '../socket';

class ChatController {
  public io: Server;
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
    } catch (error) {
      next(error);
    }
  };

  public joinRoom = async (req: Request, res: Response, next: NextFunction) => {
    const roomId = req.params.id;
    try {
      const room = await chatModel.findOne({ roomId: roomId });
      res.render('chat', room);
    } catch (error) {
      next(error);
    }
  };
}

export default ChatController;
