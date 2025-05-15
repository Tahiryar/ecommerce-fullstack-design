const mongoose = require("mongoose");
const { Reservation, Product, User, History } = require("../models/schema.js");

const createReservation = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  // Step 1: Check if the user has the correct role (only "Pm" can create reservations)
  if (TokenUserRole !== "Pm") {
    return res.status(403).json({
      message: "Access denied: Only 'Pm' users can create reservations.",
    });
  }

  try {
    const { productId } = req.body; // Extract productId and userId from the request body

    // Step 2: Ensure both productId and userId are provided
    if (!productId || !TokenuserId) {
      return res
        .status(400)
        .json({ message: "Product ID and User ID are required" });
    }

    // Step 3: Find the product to check the remaining sale limits and other properties
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Step 4: Check if the product is enabled for reservation
    if (product.istatus !== "enable") {
      return res
        .status(400)
        .json({ message: "Product reservation is not enabled" });
    }

    // Step 5: Check if the product is out of stock
    if (product.overAllSaleLimit < 1) {
      product.istatus = "disable"; // Disable product if out of stock
      await product.save();
      return res.status(400).json({ message: "Product is out of stock" });
    }

    // Step 6: Check if the product's daily sale limit has been reached
    if (product.remaningSaleLimit <= 0) {
      return res.status(400).json({ message: "Product Daily Limit End" });
    }

    // Step 7: Check if the user has already reserved the same product today
    const moment = require("moment-timezone");
    const startOfDay = moment.tz("Asia/Karachi").startOf("day").toDate(); // 00:00:00 of today in Asia/Karachi
    const endOfDay = moment.tz("Asia/Karachi").endOf("day").toDate(); // 23:59:59.999 of today in Asia/Karachi

    const userReservationsToday = await Reservation.countDocuments({
      productId,
      userId: TokenuserId,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    // Step 8: If user has already reserved this product 3 times today, prevent further reservations
    if (userReservationsToday >= 3) {
      return res.status(400).json({
        message:
          "Please note, this product can only be reserved up to 3 times per day.",
      });
    }

    // Step 9: Check how many total reservations for this product have been made today
    const reservationsToday = await Reservation.countDocuments({
      productId,
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    // Step 10: If reservations today have reached or exceeded the product's remaining sale limit, reject the request
    // if (reservationsToday >= product.remaningSaleLimit) {
    //   return res
    //     .status(400)
    //     .json({ message: "Product Daily Reservation Limit Reached" });
    // }

    // Step 11: Create the reservation
    const createdAt = moment.tz("Asia/Karachi").toDate(); // Current time in Asia/Karachi time zone

    const newReservation = new Reservation({
      productId,
      sellerId: product.userId,
      userId: TokenuserId,
      createdAt, // Automatically set the current date/time
    });

    // Save the new reservation to the database
    await newReservation.save();

    // Step 12: Log this reservation action in the History model
    const newHistory = new History({
      role: TokenUserRole, // Role of the user performing the action (e.g., "Pm")
      userId: TokenuserId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "insert", // Action type (this is the action performed)
      type: `Product Reserved by ${req.email} Id ${productId}`, // General type/category of the activity
    });
    await newHistory.save();

    // Step 13: Decrement the product's remaining sale limit by 1
    product.remaningSaleLimit = Math.max(0, product.remaningSaleLimit - 1);
    await product.save();

    // Step 14: Send a successful response
    return res.status(201).json({
      message: "Reservation created successfully",
      reservation: newReservation,
    });
  } catch (error) {
    //console.error(error);
    return res.status(500).json({
      message: "Error creating reservation",
      error: error.message,
    });
  }
};

const deleteReservation = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  try {
    const { reservationId } = req.params; // Extract reservationId from the request parameters

    // Ensure reservationId is provided
    if (!reservationId) {
      return res.status(400).json({ message: "Reservation ID is required" });
    }

    // Find and delete the reservation with the given reservationId
    const deletedReservation = await Reservation.findByIdAndDelete(
      reservationId
    );

    // If no reservation was found with the provided ID, return an error
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    if (
      TokenUserRole === "Pm" &&
      TokenuserId !== deletedReservation.userId.toString()
    ) {
      console.log(
        "Access denied: PM is trying to delete someone else's reservation."
      );
      return res.status(403).json({
        message: "Access denied: You can only delete your own reservations.",
      });
    }

    // Get the product associated with the reservation
    const product = await Product.findById(deletedReservation.productId); // Use the productId from the deleted reservation
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product related to the reservation not found" });
    }

    if (product.overAllSaleLimit <= 0) {
      product.istatus = "disable"; // Set the status to 'disable'
    }
    console.log(product);
    if (
      product.remaningSaleLimit < product.saleLimitPerDay &&
      product.overAllSaleLimit > 0
    ) {
      product.remaningSaleLimit = Math.max(0, product.remaningSaleLimit + 1);
    }

    // Increment the remaining sale limit as the reservation is being deleted

    // Save the updated product
    await product.save();

    // Step 3: Log this reservation action in the History model
    const newHistory = new History({
      role: TokenUserRole, // Role of the user performing the action (e.g., "Pm")
      userId: TokenuserId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: `Product Release by ${req.email} Id ${product._id}`, // General type/category of the activity
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();

    // Return a success message with the deleted reservation data
    res.status(200).json({
      message:
        "Your reservation has been successfully released. Thank you for using our service!",
      reservation: deletedReservation,
      updatedProduct: {
        productId: product._id,
        remainingSaleLimit: product.remaningSaleLimit,
      },
    });
  } catch (error) {
    //console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error deleting reservation", error: error.message });
  }
};

const reservation = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  try {
    // Destructure and set default values for page and size
    const { page = 1, size = 10 } = req.query;
    const limit = parseInt(size, 10); // Convert size to an integer
    const skip = (parseInt(page, 10) - 1) * limit;

    // Log the query parameters (for debugging purposes)
    console.log("Request Query:", req.query);

    // Construct filter object based on query parameters
    let filter = {};

    // Apply filter based on user role
    if (TokenUserRole === "Seller") {
      filter.sellerId = TokenuserId; // Sellers will see reservations for their products
    } else if (TokenUserRole === "Pm") {
      filter.userId = TokenuserId; // PMs will see reservations related to them
    }

    // Fetch reservations with pagination and filter applied
    const reservations = await Reservation.find(filter)
      .populate("productId") // Populate product data (productId will be populated)
      .populate("userId") // Populate user data
      .populate("sellerId", "phone")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by lastUpdateDate in descending order

    // Map and format the data to include only relevant fields
    const filteredReservations = reservations.map((reservation) => ({
      reservationId: reservation._id,
      user: reservation.userId?.name || "N/A", // Fallback to "N/A" if user data is missing
      userPhone: reservation.userId?.phone || "N/A",
      sellerPhone: reservation.sellerId.phone,
      productId: reservation.productId?._id || "N/A", // Fallback to "N/A" if productId is missing
      productType: reservation.productId?.productType || "N/A", // Ensure productType is mapped from product
      market: reservation.productId?.market || "N/A", // Fetch 'market' from the populated product
      createdAt: reservation.createdAt, // Reservation creation time
      image: reservation.productId?.image1Url || "", // Fallback to empty string if image is missing
    }));

    // Get the total number of reservations for pagination
    const totalReservations = await Reservation.countDocuments(filter); // Apply the same filter to count

    // Send the response with pagination info and reservation details
    res.status(200).json({
      totalReservations,
      totalPages: Math.ceil(totalReservations / limit), // Calculate total pages for pagination
      reservations: filteredReservations,
    });
  } catch (error) {
    //console.error("Error fetching reservation details:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message || error,
    });
  }
};

module.exports = {
  createReservation,
  deleteReservation,
  reservation,
};
