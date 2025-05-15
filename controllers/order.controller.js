const { Order, Product, Reservation, History } = require("../models/schema.js");
const mongoose = require("mongoose");

const ORDER_STATUS = [
  "Ordered",
  "Reviewed",
  "Delivered",
  "Refunded",
  "OnHold",
  "Deleted",
  "Completed",
  "Cancelled",
];

const orders = async (req, res) => {
  console.log("rtyy");
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  try {
    // Extract query parameters with default values for pagination
    const {
      market = "all",
      productType = "all",
      status = "all", // Default status is 'all'
      page = 1,
      size = 20,
    } = req.query;

    // Validate and parse pagination parameters
    const limit = Math.max(1, parseInt(size)); // Default size to 20 if invalid
    const currentPage = Math.max(1, parseInt(page)); // Default page to 1 if invalid
    const skip = (currentPage - 1) * limit;

    console.log("Request Query:", req.query); // Log for debugging

    // Construct filter object based on query parameters
    const filter = {};
    if (market && market !== "all") filter.market = market;
    if (productType && productType !== "all") filter.productType = productType;
    if (status && status !== "all") filter.status = status; // Add filter for status

    if (TokenUserRole === "Seller") {
      filter.sellerId = TokenuserId;
    }

    if (TokenUserRole === "Pm") {
      filter.userId = TokenuserId;
    }

    // Check if the customer email already exists in a different market

    // Fetch orders with filters and pagination
    const orders = await Order.find(filter)
      .select(
        "orderNo customerEmailAddress market productType status userId productId image1Url createDate _id "
      )
      .populate("sellerId", "phone") // Populating userId and selecting only the 'phone' field
      .populate("userId", "phone") // Populating userId and selecting only the 'phone' field
      .populate("productId", "image1Url")
      .skip(skip)
      .limit(limit)
      .sort({ lastUpdateDate: -1 }); // Sort by lastUpdateDate in descending order

    // Count total orders based on the filters
    // console.log(orders);
    orders.forEach((obj) => {
      console.log(obj.sellerId.phone); // Logs only the 'name' property from each object
    });
    orders.forEach((obj) => {
      console.log(obj.userId.phone); // Logs only the 'name' property from each object
    });

    const totalOrders = await Order.countDocuments(filter);

    // Transform orders before sending response
    const transformedOrders = orders.map((order) => ({
      orderNo: order.orderNo,
      customerEmailAddress: order.customerEmailAddress,
      market: order.market,
      productType: order.productType,
      status: order.status,
      userId: order.userId._id,
      productId: order.productId._id,
      image1Url: order.productId.image1Url,
      createDate: order.createDate,
      _id: order._id,
      sellerPhone: order.sellerId.phone,
      userPhone: order.userId.phone,
    }));
    //console.log("trans orders",transformedOrders);

    // Send paginated and transformed order data in response
    res.status(200).json({
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage,
      orders: transformedOrders,
    });
  } catch (error) {
    //console.error("Error fetching orders:", error); // Log for debugging
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message || error,
    });
  }
};

const createOrder = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  try {
    // Step 1: Destructure required fields from the request body
    const {
      orderNo,
      customerEmailAddress,
      image1Url,
      image2Url,
      amzReviewLink,
      reservationId,
    } = req.body;

    // Step 1a: Validate required fields
    if (!orderNo || !customerEmailAddress || !image1Url || !reservationId) {
      return res.status(400).json({
        message:
          "Order No, Customer Email, Order pic, and Reservation ID are required",
      });
    }

    // Step 2: Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(customerEmailAddress)) {
      return res.status(400).json({
        message: "Invalid email format. Please provide a valid email address.",
      });
    }
    // Step 2: Validate that the userId is provided via auth token or session
    const userId = TokenuserId; // Assuming userId is passed via the auth token or session

    if (!userId) {
      return res.status(400).json({
        message:
          "You must be logged in to update an order. Please log in to your account first.",
      });
    }

    // Step 3: Fetch the reservation and populate the associated product
    const reservation = await Reservation.findById(reservationId).populate(
      "productId"
    );

    if (!reservation) {
      return res.status(400).json({ message: "Reservation not found" });
    }

    if (TokenUserRole !== "Pm" && TokenuserId !== reservation.userId) {
      return res.status(403).json({
        message: "Access denied: You can only delete your own reservations.",
      });
    }

    // Step 4: Ensure the logged-in user is the same as the user in the reservation
    if (!reservation.userId.equals(userId)) {
      return res.status(403).json({
        message: "You are not authorized to modify this reservation.",
      });
    }

    // Step 5: Fetch the product from the reservation and perform sale limit handling
    const product = reservation.productId;

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (product.overAllSaleLimit <= 0) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    // Step 7: Check if the email is already associated with a different market (single market restriction)
    const existingOrder1 = await Order.findOne({
      customerEmailAddress: customerEmailAddress,
      market: { $ne: product.market }, // Ensure the market is not the same
    });

    if (existingOrder1) {
      return res.status(400).json({
        message: `This email (${customerEmailAddress}) is already associated with a different market.`,
      });
    }

    const existingOrder = await Order.findOne({
      productId: product._id,
      customerEmailAddress: customerEmailAddress,
    });

    if (existingOrder) {
      return res.status(400).json({
        message: `This email (${customerEmailAddress}) has already submitted an order for this product.`,
      });
    }

    // Reduce the sale limit by 1 and save the product
    product.overAllSaleLimit = Math.max(0, product.overAllSaleLimit - 1);
    await product.save();

    // Step 6: Extract relevant information from the product
    const {
      market,
      productType,
      adverzProCommission = 0,
      userId: sellerId,
    } = product;

    // Step 7: Create a new order with the details
    const newOrder = new Order({
      orderNo,
      customerEmailAddress,
      image1Url,
      image3Url: image2Url, // Use image2Url for image3Url, adjust if needed
      amzReviewLink,
      userId,
      productId: product,
      market,
      lastUpdateDate: new Date(),
      productType,
      commission: adverzProCommission, // Default to 0 if product.commission is undefined
      sellerId, // This is the seller's ID from the product
    });

    // Step 8: Save the new order to the database
    await newOrder.save();

    // Step 9: Delete the reservation after successfully creating the order
    await Reservation.findByIdAndDelete(reservationId);

    // Step 3: Log this reservation action in the History model
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: `Order Create by ${req.email} Id ${newOrder._id}`, // General type/category of the activity
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();

    // Step 10: Return a successful response with the created order
    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    //console.error(error);
    return res.status(500).json({
      message: "Error creating order",
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(req.body);
  try {
    const {
      order_number,
      customer_email,
      product_id,
      amz_review_link,
      market,
      status,
      seller_id,
      remarks,
    } = req.body;

    const { orderId } = req.params;
    console.log("Order ID to update:", req.body);

    // Step 1: Validate that the userId is provided
    const userId = TokenuserId; // Assuming userId is passed via the auth token or session

    if (!userId) {
      return res.status(400).json({
        message:
          "You must be logged in to update an order. Please log in to your account first.",
      });
    }

    // Step 2: Find the order by MongoDB _id (passed in orderId)
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "The order you are trying to update does not exist.",
      });
    }

    // Step 3: Check if the user trying to update the order is the owner
    if (order.userId.toString() !== userId && TokenUserRole == "Pm") {
      return res.status(403).json({
        message: "You are not authorized to update this order",
      });
    }

    if (order.sellerId.toString() !== userId && TokenUserRole == "Seller") {
      return res.status(403).json({
        message: "You are not authorized to update this order",
      });
    }
    let allowedStatuses = [];
    // Step 4: Check role-specific status restrictions
    const allowedStatusesForPm = ["Ordered", "Reviewed", "OnHold", "Cancelled"];
    const allowedStatusesForSeller = [
      "Ordered",
      "Reviewed",
      "Delivered",
      "Refunded",
      "OnHold",
      "Deleted",
      "Cancelled",
    ];

    if (TokenUserRole === "Pm") {
      allowedStatuses = allowedStatusesForPm;
    } else if (TokenUserRole === "Seller") {
      allowedStatuses = allowedStatusesForSeller;
    } else if (TokenUserRole === "Admin" || TokenUserRole === "SuperAdmin") {
      allowedStatuses = ORDER_STATUS;
    } else {
      return res.status(403).json({
        message:
          "Your role does not have permission to update the order status.",
      });
    }

    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `You are not allowed to set the order status to "${status}".`,
      });
    }

    // Step 4: Prepare the updated order data (only change fields that were provided)
    const updatedOrderData = {};

    if (order_number) {
      updatedOrderData.orderNo = order_number;
    }

    if (
      customer_email &&
      (TokenUserRole === "SuperAdmin" || TokenUserRole === "Admin")
    ) {
      updatedOrderData.customerEmailAddress = customer_email;
    }

    if (status && !ORDER_STATUS.includes(status)) {
      return res.status(400).json({
        message: "Invalid status.",
      });
    }

    // Step 5: Handle dates based on status update
    if (status && status !== order.status) {
      const previousStatus = order.status;
      updatedOrderData.status = status;

      const statusHistoryEntry = {
        userId: new mongoose.Types.ObjectId(userId),
        previousStatus: previousStatus,
        updatedToStatus: status,
        updatedAt: new Date(),
      };

      updatedOrderData.statusHistory = [
        ...(order.statusHistory || []),
        statusHistoryEntry,
      ];

      if (status === "Reviewed" && !order.reviewDate) {
        updatedOrderData.reviewDate = new Date();
      }

      if (status === "Refunded" && !order.refundDate) {
        updatedOrderData.refundDate = new Date();
      }
    }

    if (amz_review_link) {
      updatedOrderData.amzReviewLink = amz_review_link;
    }

    if (TokenUserRole === "SuperAdmin") {
      if (market) {
        updatedOrderData.market = market;
      }

      if (product_id) {
        const product = await Product.findById(product_id);

        if (!product) {
          return res.status(404).json({
            message:
              "Product not found. Please verify the product ID and try again.",
          });
        }
        updatedOrderData.productId = product_id;
      }

      if (seller_id) {
        updatedOrderData.sellerId = seller_id;
      }
    }

    updatedOrderData.lastUpdateDate = new Date();

    // Step 5: Handle remarks (whether it's a string or an array)
    let remarkData = [];

    if (remarks) {
      if (typeof remarks === "string") {
        remarkData = [
          {
            userId: new mongoose.Types.ObjectId(userId),
            remark: remarks,
            createdAt: new Date(),
          },
        ];
      } else if (Array.isArray(remarks)) {
        remarkData = remarks.map((remark) => ({
          userId: new mongoose.Types.ObjectId(userId),
          remark: remark,
          createdAt: new Date(),
        }));
      }
      updatedOrderData.remarks = [...(order.remarks || []), ...remarkData];
    }

    // Step 6: Apply updates to the order document
    Object.assign(order, updatedOrderData);

    // Step 7: Save the updated order
    await order.save();
    // Step 3: Log this reservation action in the History model
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: `Order Update by ${req.email} Id ${order._id}`, // General type/category of the activity
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();
    // Step 8: Return the updated order
    return res.status(200).json({
      message:
        "Your order has been successfully updated. Thank you for your continued trust in our service!",
      order,
    });
  } catch (error) {
    //console.error(error);
    return res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

const orderView = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  console.log("Fetching order details");
  try {
    const { orderId } = req.params; // Get order id from the request parameters
    console.log(orderId);
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: "Invalid order ID format" });
    }

    // Find the order by its ID
    const order = await Order.findById(orderId)
      .populate("userId", "userName email") // Populate user data (name, email)
      .select(
        " orderNo customerEmailAddress amzReviewLink sellerId market productType status userId productId image1Url image2Url image3Url commission createDate reviewDate refundDate lastUpdateDate remarks statusHistory _id"
      ); // Select the fields you want to include in the response
    console.log(order);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // if (TokenUserRole === "Seller" || TokenUserRole === "Pm") {
    //   if (
    //     TokenuserId !== order.userId.toString() ||
    //     TokenuserId !== order.sellerId.toString()
    //   ) {
    //     return res.status(403).json({
    //       message:
    //         "Access denied: You can only access your own product or order.",
    //     });
    //   }
    // }

    // If the order is found, transform it to the desired format
    const orderDetails = {
      order_number: order.orderNo,
      customer_email: order.customerEmailAddress,
      userName: order.userId.userName,
      market: order.market,
      productType: order.productType,
      status: order.status,
      userId: order.userId,
      amz_review_link: order.amzReviewLink,
      product_id: order.productId,
      image1Url: order.image1Url,
      image2Url: order.image2Url,
      image3Url: order.image3Url,
      order_date: order.createDate,
      seller_id: order.sellerId,
      review_date: order.reviewDate,
      refund_date: order.refundDate,
      commission: order.commission,
      last_update_date: order.lastUpdateDate,
      remarks: order.remarks,
      statusHistory: order.statusHistory,
      _id: order._id,
    };

    // Log for debugging, can be removed in production
    console.log(orderDetails);

    return res.status(200).json(orderDetails); // Return the order details as a response
  } catch (error) {
    //console.error("Error fetching order details:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching order details" });
  }
};

const updatePics = async (req, res) => {
  const { Id } = req.params; // Get the ID from the URL parameter
  const { imageUrl, name } = req.body; // Get the image URL and name from the request body
  console.log(req.body); // Log the request body for debugging

  // Validate that imageUrl is provided
  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL must be provided" });
  }

  // Find the order by its ID
  try {
    const order = await Order.findById(Id); // Find the order in the database by ID
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updatedOrderData = {}; // Object to store the updates

    // Based on the name, update the respective image field
    if (name === "Order picture") {
      updatedOrderData.image1Url = imageUrl; // Assign to image1Url
    } else if (name === "Review picture") {
      updatedOrderData.image2Url = imageUrl; // Assign to image2Url
    } else if (name === "Refund picture") {
      updatedOrderData.image3Url = imageUrl; // Assign to image3Url
    } else {
      return res.status(400).json({ error: "Invalid picture name" });
    }

    // Update the order with the new image URL
    const updatedOrder = await Order.findByIdAndUpdate(Id, updatedOrderData, {
      new: true,
    });

    // Respond with the updated picture info
    return res.status(200).json({
      message: "Picture updated successfully",
      updatedPic: updatedOrder,
    });
  } catch (error) {
    //console.error(error); // Log the error for debugging
    return res
      .status(500)
      .json({ error: "An error occurred while updating the picture" });
  }
};

module.exports = {
  orders,
  createOrder,
  updateOrder,
  orderView,
  updatePics,
};
