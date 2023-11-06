import Listing from '../models/ListingModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const createListing = asyncHandler(async (req, res) => {
  const createdList = await Listing.create({
    ...req.body,
    userRef: req.user.id,
  });

  if (createdList) {
    res.status(201).json(createdList);
  } else {
    res.status(400);
    throw new Error(`Error creating listing`);
  }
});

export const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Listing deleted successfully' });
  } else {
    res.status(404);
    throw new Error(`Error deleting listing`);
  }
});
