import User from '../models/userModel.js';


export const checkAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId); 
    if (user) {
      if (user.role === 'admin') {
        return next(); 
      } else {
        return res.status(403).send("Access denied: Admin role required");
      }
    } else {
      return res.status(404).send("User doesn't exist");
    }
  } catch (err) {
    console.error("Error occurred while checking for admin:", err);
    return res.status(500).send("Server error");
  }
};
