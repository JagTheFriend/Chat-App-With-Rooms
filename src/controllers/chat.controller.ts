// import { logger } from '@utils/logger';
import { NextFunction, Request, Response } from 'express';
import { v1 as IdGenerator } from 'uuid';

class ChatController {
  rooms = {};
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
    const roomId: string = IdGenerator();
    try {
      return { link: roomId, roomName: roomName, createdBy: createdBy };
    } catch (error) {
      next(error);
    }
  };
}

export default ChatController;
