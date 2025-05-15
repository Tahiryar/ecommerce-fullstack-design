const mongoose = require("mongoose");
const { Product, Reservation, User, History } = require("../models/schema.js");

const createProduct = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(TokenUserRole);

  // Only allow Sellers to create products
  if (TokenUserRole !== "Seller") {
    return res.status(403).json({
      message: "Access denied: Only Sellers can create products.",
    });
  }

  try {
    // Extract data from the request body
    const {
      keyword,
      brandName,
      instructions,
      saleLimitPerDay,
      overAllSaleLimit,
      commission, // renamed to `commission` (AdverzPro commission)
      commissionConditions,
      amzSeller,
      market,
      chineseSeller,
      category,
      productType,
      image1Url,
      image2Url,
      mercantileCommission, // Mercantile Commission
      refundConditions, // Refund conditions field
    } = req.body;

    // Required field checks
    if (
      !amzSeller ||
      !category ||
      !productType ||
      !keyword ||
      !brandName ||
      !instructions ||
      !saleLimitPerDay ||
      !overAllSaleLimit ||
      !commission ||
      !commissionConditions ||
      !mercantileCommission ||
      !refundConditions ||
      !image1Url ||
      !image2Url
    ) {
      return res.status(400).json({
        message:
          "Missing required fields: userId, amzSeller, category, productType, keyword, brandName, instructions, saleLimitPerDay, overAllSaleLimit, commission, commissionConditions, mercantileCommission, refundConditions, image1Url, or image2Url.",
      });
    }

    // Validate commission and mercantileCommission
    if (mercantileCommission < 175) {
      return res.status(400).json({
        message: "Mercantile commission must be at least 175.",
      });
    }

    if (commission < 700) {
      return res.status(400).json({
        message: "Commission must be at least 700.",
      });
    }

    // Create a new Product object
    const newProduct = new Product({
      keyword,
      brandName,
      instructions,
      saleLimitPerDay,
      overAllSaleLimit,
      adverzProCommission: commission, // Mapping to adverzProCommission
      commissionConditions,
      userId: TokenuserId,
      amzSeller,
      market,
      chineseSeller,
      category,
      productType,
      image1Url,
      image2Url,
      remaningSaleLimit: saleLimitPerDay,
      mercantileCommission, // Using mercantileCommission
      refundConditions, // Map refundConditions
    });

    // Save the product to the database
    await newProduct.save();
    // Step 3: Log this reservation action in the History model
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: `Product Create by ${req.email} Id ${newProduct._id}`,
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();
    // Return success response
    return res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    //console.error(error);
    return res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

const products = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  try {
    // Extract query parameters and provide default values for pagination
    const {
      market = "all",
      productType = "all",
      istatus = "all", // Added istatus filter
      page = 1,
      size = 20,
    } = req.query;

    // Validate and parse pagination parameters
    const limit = Math.max(1, parseInt(size)); // Default size to 10 if invalid
    const currentPage = Math.max(1, parseInt(page)); // Default page to 1 if invalid
    const skip = (currentPage - 1) * limit;

    console.log("Request Query:", req.query); // Log for debugging

    // Construct filter object based on query parameters
    const filter = {};
    if (market && market !== "all") filter.market = market;
    if (productType && productType !== "all") filter.productType = productType;
    if (istatus && istatus !== "all") filter.istatus = istatus; // Added istatus condition
    if (TokenUserRole === "Seller") {
      filter.userId = new mongoose.Types.ObjectId(TokenuserId); // Use 'new' here
      console.log("Filter set for Seller with userId:", filter.userId);
    }

    // Fetch products with filters and pagination
    const products = await Product.find(filter)

      .select(
        "market productType productStatus saleLimitPerDay overAllSaleLimit adverzProCommission userId image1Url _id istatus remaningSaleLimit"
      )
      .populate("userId", "phone") // Populating userId and selecting only the 'phone' field

      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by lastUpdateDate in descending order

    // Count total products based on the filters
    const totalproducts = await Product.countDocuments(filter);

    // Transform products before sending response
    const transformedProducts = products.map((thisproduct) => ({
      sellerId: thisproduct.userId,
      market: thisproduct.market,
      overAllSaleLimit: thisproduct.overAllSaleLimit,
      saleLimitPerDay: thisproduct.saleLimitPerDay, // Example static value (can be dynamically calculated)
      totalRemaining: 100, // Example static value (can be dynamically calculated)
      adverzProCommission: thisproduct.adverzProCommission,
      _id: thisproduct._id,
      image1Url: thisproduct.image1Url,
      productType: thisproduct.productType,
      istatus: thisproduct.istatus,
      remaningSaleLimit: thisproduct.remaningSaleLimit,
      PhoneNumber: thisproduct.userId.phone,
    }));

    // Send paginated and transformed product data in response
    res.status(200).json({
      totalproducts,
      totalPages: Math.ceil(totalproducts / limit),
      currentPage,
      products: transformedProducts,
    });
  } catch (error) {
    //console.error("Error fetching products:", error); // Log for debugging
    res.status(500).json({
      message: "Error fetching products",
      error: error.message || error,
    });
  }
};

const deleteProduct = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  if (TokenUserRole !== "SuperAdmin") {
    return res.status(403).json({
      message: "Access denied: Only Sellers can create products.",
    });
  }

  try {
    const { productId } = req.params; // Change userId to productId

    // Check if productId is provided
    if (!productId) {
      return res
        .status(400)
        .json({ message: "Product ID is required to delete the product." });
    }

    // Attempt to find and delete the product
    const product = await Product.findByIdAndDelete(productId);

    // Check if the product was found
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${productId} not found.` });
    }
    // Step 3: Log this reservation action in the History model
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: `Product deleted by ${req.email} Id ${product._id}`, // General type/category of the activity
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();
    // Return success response
    res.status(200).json({
      message: "Product deleted successfully!",
      productId: product._id, // Return the product ID in the response
    });
  } catch (error) {
    //console.error("Error deleting product:", error);

    // Handle server errors
    res.status(500).json({
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
};

const productView = async (req, res) => {
  try {
    const { id } = req.params; // Get product id from request parameters

    // Find product by id
    const product = await Product.findById(id).select(
      "keyword amzSeller brandName market productType productStatus saleLimitPerDay overAllSaleLimit adverzProCommission userId image1Url chineseSeller _id istatus image2Url image1Url remaningSaleLimit commissionConditions refundConditions instructions"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Access granted to product:", product._id); // Log product ID if access is allowed
    // Create the response structure based on the product details
    const productDetails = {
      Keyword: product.keyword, // Format: ORD-<ProductId>
      SoldBy: product.amzSeller, // Seller email or ID
      BrandName: product.brandName, // Assuming productType is the brand name
      ProductID: product._id, // Example - Link to product image URL
      Market: product.market, // Market (e.g., US, UK, etc.)
      Commission: product.adverzProCommission, // Commission (from the product)
      chineseSeller: product.chineseSeller, // Creation date of product (as an example for ChineseSeller date)
      ProductType: product.productType, // Product Type (from the product)
      SellerName: product.userId, // Seller's name (you might want to adjust this field)
      OverallSaleLimit: product.overAllSaleLimit, // Overall sale limit for the product
      DailySaleLimit: product.saleLimitPerDay, // Daily sale limit for the product
      Instructions: product.instructions, // Static example instructions
      RefundCondition: product.refundConditions, // Static refund condition
      CommissionCondition: product.commissionConditions, // Dynamic commission condition based on product commission
      image1Url: product.image1Url, // Add image1Url dynamically from productData
      image2Url: product.image2Url, // Add image2Url dynamically from productData
      remaningSaleLimit: product.remaningSaleLimit,
    };

    console.log(productDetails);
    return res.status(200).json(productDetails);
  } catch (error) {
    //console.error("Error fetching product details:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching product details" });
  }
};

const updateProductStatus = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  if (TokenUserRole == "Pm") {
    return res.status(403).json({
      message: "Access denied: Only Sellers can create products.",
    });
  }

  // Extract productId from the request body
  const { productId } = req.body;

  try {
    // Find the product by its ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }
    if (
      TokenuserId !== product.userId.toString() &&
      TokenUserRole !== "SuperAdmin" &&
      TokenUserRole !== "Admin"
    ) {
      console.log("Access attempt by user:", TokenuserId);
      console.log("Product belongs to user:", product.userId.toString()); // Convert to string for logging

      return res.status(403).json({
        message: "Access denied: You can only access your own products.",
      });
    }

    // Toggle the product status based on the current value
    product.istatus = product.istatus === "enable" ? "disable" : "enable";

    // Save the updated product
    await product.save();
    // Step 3: Log this reservation action in the History model
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: `Product status updated by ${req.email} Id ${product._id}`, // General type/category of the activity
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();
    console.log("Product status updated successfully:", product);
    res.status(200).json({
      message: `Product status updated to ${product.istatus}.`,
      product,
    });
  } catch (error) {
    //console.error("Error updating product status:", error);
    res.status(500).json({
      message: "An error occurred while updating the product status.",
      error: error.message, // Adding error details for better debugging
    });
  }
};

const updateProduct = async (req, res) => {
  console.log("submit update product form");
  try {
    const { id } = req.params; // Get product ID from request parameters

    // Extract data from the request body
    const {
      keyword,
      amzSeller,
      brandName,
      market,
      chineseSeller,
      category,
      productType,
      commission, // renamed to `commission` (AdverzPro commission)
      mercantileCommission, // Mercantile Commission
      instruction,
      commissionConditions,
      refundConditions, // Refund conditions field
      saleLimit,
      overallSaleLimit,
    } = req.body;

    // Validate commission and mercantileCommission
    if (mercantileCommission && mercantileCommission < 175) {
      return res.status(400).json({
        message: "Mercantile commission must be at least 175.",
      });
    }

    if (commission) {
      // Check the product type and apply the respective minimum commission
      let minCommission = 700; // Default commission minimum

      if (
        productType === "No review" ||
        productType === "Feedback" ||
        productType === "Rating"
      ) {
        minCommission = 200;
      } else if (productType === "Pic Review" || productType === "Vid Review") {
        minCommission = 800;
      }

      // Check if the commission is below the required minimum
      if (commission < minCommission) {
        return res.status(400).json({
          message: `Commission must be at least ${minCommission}.`,
        });
      }
    }

    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Track if any limit fields are updated
    let saleLimitUpdated = false;
    let overallSaleLimitUpdated = false;

    // Update only the fields that are provided in the request body
    if (keyword) product.keyword = keyword;
    if (brandName) product.brandName = brandName;
    if (instruction) product.instructions = instruction;

    // Sale Limit Updates
    if (saleLimit) {
      // Log the old and new saleLimit value if it changed
      if (product.saleLimitPerDay !== saleLimit) {
        saleLimitUpdated = true;
        product.saleLimitPerDay = saleLimit;
      }
    }

    // Overall Sale Limit Updates
    if (overallSaleLimit) {
      // Log the old and new overallSaleLimit value if it changed
      if (product.overAllSaleLimit !== overallSaleLimit) {
        overallSaleLimitUpdated = true;
        product.overAllSaleLimit = overallSaleLimit;
      }
    }

    if (commission) product.adverzProCommission = commission; // Mapping to adverzProCommission
    if (commissionConditions)
      product.commissionConditions = commissionConditions;
    if (amzSeller) product.amzSeller = amzSeller;
    if (market) product.market = market;
    if (chineseSeller) product.chineseSeller = chineseSeller;
    if (category) product.category = category;
    if (productType) product.productType = productType;
    if (mercantileCommission)
      product.mercantileCommission = mercantileCommission;
    if (refundConditions) product.refundConditions = refundConditions;

    // Save the updated product to the database
    await product.save();

    // Create history logs for saleLimit and overallSaleLimit updates
    if (saleLimitUpdated) {
      const saleLimitHistory = new History({
        role: req.role, // Role of the user performing the action (e.g., "Pm")
        userId: req.userId, // User ID (the person making the reservation)
        email: req.email, // User email (assuming it's available in the request)
        actionType: "update", // Action type (this is the action performed)
        type: `Product updated by ${req.email} - Sale limit updated for Product ID ${product._id}. New Sale Limit: ${product.saleLimitPerDay}`, // Activity description
      });

      console.log(saleLimitHistory);
      // Save the history entry to the database
      await saleLimitHistory.save();
    }

    if (overallSaleLimitUpdated) {
      const overallSaleLimitHistory = new History({
        role: req.role, // Role of the user performing the action (e.g., "Pm")
        userId: req.userId, // User ID (the person making the reservation)
        email: req.email, // User email (assuming it's available in the request)
        actionType: "update", // Action type (this is the action performed)
        type: `Product updated by ${req.email} - Overall Sale Limit updated for Product ID ${product._id}. New Overall Sale Limit: ${product.overAllSaleLimit}`, // Activity description
      });

      console.log(overallSaleLimitHistory);
      // Save the history entry to the database
      await overallSaleLimitHistory.save();
    }

    // Return success response with updated product data
    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
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
    const order = await Product.findById(Id); // Find the order in the database by ID
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const updatedOrderData = {}; // Object to store the updates

    // Based on the name, update the respective image field
    if (name === "Product Picture") {
      updatedOrderData.image1Url = imageUrl; // Assign to image1Url
    } else if (name === "AMZ Picture") {
      updatedOrderData.image2Url = imageUrl; // Assign to image2Url
    } else {
      return res.status(400).json({ error: "Invalid picture name" });
    }

    // Update the order with the new image URL
    const updatedOrder = await Product.findByIdAndUpdate(Id, updatedOrderData, {
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
  products,
  createProduct,
  deleteProduct,
  updateProductStatus,
  productView,
  updateProduct,
  updatePics,
};
