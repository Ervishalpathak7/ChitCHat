import express from 'express';
import http from 'http';
import { initializeSocket } from './utils/socket.js';
import dotenv from 'dotenv';
import connectDB from './Database/db.js';
import authRouter from './Routes/authRoutes.js';
import chatRouter from './Routes/chatRoutes.js';
import callRouter from './Routes/callRoutes.js';
import cors from 'cors';
import { authenticateUser } from './Middlewares/authMiddleware.js';
import helmet from 'helmet';

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const server = http.createServer(app);
initializeSocket(server);

// Security middleware
app.use(helmet());


// CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your client domain
  methods: ['GET', 'POST'],
}));

// Connect to MongoDB
connectDB();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define your routes here
app.use('/api/auth', authRouter);
app.use('/api/chat', authenticateUser ,  chatRouter);
app.use('/api/call', authenticateUser,  callRouter);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
