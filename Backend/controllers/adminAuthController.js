import jwt from 'jsonwebtoken';
import User from "../models/User.js";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id, 'tokens.token': token });

    // Check if the user is admin
    if (!user || user.role !== 'admin') {
      throw new Error('Not authorized as admin');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(403).send({ error: 'Not authorized to access this route.' });
  }
};

export default adminAuth;
