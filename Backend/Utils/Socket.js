import { Server } from 'socket.io';
import { setUserSocketId, deleteUserSocketId, getUserSocketId, isUserOnline } from './redis.js';
import { storeMessage, markMessageAsDelivered } from '../Schemas/Message.js'; // Ensure these functions are correctly imported

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*', // Adjust this for your use case
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Store user socket ID in Redis when they connect
    socket.on('setUserId', async (userId) => {
      await setUserSocketId(userId, socket.id);
    });

    // Handle chat messages
    socket.on('message', async (data) => {
      const { recipientId, senderId, message } = data;
      const recipientSocketId = await getUserSocketId(recipientId);

      if (await isUserOnline(recipientId)) {
        // Send message directly to recipient
        if (recipientSocketId) {
          io.to(recipientSocketId).emit('message', data);
        }

        // Store message in database
        const newMessage = await storeMessage(data);

        // Mark message as delivered
        await markMessageAsDelivered(newMessage._id);

        // Send delivery confirmation to sender
        if (await getUserSocketId(senderId)) {
          io.to(await getUserSocketId(senderId)).emit('messageDelivered', newMessage._id);
        }

      } else {
        // Store message for offline user
        await storeMessage(data);
        console.log('Recipient offline, storing message for later delivery.');
      }
    });

    // Handle user disconnect
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove user socket ID from Redis
      await deleteUserSocketId(socket.id);
    });
  });

  return io;
};
