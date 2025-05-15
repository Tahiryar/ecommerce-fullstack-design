// Import dependencies
const jwt = require("jsonwebtoken");
const { User, LoginHistory } = require("../models/schema.js");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// JWT Secret and Expiration Time (use environment variables for security)
const JWT_SECRET = process.env.JWT_SECRET || "Nabeel$2004"; // Avoid hardcoding sensitive information
const JWT_EXPIRES_IN = "2h"; // JWT expiration time (e.g., 2 hours)

// Login controller
const login = async (req, res) => {
  const { email, password } = req.body;

  // Step 1: Validate if both fields (email and password) are provided
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  // Step 2: Validate the email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Step 3: Check if password meets minimum length (e.g., 6 characters)
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long." });
  }

  try {
    // Step 4: Check if the user exists in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      // Record login failure for non-existent user
      return res.status(404).json({ message: "User not found" });
    }

    // Step 5: Check if the account is locked
    if (user.isAccountLocked) {
      return res.status(403).json({
        message: "Your account is currently logged in on another device.",
      });
    }

    // Step 5: Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const ipAddress = req.ip || "127.0.0.1"; // Fallback IP address
      const loginHistory = new LoginHistory({
        userId: user._id,
        email: user.email,
        ipAddress: ipAddress,
        loginStatus: "failure", // Incorrect password, login failed
      });
      await loginHistory.save(); // Save login failure record

      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Step 6: Generate a JWT token with expiration time (JWT_EXPIRES_IN)
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN } // Expiration time from the hard-coded value
    );

    // Step 7: Set the JWT token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Token is only accessible through HTTP (not JavaScript)
      secure: process.env.NODE_ENV === "production", // Only use cookies over HTTPS in production
      maxAge: 3600 * 1000, // Cookie expiration time (1 hour in milliseconds)
      sameSite: "Strict", // Helps prevent Cross-Site Request Forgery (CSRF)
    });

    // Step 9: Store login history
    const loginHistory = new LoginHistory({
      userId: user._id,
      email: user.email,
      ipAddress: req.ip || "000.0.0.0", // Capture the IP address of the user
      loginStatus: "success", // Login was successful
    });
    await loginHistory.save(); // Save the login history record

    // Step 8: Optionally, you can store the token in localStorage (for client-side access)
    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Backend route to handle logout and clear the token cookie

const logout = async (req, res) => {
  try {
    // Extract userId from the decoded token, assuming it's stored in req.userId
    const userId = req.userId; // This is typically set after JWT verification middleware

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the account is locked, and unlock it if necessary (optional, based on your business logic)
    if (user.isAccountLocked) {
      user.isAccountLocked = false;
      await user.save(); // Save the updated user object if account was locked
    }

    console.log(`User ${userId} logging out...`);

    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true, // Cookie is inaccessible via JavaScript
      secure: false, // Use true in production (HTTPS)
      sameSite: "Strict", // Prevent CSRF attacks
      path: "/", // Ensure path matches the one set during login
    });

    // Send response confirming successful logout
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "An error occurred during logout" });
  }
};

// const logout = async (req, res) => {
//   console.log("Logging out...");

//   // Assuming the email is passed in the request body
//   const TokenuserId = req.userId;

//   // Find the user by email
//   const user = await User.findOne({ TokenuserId });
//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   // Step 5: Check if the account is locked
//   if (user.isAccountLocked) {
//     user.isAccountLocked = false;
//     // Save the updated user object
//     await user.save();
//   }

//   // Clear the cookie
//   res.clearCookie("token", {
//     httpOnly: true, // Ensures the cookie is not accessible via JavaScript
//     secure: false, // Set to true if using HTTPS in production
//     sameSite: "Strict", // Helps prevent CSRF attacks
//     path: "/", // Ensure path matches what was set during login
//   });

//   // Send response confirming successful logout
//   res.status(200).json({ message: "Logout successful" });
// };
module.exports = { login, logout };
