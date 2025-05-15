const { Product } = require("../models/schema.js");
const cron = require("node-cron");
const moment = require("moment-timezone");

// Set your desired timezone
const timezone = "Asia/Karachi"; // Set to Asia/Karachi time zone

// Define the cron schedule for 12:00 PM in the specified timezone
cron.schedule(
  "0 12 * * *", // 12:00 PM daily
  async () => {
    try {
      const currentTime = moment.tz(timezone);
      console.log(
        `Cron job started at: ${currentTime.format("YYYY-MM-DD HH:mm:ss")}`
      );

      const products = await Product.find({ istatus: "enable" });

      for (let product of products) {
        if (product.saleLimitPerDay > 0) {
          // Ensure remainingSaleLimit does not exceed overallSaleLimit
          if (product.saleLimitPerDay > 0) {
            product.remaningSaleLimit = Math.min(
              product.saleLimitPerDay,
              product.overAllSaleLimit
            );
          }
        }

        if (product.overAllSaleLimit > 0 && product.remaningSaleLimit <= 0) {
          product.istatus = "disable"; // Or apply any other necessary logic
        }

        await product.save();
      }

      console.log(
        "Product sale limits reset successfully at 12:00 PM in Asia/Karachi timezone"
      );
    } catch (error) {
      //console.error("Error resetting sale limits:", error);
    }
  },
  {
    scheduled: true,
    timezone: timezone, // Ensure the cron job runs in the specified timezone
  }
);

module.exports = {};
