const { User, Image, History } = require("../models/schema.js");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  // Default to a valid system user ID if createdBy is not provided
  const TokencreatedBy = req.email;
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(TokenUserRole);

  // Only allow Admins or SuperAdmins to create products
  if (TokenUserRole !== "Admin" && TokenUserRole !== "SuperAdmin") {
    return res.status(403).json({
      message: "Access denied: Only Admin or SuperAdmin can add products.",
    });
  }

  try {
    const {
      name,
      email,
      userName,
      password,
      role,
      gender,
      phone,
      address,
      frontPicUrl,
      backPicUrl,
      profilePicUrl,
      bankName,
      accountNumber,
    } = req.body;

    // Step 1: Check for missing required fields
    const missingFields = [];
    if (!name) missingFields.push("name");
    if (!email) missingFields.push("email");
    if (!userName) missingFields.push("userName");
    if (!password) missingFields.push("password");
    if (!role) missingFields.push("role");
    if (!gender) missingFields.push("gender");
    if (!phone) missingFields.push("phone");
    if (!address) missingFields.push("address");
    if (!frontPicUrl) missingFields.push("frontPicUrl");
    if (!backPicUrl) missingFields.push("backPicUrl");
    if (!profilePicUrl) missingFields.push("profilePicUrl");
    if (!bankName) missingFields.push("bankName");
    if (!accountNumber) missingFields.push("accountNumber");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `The following required fields are missing: ${missingFields.join(
          ", "
        )}.`,
      });
    }

    // Step 2: Check if the email is already in use
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message:
          "The email address is already in use. Please use a different email.",
      });
    }

    // Step 3: Check if the username is already taken
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(400).json({
        message:
          "The username is already taken. Please choose a different username.",
      });
    }

    // Step 4: Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10); // Generate a salt (rounds of hashing)
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Step 5: Create a new user
    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword, // Store the hashed password, not plain text
      role,
      gender,
      phone,
      address,
      frontPicUrl,
      backPicUrl,
      profilePicUrl,
      createdBy: TokencreatedBy, // Add createdBy field
      bankName,
      accountNumber,
    });

    // Step 6: Save the user to the database
    await newUser.save();

    // Step 7: Return a success response
    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email, // You can also exclude email for privacy reasons
        role: newUser.role,
      },
    });
  } catch (error) {
    // Step 8: Handle errors (e.g., validation, MongoDB issues)
    //console.error("Error creating user:", error);
    res.status(500).json({
      message: "An error occurred while creating the user.",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const TokencreatedBy = req.email;
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(TokenUserRole);

  // Only allow Admins or SuperAdmins to create products
  if (TokenUserRole !== "Admin" && TokenUserRole !== "SuperAdmin") {
    return res.status(403).json({
      message: "Access denied: Only Admin or SuperAdmin can add products.",
    });
  }

  try {
    const { userId } = req.params; // Assuming userId is passed in the URL
    const {
      name,
      email,
      userName,
      role,
      gender,
      phone,
      status,
      address,
      bankName,
      accountNumber,
    } = req.body;
    console.log(req.body);
    // Validate if at least one field is provided for update
    const updatedFields = {};

    // Add the fields for updating
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (userName) updatedFields.userName = userName;
    if (role) updatedFields.role = role;
    if (gender) updatedFields.gender = gender;
    if (phone) updatedFields.phone = phone;
    if (address) updatedFields.address = address;
    if (status) updatedFields.status = status;
    if (bankName) updatedFields.bankName = bankName;
    if (accountNumber) updatedFields.accountNumber = accountNumber;

    // If no fields provided to update, return an error
    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({
        message: "No fields to update provided.",
      });
    }

    // Validate Role and Status before updating
    const validRoles = ["SuperAdmin", "Admin", "Seller", "Pm"];
    const validStatuses = ["active", "blocked", "warned"];

    if (updatedFields.role && !validRoles.includes(updatedFields.role)) {
      return res.status(400).json({
        message: "Invalid role provided.",
      });
    }

    if (updatedFields.status && !validStatuses.includes(updatedFields.status)) {
      return res.status(400).json({
        message:
          "Invalid status provided. Valid statuses are: active, warning, blocked.",
      });
    }

    // Find the existing user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Check if email or username already exists (if they are being updated)
    if (updatedFields.email) {
      const existingEmail = await User.findOne({ email: updatedFields.email });
      if (existingEmail && existingEmail._id.toString() !== userId) {
        return res.status(400).json({
          message:
            "The email address is already in use by another user. Please use a different email.",
        });
      }
    }

    if (updatedFields.userName) {
      const existingUserName = await User.findOne({
        userName: updatedFields.userName,
      });
      if (existingUserName && existingUserName._id.toString() !== userId) {
        return res.status(400).json({
          message:
            "The username is already taken by another user. Please choose a different username.",
        });
      }
    }

    // Update the user with the new data
    Object.assign(user, updatedFields);

    // Save the updated user
    await user.save();
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: "User update", // General type/category of the activity
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();
    // Return success response
    res.status(200).json({
      message: "User updated successfully!",
      user,
    });
  } catch (error) {
    // Handle errors (e.g., validation, MongoDB issues)
    //console.error("Error updating user:", error);
    res.status(500).json({
      message: "An error occurred while updating the user.",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const TokencreatedBy = req.email;
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(TokenUserRole);

  // Only allow Admins or SuperAdmins to create products
  if (TokenUserRole !== "SuperAdmin") {
    return res.status(403).json({
      message: "Access denied: Only Admin or SuperAdmin can add products.",
    });
  }
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "User ID is required to delete the user." });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: `User with ID ${userId} not found.` });
    }
    // Step 3: Log this reservation action in the History model
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: "User deleted", // General type/category of the activity
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();
    res.status(200).json({
      message: "User deleted successfully!",
      userId: user._id,
    });
  } catch (error) {
    //console.error("Error deleting user:", error);

    res.status(500).json({
      message: "An error occurred while deleting the user.",
      error: error.message,
    });
  }
};

const updateUserStatus = async (req, res) => {
  const TokencreatedBy = req.email;
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(TokenUserRole);

  // Only allow Admins or SuperAdmins to create products
  if (TokenUserRole !== "Admin" && TokenUserRole !== "SuperAdmin") {
    return res.status(403).json({
      message: "Access denied: Only Admin or SuperAdmin can add products.",
    });
  }
  const { userId } = req.body;
  console.log("User Id:", userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let newStatus;
    if (user.status === "blocked") {
      newStatus = "active";
    } else if (user.status === "active") {
      newStatus = "warned";
    } else if (user.status === "warned") {
      newStatus = "blocked";
    } else {
      return res.status(400).json({
        message:
          "Invalid current status value. Status must be 'active', 'warned', or 'blocked'.",
      });
    }

    user.status = newStatus;
    await user.save();
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "delete", // Action type (this is the action performed)
      type: "User status updated", // General type/category of the activity
    });
    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();
    console.log("User status updated successfully:", user);
    res
      .status(200)
      .json({ message: `User status updated to ${newStatus}.`, user });
  } catch (error) {
    //console.error("Error updating user status:", error);
    res.status(500).json({
      message: "An error occurred while updating the user status.",
    });
  }
};

const users = async (req, res) => {
  const TokencreatedBy = req.email;
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(TokenUserRole);

  // Only allow Admins or SuperAdmins to create products
  if (TokenUserRole !== "Admin" && TokenUserRole !== "SuperAdmin") {
    return res.status(403).json({
      message: "Access denied: Only Admin or SuperAdmin can add products.",
    });
  }
  try {
    // Extract query parameters
    const {
      userRole = "all",
      userStatus = "all",
      page = 1,
      size = 10,
    } = req.query;

    // Validate page and size
    const limit = Math.max(1, parseInt(size)); // Default size to 10 if invalid
    const currentPage = Math.max(1, parseInt(page)); // Default page to 1 if invalid
    const skip = (currentPage - 1) * limit;

    console.log("Request Query:", req.query); // Log for debugging

    // Construct filter object based on query parameters
    const filter = {};
    if (userRole !== "all") filter.role = userRole;
    if (userStatus !== "all") filter.status = userStatus;

    // Fetch users with filtering and pagination
    const users = await User.find(filter)
      .select("phone userName email status role createdBy createdAt")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by lastUpdateDate in descending order

    // Count total users based on the same filters
    const totalUsers = await User.countDocuments(filter);

    // Return paginated response
    res.status(200).json({
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage,
      users,
    });
  } catch (error) {
    //console.error("Error fetching users:", error); // Log error for debugging
    res.status(500).json({
      message: "Error fetching users",
      error: error.message || error, // Return a more specific error message
    });
  }
};

const updateUserPassword = async (req, res) => {
  const TokencreatedBy = req.email;
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;

  console.log("Token User Role: ", TokenUserRole);

  // Only allow SuperAdmins to change Admin or SuperAdmin passwords
  // if (TokenUserRole !== "SuperAdmin") {
  //   return res.status(403).json({
  //     message:
  //       "Access denied: Only SuperAdmin can change passwords for Admins or SuperAdmins.",
  //   });
  // }

  try {
    // Extract necessary data from the request body
    const { userId, oldPassword, newPassword, repeatPassword, reason } =
      req.body;
    console.log("Request Body: ", req.body);

    // Check if all required fields are provided
    if (!userId || !oldPassword || !newPassword || !repeatPassword || !reason) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validate that the new password and repeat password match
    if (newPassword !== repeatPassword) {
      return res
        .status(400)
        .json({ message: "New password and repeat password do not match." });
    }

    // Password strength validation (optional, but recommended)
    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "Password should be at least 8 characters long.",
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the current user is allowed to change this user's password
    // SuperAdmins can change Admin or SuperAdmin passwords
    if (user.role === "Admin" || user.role === "SuperAdmin") {
      if (TokenUserRole !== "SuperAdmin") {
        return res.status(403).json({
          message:
            "Access denied: Only SuperAdmin can change the password of Admin or SuperAdmin.",
        });
      }
    }

    // Allow Sellers and PMs to change their own password
    if (user.role === "Seller" || user.role === "PM") {
      if (user._id.toString() !== TokenuserId.toString()) {
        return res.status(403).json({
          message: "Access denied: You can only update your own password.",
        });
      }
    }

    // Compare the old password with the hashed password in the database
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    // Hash the new password before saving it to the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password and other relevant fields
    user.password = hashedPassword; // Save the hashed password
    user.passwordChangedAt = Date.now(); // Track when the password was changed
    user.passwordChangeReason = reason; // Store the reason for the password change

    // Save the user record with the updated password
    await user.save();
    const newHistory = new History({
      role: req.role, // Role of the user performing the action (e.g., "Pm")
      userId: req.userId, // User ID (the person making the reservation)
      email: req.email, // User email (assuming it's available in the request)
      actionType: "update", // Action type (this is the action performed)
      type: "Password Updated for User Successfully", // General type/category of the activity
    });

    console.log(newHistory);
    // Save the history entry to the database
    await newHistory.save();
    // Respond with success message
    res.status(200).json({ message: "Password update successful!" });
  } catch (error) {
    //console.error("Error updating password:", error);
    res.status(500).json({
      message: "An error occurred while updating the password.",
    });
  }
};

const getUserDetails = async (req, res) => {
  const TokencreatedBy = req.email;
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(TokenUserRole);

  try {
    const { id } = req.params; // Get user id from request parameters

    // Find user by id
    const user = await User.findById(id).select(
      "name userName gender role email phone address status bankName accountNumber _id profilePicUrl"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userdetails = {
      userId: user._id,
      name: user.name,
      status: user.status,
      userName: user.userName,
      gender: user.gender,
      userRole: user.role,
      posts: 0, // Example data, update if posts are stored elsewhere
      followers: 0, // Example data, update if followers are stored elsewhere
      following: 0, // Example data, update if following count is stored elsewhere
      email: user.email,
      phone: user.phone,
      address: user.address,
      bankName: user.bankName, // Example data, replace if bank info is stored in User model
      accountNumber: user.accountNumber, // Example data, replace if account info is stored in User model
      profilePicUrl: user.profilePicUrl,
    };

    console.log(userdetails);
    return res.status(200).json(userdetails);
  } catch (error) {
    //console.error("Error fetching user details:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching user details" });
  }
};

const getUserProfile = async (req, res) => {
  const TokenUserRole = req.role;
  const TokenuserId = req.userId;
  console.log(TokenUserRole);

  try {
    const id = TokenuserId;

    const user = await User.findById(id).select(
      "name userName gender role email phone address status bankName accountNumber _id profilePicUrl"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userdetails = {
      userId: user._id,
      name: user.name,
      status: user.status,
      userName: user.userName,
      gender: user.gender,
      userRole: user.role,
      posts: 0, // Example data, update if posts are stored elsewhere
      followers: 0, // Example data, update if followers are stored elsewhere
      following: 0, // Example data, update if following count is stored elsewhere
      email: user.email,
      phone: user.phone,
      address: user.address,
      bankName: user.bankName,
      accountNumber: user.accountNumber,
      profilePicUrl: user.profilePicUrl,
    };

    console.log(userdetails);
    return res.status(200).json(userdetails);
  } catch (error) {
    //console.error("Error fetching user details:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching user details" });
  }
};

const toggleAccountLock = async (req, res) => {
  const TokenuserId = req.userId;

  try {
    const user = await User.findById(TokenuserId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAccountLocked = !user.isAccountLocked; // If locked, unlock it; if unlocked, lock it

    // Save the updated user object
    await user.save();

    // Respond with the updated user and status
    return res.status(200).json({
      message: `Account has been ${
        user.isAccountLocked ? "locked" : "unlocked"
      }`,
      user: { name: user.name, isAccountLocked: user.isAccountLocked },
    });
  } catch (error) {
    //console.error("Error toggling account lock:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

module.exports = {
  users,
  createUser,
  updateUser,
  updateUserStatus,
  getUserDetails,
  deleteUser,
  updateUserPassword,
  toggleAccountLock,
  getUserProfile,
};
