import { Router } from 'express';
import ChatController from '@controllers/chat.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateChatDto, CreateMessageDto } from '@dtos/chat.dto';

class ChatRoute implements Routes {
  public path = '/chat';
  public router = Router();
  public chatController = new ChatController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.chatController.index);
    this.router.post(`${this.path}/new-room`, validationMiddleware(CreateChatDto, 'body'), this.chatController.createNewRoom);
    this.router.get(`${this.path}/script.js`, this.chatController.script);
    this.router.get(`${this.path}/:id`, this.chatController.joinRoom);

    this.router.post(`${this.path}/messages/:id`, this.chatController.getMessages);
    this.router.post(`${this.path}/create`, validationMiddleware(CreateMessageDto, 'body'), this.chatController.storeMessage);
  }
}

export default ChatRoute;
