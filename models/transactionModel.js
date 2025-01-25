import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  offerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offerer', 
    required: true
  },
  pointsEarned: {
    type: Number,
    required: true,
    min: [0, 'Points cannot be negative']
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'expired'],
    default: 'pending'
  },
  transactionDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
