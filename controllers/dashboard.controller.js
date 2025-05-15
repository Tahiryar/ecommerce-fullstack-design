const {
  Product,
  User,
  Order,
  Reservation,
  LoginHistory,
} = require("../models/schema.js");
const mongoose = require("mongoose");
const moment = require("moment-timezone");

const Dashboard = async (req, res) => {
  const { role: TokenUserRole, userId: TokenuserId } = req;
  const userObjectId = new mongoose.Types.ObjectId(TokenuserId);
  const userRole = TokenUserRole;

  // Initialize the filter for orders
  const orderFilter = {};
  const productFilter = {};

  // Default fallback timezone if not provided
  // const timezone = req.timezone || "UTC"; // Use the timezone from the request or default to UTC
  const timezone = "Asia/Karachi";
  const currentTime = moment().tz(timezone);

  // console.log(
  //   "Current Time Zone:",
  //   moment(currentTime).format("YYYY-MM-DD HH:mm:ss")
  // );

  // Get the start and end of the current month based on the user's timezone
  const startOfMonth = moment().tz(timezone).startOf("month").toDate(); // Start of the month
  const endOfMonth = moment().tz(timezone).endOf("month").toDate(); // End of the month
  // console.log(
  //   "Start of the Month:",
  //   moment(startOfMonth).format("YYYY-MM-DD HH:mm:ss")
  // );
  // console.log(
  //   "End of the Month:",
  //   moment(endOfMonth).format("YYYY-MM-DD HH:mm:ss")
  // );

  // Apply filters based on the role of the user
  if (TokenUserRole === "Seller") {
    orderFilter.sellerId = userObjectId; // Filter orders for the specific seller
    productFilter.userId = userObjectId; // Filter orders for the specific seller
  }

  if (TokenUserRole === "Pm") {
    orderFilter.userId = userObjectId; // Filter orders for the specific PM
    productFilter.userId = userObjectId; // Filter orders for the specific seller
  }

  if (
    TokenUserRole !== "SuperAdmin" &&
    TokenUserRole !== "Admin" &&
    TokenUserRole !== "Seller" &&
    TokenUserRole !== "Pm"
  ) {
    // If the role is not valid, return 0 counts for orders
    return res.status(200).json({
      totalUser: 0,
      totalAdmin: 0,
      totalSeller: 0,
      totalPm: 0,
      activePm: 0,
      blockedPm: 0,
      warnedPm: 0,
      totalProducts: 0,
      activeProducts: 0,
      disabledProducts: 0,
      totalOrders: 0,
      ordered: 0,
      reviewed: 0,
      delivered: 0,
      refunded: 0,
      onHold: 0,
      deleted: 0,
      completed: 0,
      cancelled: 0,
      userReservation: 0,
      totalReservation: 0,
      totalRefundedCommission: 0,
      weeklyLoginCounts: [],
    });
  }

  try {
    // Only run aggregation if the TokenUserRole is valid, otherwise set counts to 0
    const counts =
      TokenUserRole === "SuperAdmin" || TokenUserRole === "Admin"
        ? await User.aggregate([
            {
              $facet: {
                totalUser: [{ $count: "count" }],
                totalAdmin: [
                  { $match: { role: "Admin" } },
                  { $count: "count" },
                ],
                totalSeller: [
                  { $match: { role: "Seller" } },
                  { $count: "count" },
                ],
                totalPm: [{ $match: { role: "Pm" } }, { $count: "count" }],
                activePm: [
                  { $match: { role: "Pm", status: "active" } },
                  { $count: "count" },
                ],
                blockedPm: [
                  { $match: { role: "Pm", status: "blocked" } },
                  { $count: "count" },
                ],
                warnedPm: [
                  { $match: { role: "Pm", status: "warned" } },
                  { $count: "count" },
                ],
              },
            },
          ])
        : [
            {
              // Return default counts if role is not valid
              totalUser: [{ count: 0 }],
              totalAdmin: [{ count: 0 }],
              totalSeller: [{ count: 0 }],
              totalPm: [{ count: 0 }],
              activePm: [{ count: 0 }],
              blockedPm: [{ count: 0 }],
              warnedPm: [{ count: 0 }],
            },
          ];

    const productCount = await Product.aggregate([
      {
        $match: productFilter, // Apply the filter based on the role of the user
      },
      {
        $facet: {
          totalProducts: [{ $count: "count" }],
          activeProducts: [
            { $match: { istatus: "enable" } }, // Filter for active products
            { $count: "count" },
          ],
          disabledProducts: [
            { $match: { istatus: "disable" } }, // Filter for disabled products
            { $count: "count" },
          ],
        },
      },
    ]);

    const orderCount = await Order.aggregate([
      {
        $match: orderFilter, // Apply the filter based on the role of the user
      },
      {
        $facet: {
          totalOrders: [{ $count: "count" }],
          ordered: [{ $match: { status: "Ordered" } }, { $count: "count" }],
          reviewed: [{ $match: { status: "Reviewed" } }, { $count: "count" }],
          delivered: [{ $match: { status: "Delivered" } }, { $count: "count" }],
          refunded: [{ $match: { status: "Refunded" } }, { $count: "count" }],
          onHold: [{ $match: { status: "OnHold" } }, { $count: "count" }],
          deleted: [{ $match: { status: "Deleted" } }, { $count: "count" }],
          completed: [{ $match: { status: "Completed" } }, { $count: "count" }],
          cancelled: [{ $match: { status: "Cancelled" } }, { $count: "count" }],
        },
      },
    ]);

    const reservationCount = await Reservation.aggregate([
      {
        $facet: {
          totalReservation: [{ $count: "count" }],
          userReservation: [
            {
              $match:
                TokenUserRole === "Seller"
                  ? { sellerId: userObjectId } // Match reservations for this seller
                  : { userId: TokenuserId }, // Default: match reservations for the current user
            },
            { $count: "count" },
          ],
        },
      },
    ]);
    // Aggregate monthly refunded commission
    const monthlyCommission = await Order.aggregate([
      {
        $match: {
          ...orderFilter,
          status: "Refunded",
          refundDate: { $gte: startOfMonth, $lte: endOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalRefundedCommission: {
            $sum: { $toDouble: "$commission" },
          },
        },
      },
    ]);

    // The function for getting weekly login counts
    const getWeeklyLoginCounts = async (userObjectId, userRole) => {
      // Get the start and end of the current week based on the user's timezone
      const startOfWeek = moment().tz(timezone).startOf("week").toDate(); // Start of the week (Sunday)
      const endOfWeek = moment().tz(timezone).endOf("week").toDate(); // End of the week (Saturday)

      // console.log(
      //   "Start of the Week:",
      //   moment(startOfWeek).format("YYYY-MM-DD HH:mm:ss")
      // );
      // console.log(
      //   "End of the Week:",
      //   moment(endOfWeek).format("YYYY-MM-DD HH:mm:ss")
      // );
      endOfWeek.setDate(endOfWeek.getDate() + 6); // Set to Saturday of the current week
      endOfWeek.setHours(23, 59, 59, 999); // End of day on Saturday

      let matchCriteria = {};

      // If the user is a SuperAdmin, we do not filter by userId
      if (userRole !== "SuperAdmin") {
        matchCriteria.userId = userObjectId; // Only get login counts for the current user
      }

      const weeklyLoginCountsResult = await LoginHistory.aggregate([
        {
          $match: {
            ...matchCriteria,
            loginTimestamp: { $gte: startOfWeek, $lte: endOfWeek }, // Use loginTimestamp for date filtering
          },
        },
        {
          $project: {
            dayOfWeek: { $dayOfWeek: "$loginTimestamp" }, // Extract day of the week from loginTimestamp
          },
        },
        {
          $group: {
            _id: "$dayOfWeek", // Group by the day of the week
            loginCount: { $sum: 1 }, // Count logins for each day
          },
        },
        {
          $sort: { _id: 1 }, // Sort the results in ascending order (Sunday to Saturday)
        },
      ]);

      // Prepare an array with default values for each day of the week (Sunday to Saturday)
      const weeklyLoginData = [0, 0, 0, 0, 0, 0, 0]; // Default array for weekly counts

      // Populate the array with actual data from the aggregation result
      weeklyLoginCountsResult.forEach((record) => {
        const dayIndex = record._id - 1; // MongoDB returns Sunday as 1, so adjust to 0-based index
        weeklyLoginData[dayIndex] = record.loginCount; // Assign login count to the respective day
      });

      return weeklyLoginData; // Return the data to the caller
    };

    const weeklyLoginCounts = await getWeeklyLoginCounts(
      userObjectId,
      userRole
    );

    // Construct the final result object
    const result = {
      totalUser: counts[0].totalUser[0]?.count || 0,
      totalAdmin: counts[0].totalAdmin[0]?.count || 0,
      totalSeller: counts[0].totalSeller[0]?.count || 0,
      totalPm: counts[0].totalPm[0]?.count || 0,
      activePm: counts[0].activePm[0]?.count || 0,
      warnedPm: counts[0].warnedPm[0]?.count || 0,
      blockedPm: counts[0].blockedPm[0]?.count || 0,
      totalProducts: productCount[0].totalProducts[0]?.count || 0,
      activeProducts: productCount[0].activeProducts[0]?.count || 0,
      disabledProducts: productCount[0].disabledProducts[0]?.count || 0,
      totalOrders: orderCount[0].totalOrders[0]?.count || 0,
      ordered: orderCount[0].ordered[0]?.count || 0,
      reviewed: orderCount[0].reviewed[0]?.count || 0,
      delivered: orderCount[0].delivered[0]?.count || 0,
      refunded: orderCount[0].refunded[0]?.count || 0,
      onHold: orderCount[0].onHold[0]?.count || 0,
      deleted: orderCount[0].deleted[0]?.count || 0,
      completed: orderCount[0].completed[0]?.count || 0,
      cancelled: orderCount[0].cancelled[0]?.count || 0,
      userReservation: reservationCount[0].userReservation[0]?.count || 0,
      totalReservation: reservationCount[0].totalReservation[0]?.count || 0,
      totalRefundedCommission:
        monthlyCommission[0]?.totalRefundedCommission || 0,
      weeklyLoginCounts,
    };

    // Return the result as JSON
    res.status(200).json(result);
  } catch (error) {
    //console.error("Error fetching dashboard details:", error);
    res.status(500).json({ message: "Error fetching dashboard details" });
  }
};

module.exports = { Dashboard };
