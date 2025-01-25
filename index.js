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
  // Extract the 'subid' from the query parameters
  const { subid } = req.query;

  // Check if 'subid' is present
  if (!subid) {
      return res.status(400).send('Missing subid');
  }

  // For demonstration, just log the subid
  console.log(`Postback received for user with subid: ${subid}`);
  
  // Process the conversion logic here (e.g., update database, log conversion, etc.)

  // Respond with a success message (as required by CPAlead or similar networks)
  res.status(200).send('OK');
});





// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started running on ${PORT}`);
});
