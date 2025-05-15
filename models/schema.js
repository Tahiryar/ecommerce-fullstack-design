const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

const UserSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },

  role: {
    type: String,
    enum: ["SuperAdmin", "Admin", "Seller", "Pm"],
    default: "Pm",
  },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["active", "blocked", "warned"],
    default: "active",
  },
  bankName: { type: String }, // Add Bank Name field
  accountNumber: {
    type: String,
  },
  frontPicUrl: { type: String },
  backPicUrl: { type: String },
  profilePicUrl: { type: String },
  isAccountLocked: {
    type: Boolean,
    default: false, // By default, the account is unlocked
  },
});

const ProductSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User ID (related to seller)
  keyword: [{ type: String, required: true }], // Array of keywords for product search
  brandName: { type: String, required: true }, // Brand name
  amzSeller: { type: String, required: true }, // Amazon seller ID
  market: { type: String, required: true }, // Market (e.g., US, UK)
  chineseSeller: { type: String, required: true }, // Whether the seller is Chinese
  category: { type: String, required: true }, // Category of the product
  productType: { type: String, required: true }, // Product type (e.g., electronics, fashion)
  image1Url: { type: String, required: true }, // URL for image 1
  image2Url: { type: String, required: true }, // URL for image 2
  adverzProCommission: { type: Number, required: true }, // Commission for AdverzPro
  mercantileCommission: { type: Number, required: true }, // Mercantile commission

  createdAt: { type: Date, default: Date.now }, // Timestamp for product creation
  instructions: { type: String, required: true }, // Product instructions
  refundConditions: { type: String }, // Refund conditions (optional if needed)
  commissionConditions: { type: String, required: true }, // Conditions for commission

  saleLimitPerDay: { type: Number, required: true }, // Sale limit per day
  overAllSaleLimit: { type: Number, required: true }, // Overall sale limit
  remaningSaleLimit: { type: Number },
  istatus: {
    type: String,
    enum: ["enable", "disable"],
    default: "enable", // Default status is 'active'
  },
});

const OrderSchema = new Schema(
  {
    orderNo: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },
    customerEmailAddress: { type: String, required: true, match: /.+\@.+\..+/ },
    image1Url: { type: String, required: true },
    image2Url: { type: String },
    image3Url: { type: String },
    commission: { type: String },
    amzReviewLink: { type: String },
    market: { type: String, required: true },
    productType: { type: String, required: true },
    status: {
      type: String,
      enum: ORDER_STATUS,
      default: "Ordered",
    },
    sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    createDate: { type: Date, default: Date.now },
    reviewDate: {
      type: Date,
    },
    refundDate: {
      type: Date,
    },
    lastUpdateDate: {
      type: Date,
    },
    remarks: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User
        remark: { type: String }, // The actual remark
        createdAt: { type: Date, default: Date.now }, // Timestamp for when the remark was added
      },
    ],

    statusHistory: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User
        previousStatus: { type: String }, // The previous status before the change
        updatedToStatus: { type: String }, // The new status after the change
        updatedAt: { type: Date, default: Date.now }, // Timestamp when the status change occurred
      },
    ],
  },

  { timestamps: true }
);

const ReservationSchema = new Schema({
  sellerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  createdAt: { type: Date, default: Date.now },
});

const userActivityHistorySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String, // Role of the user (e.g., "admin", "user")
    required: true, // This field is required
  },
  actionType: {
    type: String,
    enum: ["insert", "update", "delete"],
    required: true,
  },
  actionTimestamp: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    required: true,
  },
});

const LoginHistorySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  loginTimestamp: {
    type: Date,
    default: Date.now, // Automatically set to the current time when the document is created
  },
  ipAddress: {
    type: String,
    required: true, // Track the IP address of the user during login
  },
  loginStatus: {
    type: String,
    enum: ["success", "failure"], // Status of the login attempt
    required: true,
  },
});

const CommissionSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true }, // Reference to Order
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User (the seller)
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to Product
  totalAmount: { type: Number, required: true }, // Total amount of the order
  portalFees: { type: Number, required: true }, // Portal fees associated with the order
  netCommission: { type: Number, required: true }, // Net commission after refund and portal fees
  amountPaid: { type: Number, default: 0 }, // Amount paid so far
  remainingAmount: {
    type: Number,
    default: function () {
      return this.netCommission - this.amountPaid;
    },
  }, // Amount remaining to be paid
  paymentHistory: [
    {
      paidAmount: { type: Number, required: true }, // Amount paid in the transaction
      paidBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who made the payment
      paidAt: { type: Date, default: Date.now }, // Date and time when the payment was made
      paymentMethod: { type: String, required: true }, // Method of payment (e.g., "Bank Transfer", "PayPal", etc.)
      remarks: { type: String }, // Any additional remarks about the payment
    },
  ],
  createdAt: { type: Date, default: Date.now }, // Timestamp when the commission record was created
  updatedAt: { type: Date, default: Date.now }, // Timestamp for when the record was last updated
});

const Commission = mongoose.model("Commission", CommissionSchema);
const User = mongoose.model("User", UserSchema);
const Product = mongoose.model("Product", ProductSchema);
const Reservation = mongoose.model("Reservation", ReservationSchema);
const Order = mongoose.model("Order", OrderSchema);
const History = mongoose.model("History", userActivityHistorySchema);
const LoginHistory = mongoose.model("LoginHistory", LoginHistorySchema);

module.exports = { Product, User, Reservation, Order, History, LoginHistory };
