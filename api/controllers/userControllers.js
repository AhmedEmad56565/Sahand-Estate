import User from '../models/userModel.js';
import Listing from '../models/ListingModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    const { username, email, password, avatar } = req.body;

    user.username = username || user.username;
    user.email = email || user.email;
    user.avatar = avatar || user.avatar;

    if (password) {
      user.password = password;
    }

    const newUser = await user.save();
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
    });
  } else {
    res.status(404);
    throw new Error('Can not find user');
  }
});

export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    await User.findByIdAndDelete(req.user.id);
    res.clearCookie('access_token');
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Can not find user');
  }
});

export const getUserListings = asyncHandler(async (req, res) => {
  const userListings = await Listing.find({ userRef: req.user.id });

  if (userListings) {
    res.status(200).json(userListings);
  } else {
    res.status(401);
    throw new Error('No listings for you to show!');
  }
});
