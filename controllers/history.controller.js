const mongoose = require("mongoose");
const { History, Product, User } = require("../models/schema.js");

const createHistory = async (req, res) => {
  // Destructure the user information (role, userId, email) from the request object
  const { role: TokenUserRole, userId: TokenUserId, email: TokenEmail } = req;

  try {
    // Extract type and actionType from the request body
    const { type, actionType } = req.body;

    // Validate required fields
    if (!TokenUserId || !TokenEmail || !actionType || !type) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Create a new activity history record
    const newActivity = new History({
      role: TokenUserRole, // Use TokenUserRole for the role
      userId: TokenUserId, // User ID from the token
      email: TokenEmail, // User email from the token
      actionType: actionType, // Action type (from the request body)
      type: type, // Activity type (from the request body)
    });

    // Save the new activity to the database
    const savedActivity = await newActivity.save();

    // Return the saved activity record in the response
    res.status(201).json(savedActivity);
  } catch (err) {
    // Log the error and return a 500 server error response
    //console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const history = async (req, res) => {
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
      filter.userId = TokenuserId; // Sellers will see reservations for their products
    } else if (TokenUserRole === "Pm") {
      filter.userId = TokenuserId; // PMs will see reservations related to them
    }

    // Fetch reservations with pagination and filter applied
    const historyRecords = await History.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ actionTimestamp: -1 }); // Sort by lastUpdateDate in descending order
    const filteredReservations = historyRecords.map((history) => ({
      historyId: history._id,
      user: history.userId || "N/A", // Fallback to "N/A" if user data is missing
      email: history.email || "N/A", // Fallback to "N/A" if email is missing
      role: history.role || "N/A", // Fallback to "N/A" if role is missing
      actionType: history.actionType || "N/A", // Action type (insert/update/delete)
      actionTimestamp: history.actionTimestamp, // The timestamp of the action
      type: history.type || "N/A", // Type/category of the action
    }));

    // Get the total number of reservations for pagination
    const totalReservations = await History.countDocuments(filter); // Apply the same filter to count

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
  createHistory,
  history,
};
