import mongoose from 'mongoose';
import Offerer from './offerModel.js';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  rewardPoints: {
    type: Number,
    default: 0,
    min: [0, 'Reward points cannot be negative'],
  },
  Role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  completedOffers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Offerer',  
  }],
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
