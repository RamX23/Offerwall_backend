import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const JWT_SECRET = "fbajdlnaddsafrta";  

export const createUser = async (req, res) => {
  try {
    const data = req.body;
    if (data) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;

      const newUser = new User(data);
      await newUser.save();
      
      // Create JWT token
      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email }, 
        JWT_SECRET, 
        { expiresIn: "1h" } 
      );

      res.status(201).json({
        message: "User created successfully",
        user: newUser,
        token: token 
      });
    } else {
      res.status(400).send("Invalid Input");
    }
  } catch (err) {
    console.error("Error occurred while adding the user.");
    res.status(500).send("Internal Server Error");
  }
};

// Login user with JWT
export const loginUser = async (req, res) => {
  try {
    const data = req.body;
    if (data && data.email && data.password) {
      const user = await User.findOne({ email: data.email });

      if (user) {
        const isMatch = await bcrypt.compare(data.password, user.password);

        if (isMatch) {
          const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            JWT_SECRET, 
            { expiresIn: "1h" }
          );

          res.status(200).json({
            message: "Login successful",
            user: user,
            token: token
          });
        } else {
          res.status(400).send("Incorrect password");
        }
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.status(400).send("Invalid Input");
    }
  } catch (err) {
    console.error("Error occurred while logging in", err);
    res.status(500).send("Internal Server error");
  }
};
