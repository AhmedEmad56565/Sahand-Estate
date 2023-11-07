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

export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    listing.name = req.body.name || listing.name;
    listing.description = req.body.description || listing.description;
    listing.address = req.body.address || listing.address;
    listing.regularPrice = req.body.regularPrice || listing.regularPrice;
    listing.discountPrice = req.body.discountPrice || listing.discountPrice;
    listing.bathrooms = req.body.bathrooms || listing.bathrooms;
    listing.bedrooms = req.body.bedrooms || listing.bedrooms;
    listing.furnished = req.body.furnished || listing.furnished;
    listing.parking = req.body.parking || listing.parking;
    listing.type = req.body.type || listing.type;
    listing.offer = req.body.offer || listing.offer;
    listing.imageUrls = req.body.imageUrls || listing.imageUrls;

    const updatedListing = await listing.save();
    res.status(200).json(updatedListing);
  } else {
    res.status(404);
    throw new Error(`Error deleting listing`);
  }
});

export const getListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing) {
    res.status(200).json(listing);
  } else {
    res.status(404);
    throw new Error(`Error deleting listing`);
  }
});
