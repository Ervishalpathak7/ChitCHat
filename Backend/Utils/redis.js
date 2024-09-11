import redis from 'redis';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL // Replace with your Redis URL or connection settings
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Connect to Redis
(async () => {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

// Set user socket ID
export const setUserSocketId = async (userId, socketId) => {
  try {
    await redisClient.hSet('userSockets', userId, socketId);
  } catch (err) {
    console.error('Error setting user socket ID:', err);
  }
};

// Get user socket ID
export const getUserSocketId = async (userId) => {
  try {
    return await redisClient.hGet('userSockets', userId);
  } catch (err) {
    console.error('Error getting user socket ID:', err);
  }
};

// Delete user socket ID
export const deleteUserSocketId = async (userId) => {
  try {
    await redisClient.hDel('userSockets', userId);
  } catch (err) {
    console.error('Error deleting user socket ID:', err);
  }
};

// Check if user is online
export const isUserOnline = async (userId) => {
  try {
    const socketId = await getUserSocketId(userId);
    return socketId !== null;
  } catch (err) {
    console.error('Error checking if user is online:', err);
    return false; // Consider returning false in case of error
  }
};

export default redisClient;
