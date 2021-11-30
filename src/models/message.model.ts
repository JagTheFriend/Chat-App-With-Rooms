import { model, Schema } from 'mongoose';
import { MessageSchema } from '@interfaces/message.interface';

const messageSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  roomId: {
    type: String,
    required: true,
  },
});

const messageModel = model<MessageSchema>('message', messageSchema);

export default messageModel;
