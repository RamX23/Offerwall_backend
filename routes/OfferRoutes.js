import express from 'express'
import { checkAdmin } from "../middlewares/authHandler.js";
import {addOffer,completeOffer,getOffer,getOffers,getUserTransactions, getofferdata} from '../controllers/OfferController.js'
const router=express.Router();

// router.post('/',checkAdmin,addOffer);
 router.post('/',addOffer);
router.get('/',getOffers);
router.post('/complete-offer',completeOffer);
router.get('/get_transactions/:userId',getUserTransactions);
router.get('/getoffer',getofferdata)
// router.get('/postback/conversion/:userId',getofferdata)
export default router;
