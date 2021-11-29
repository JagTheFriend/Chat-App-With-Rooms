import { Document } from 'mongoose';
export interface ChatSchema extends Document {
  roomName: string;
  createdBy: string;
  roomId: string;
}
