import User from '../models/userModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';

export const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('username and email and password can not be empty!');
  }

  const newUser = await User.create({ username, email, password });

  if (newUser) {
    res.status(201).json({ message: 'user created successfully' });
  } else {
    res.status(400);
    throw new Error("Couldn't create new user");
  }
});

export const signin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('email and password can not be empty!');
  }

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

export const google = asyncHandler(async (req, res) => {
  const { name, email, photo } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    const googleUsername =
      name.split(' ').join('').toLowerCase() +
      '_' +
      Math.random().toString(36).slice(-4);
    const generatedPassword = Math.random().toString(36).slice(-8);
    const newUser = new User({
      username: googleUsername,
      email,
      password: generatedPassword,
      avatar: photo,
    });

    await newUser.save();
    generateToken(newUser._id, res);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
    });
  }
});

//3.26
