import Listing from '../models/ListingModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const createListing = asyncHandler(async (req, res) => {
  const createdList = await Listing.create(req.body);

  if (createdList) {
    res.status(201).json(createdList);
  } else {
  }
});
