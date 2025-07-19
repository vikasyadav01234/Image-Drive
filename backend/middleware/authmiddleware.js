import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authMiddleware = async (req, res, next) => {
  try {
    // 1️⃣ Check if Authorization header exists and starts with Bearer
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ msg: 'Unauthorized: Token missing' });
    }

    // 2️⃣ Extract token from header
    const token = authHeader.split(' ')[1];

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded Token:", decoded.id);
    // 4️⃣ Find user from DB and attach to req
    const user = await User.findById(decoded.id).select('-password');
    //console.log("Authenticated User:", user);
    if (!user) {
      return res.status(401).json({ msg: 'Unauthorized: User not found' });
    }

    req.user = user;
    
    next(); // 🔁 Move to next controller

  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
  }
};
