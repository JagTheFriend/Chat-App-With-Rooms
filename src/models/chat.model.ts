import { model, Schema } from 'mongoose';
import { ChatSchema } from '@interfaces/chat.interface';
import { messageSchema } from '@models/message.model';

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
