import { model, Schema } from 'mongoose';
import { ChatSchema } from '@interfaces/chat.interface';

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

const chatSchema: Schema = new Schema({
  roomName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  messages: {
    type: [messageSchema],
    required: false,
  },
});

const chatModel = model<ChatSchema>('Chat', chatSchema);

export default chatModel;
