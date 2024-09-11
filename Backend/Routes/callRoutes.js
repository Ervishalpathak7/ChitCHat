import express from 'express';
import { initiateCall, endCall } from '../Controllers/callController.js';
const callRouter = express.Router();

callRouter.post('/initiate', initiateCall);
callRouter.post('/end', endCall);

export default callRouter;
