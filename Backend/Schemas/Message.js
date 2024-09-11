import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  recipientId: mongoose.Schema.Types.ObjectId,
  message: String,
  delivered: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);

// Function to store message
export const storeMessage = async (data) => {
  const { senderId, recipientId, message } = data;
  const newMessage = new Message({
    senderId,
    recipientId,
    message,
    delivered: false,
  });
  return await newMessage.save();
};

// Function to mark message as delivered
export const markMessageAsDelivered = async (messageId) => {
  await Message.findByIdAndUpdate(messageId, { delivered: true });
};

// Function to retrieve messages for a user
export const getMessagesForUser = async (userId) => {
  return await Message.find({ recipientId: userId, delivered: false });
};
