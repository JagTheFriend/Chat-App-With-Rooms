import chatModel from '@models/chat.model';
import { NextFunction, Request, Response } from 'express';
import { Server } from 'socket.io';
import { handleSocketIo } from '../socket';
import path from 'path';
import { MessageSchema } from '@interfaces/message.interface';

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
        messages: [],
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
      if (!room) return res.send({ message: 'Room not found...' });
      res.render('chat', { roomName: room.roomName });
      handleSocketIo.io.emit('join-room', room);
    } catch (error) {
      next(error);
    }
  };

  public getMessages = async (req: Request, res: Response, next: NextFunction) => {
    const roomId = req.params.id;
    console.log(roomId);
    try {
      const room = await chatModel.findOne({ roomId: roomId });
      res.send({ messages: room.messages });
    } catch (error) {
      next(error);
    }
  };

  public storeMessage = async (req: Request, res: Response, next: NextFunction) => {
    const roomId = req.body.id;
    const message = req.body.message;
    const username = req.body.username;
    console.log(req.body);
    try {
      const room = await chatModel.findOne({ roomId: roomId });
      const newMessage: MessageSchema = {
        roomId: roomId,
        content: message,
        author: username,
      };
      room.messages.push(newMessage);
      await room.save();
      res.send({ success: true });
    } catch (error) {
      next(error);
    }
  };

  public script = (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname.replace('controllers', '') + '/public/script.js'));
  };
}

export default ChatController;
