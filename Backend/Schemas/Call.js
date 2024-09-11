import mongoose from 'mongoose';

const callSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  startTime: { type: Date, required: true },
  endTime: { type: Date },
});

export default mongoose.model('Call', callSchema);
