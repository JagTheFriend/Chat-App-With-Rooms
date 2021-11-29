import { model, Schema } from 'mongoose';
import { ChatSchema } from '@interfaces/chat.interface';

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
});

const chatModel = model<ChatSchema>('Chat', chatSchema);

export default chatModel;
