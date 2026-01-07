import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    bookingID: {
      type: String,
      required: true,
      unique: true, // ⚠️ Important: Prevents duplicate IDs
    },
    hotelName: {
      type: String,
      required: true,
    },
    // 📅 DATES ARE CRITICAL FOR HOTELS
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Cancelled"],
        default: "Pending"
    },
    // 🛏️ ROOM COUNTS (Fixed Typos & Casing)
    doubleACRoom: {
      type: Number,
      default: 0,
    },
    singleACRoom: {
      type: Number,
      default: 0,
    },
    doubleNonACRoom: {
      type: Number,
      default: 0,
    },
    singleNonACRoom: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);