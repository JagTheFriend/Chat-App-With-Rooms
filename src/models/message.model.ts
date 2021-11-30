import { model, Schema } from 'mongoose';
import { MessageSchema } from '@interfaces/message.interface';

const messageSchema: Schema = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
});

export const messageModel = model<MessageSchema>('message', messageSchema);
