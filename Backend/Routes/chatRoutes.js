import express from 'express';
import { getMessages } from '../Controllers/messageController.js';
const chatRouter = express.Router();


chatRouter.get('/messages/:userId', getMessages);

export default chatRouter;
