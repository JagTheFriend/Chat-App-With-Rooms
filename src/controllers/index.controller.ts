import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.redirect('/chat');
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
