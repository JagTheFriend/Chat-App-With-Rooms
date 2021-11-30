import { Document } from 'mongoose';
export interface MessageSchema extends Document {
  content: string;
  author: string;
  roomId: string;
}
