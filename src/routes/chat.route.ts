import { Router } from 'express';
import ChatController from '@controllers/chat.controller';
import { Routes } from '@interfaces/routes.interface';

class ChatRoute implements Routes {
  public path = '/chat';
  public router = Router();
  public chatController = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.chatController.index);
    this.router.post(`${this.path}/new-room`, this.chatController.createNewRoom);
  }
}

export default ChatRoute;
