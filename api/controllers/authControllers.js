import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = await User.create({ username, email, password });

  if (newUser) {
    res.status(201).json({ message: 'user created successfully' });
  } else {
    res.status(400);
    throw new Error("Couldn't create user");
  }
});
