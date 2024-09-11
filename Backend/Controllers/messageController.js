import { Message } from '../Schemas/Message.js';

export const getMessages = async (req, res) => {
    const { userId } = req.params;
    try {
        const messages = await Message.find({ $or: [{ sender: userId }, { receiver: userId }] });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
