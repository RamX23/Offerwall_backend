import Offerer from "../models/offerModel.js";
import mongoose from "mongoose";
import Transaction from "../models/transactionModel.js";
import User from "../models/userModel.js";
import { json } from "express";

export const addOffer = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    if (data) {
      const newOfferer = new Offerer(data); 
      await newOfferer.save();             
      res.status(201).json({ message: "Offer added successfully", offer: newOfferer });
    } else {
      res.status(400).send("Invalid Input");
    }
  } catch (err) {
    console.error("Error occurred while adding offer:", err);
    res.status(500).send("Internal Server Error");
  }
};


export const getOffers = async (req, res) => {
  try {
    const offers = await Offerer.find();
    res.status(200).json({ message: "Offers fetched successfully!", offers });
  } catch (err) {
    console.error("Error occurred while fetching offers:", err);
    res.status(500).json({ message: "An error occurred while fetching offers." });
  }
};

export const completeOffer=async(req,res)=>{
  try{
    const {userId,offerId}=req.body;
    const user=await User.findById(userId);
    const offer=await Offerer.findById(offerId);
    const existing = await Transaction.findOne({ userId, offerId });

    if (existing && existing.status === 'completed') {
      return res.status(400).json({ message: "Offer is already completed" });
    }
    if (!user || !offer) {
      return res.status(404).send("User or Offer not found");
    }
    console.log(req.body)
    const pointsEarned=offer.rewardPoints;
    const newTransaction = new Transaction({
      userId: user._id,
      offerId: offer._id,
      pointsEarned: pointsEarned,
      status: 'completed',
    });

    await newTransaction.save();
    user.rewardPoints += pointsEarned;
    user.completedOffers.push(offer)
    await user.save();
    res.status(200).json({
      message: 'Offer completed successfully',
      transaction: newTransaction
    })

  }
  catch(err){
    console.error("error occured while completing offer",err);
    res.status(500).send("Server error.")
  }
}

export const getUserTransactions = async (req, res) => {
  try {

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findById(userId);

    if (user) {
      const offers = user.completedOffers;
      console.log(offers);
      return res.status(200).json({
        message: "Transactions fetched successfully.",
        offers,
      });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return res.status(500).send({
      message: "Server-side error while getting user transactions.",
    });
  }
};

export const getOffer=async(req,res)=>{
  try{
     const offerId=req.params.offerId;
     const data=await Offerer.findById(offerId);
     console.log(data);
     if(data){
         res.status(200).json({
          message:"Offer fetched successfully.",
          offer:data
         })
     }else{
      res.status(404).json({
        message:"Offer not found."
      })
     }
  }
  catch(err){
    console.error("Error occured while getting offer.",err);
    res.status(500).send("Server side error occured.")
  }
}

export const getofferdata=async(req,res)=>{
  try{
    const data=req.body;
    console.log(data);
  } catch(err){
    console.error("Error Occured while getting callback.",err);
  }
}




