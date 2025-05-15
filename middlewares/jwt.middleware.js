const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "Nabeel$2004"; // Secret key from environment variable

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Token is expected to be in the cookies

  // Check if the token is not present
  if (!token) {
    return res
      .status(403)
      .json({ message: "Token is required for authentication." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user information to the request object
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    //console.error("Token verification failed:", err);
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

module.exports = verifyToken;
