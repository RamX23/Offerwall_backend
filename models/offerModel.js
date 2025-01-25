import mongoose from "mongoose";

const offererSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image:{
    type: String,
    required:true,
    default:'https://image.freepik.com/free-vector/special-offer-sale-discount-banner_180786-46.jpg'
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  provider: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  inum: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  rewardPoints:{
    type: Number,
    default:100
  },
  Offertype:{
    type: String,
    enum: ['survey','app'],
    default:'survey'
  }
});

const Offerer = mongoose.model('Offerer', offererSchema);

export default Offerer;
