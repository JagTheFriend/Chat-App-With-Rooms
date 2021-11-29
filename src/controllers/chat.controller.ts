import { NextFunction, Request, Response } from 'express';

class ChatController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      // res.sendStatus(200);
      res.render('index');
    } catch (error) {
      next(error);
    }
  };
}

export default ChatController;
