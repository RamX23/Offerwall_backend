import express from 'express';
import mongoose from 'mongoose';
import OfferRoutes from './routes/OfferRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'; // Importing cors module
import bodyParser from 'body-parser'; // Required to handle URL-encoded data

const app = express();
app.use(cors({ origin: '*' })); // Allow all domains or specify the external domain


// Middleware to parse JSON request bodies and URL-encoded data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Handle URL-encoded data

// Enabling CORS
app.use(cors());

// Connect to MongoDB
await mongoose.connect("mongodb+srv://admin:9850196991@login.ovc0xx7.mongodb.net/offerwall")
  .then(() => console.log("DB connected!"))
  .catch(err => console.error("DB connection failed", err));

// Define routes
app.use('/api/offers', OfferRoutes);
app.use('/api/user', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.send("Hey, Welcome to Server!");
});

// This is the endpoint to handle postback requests
app.get('/postback/conversion', (req, res) => {
    // Log the received postback data
    console.log('Received postback:', req.body);
    
    const subid = req.body.subid;
    const offerid = req.body.offerid;
    const virtualCurrency = req.body.virtual_currency;

    // Respond with success
    res.status(200).send('Postback received successfully');
});





// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started running on ${PORT}`);
});
