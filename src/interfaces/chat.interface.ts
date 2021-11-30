import { Document } from 'mongoose';
import { MessageSchema } from '@interfaces/message.interface';

export interface ChatSchema extends Document {
  roomName: string;
  createdBy: string;
  roomId: string;
  messages: MessageSchema[];
}
