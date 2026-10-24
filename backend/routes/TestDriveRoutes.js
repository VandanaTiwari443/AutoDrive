import express from "express";
import jwt from "jsonwebtoken";
import TestDrive from "../models/TestDrive.js";

const router = express.Router();

const allowedStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

function requireAdmin(req, res, next) {
  try {
    const token = req.cookies?.["auth-token"];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({
        message: "JWT_SECRET is not configured on the server.",
      });
    }

    if (!token) {
      return res.status(401).json({
        message: "Please log in first.",
      });
    }

    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string" || decoded.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required.",
      });
    }

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid or expired authentication token.",
    });
  }
}

// GET all test drive bookings
router.get("/", requireAdmin, async (req, res) => {
  try {
    const bookings = await TestDrive.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Fetch bookings error:", error);

    return res.status(500).json({
      message: "Failed to fetch bookings.",
    });
  }
});

// PATCH a booking status
router.patch("/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status.",
      });
    }

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({
        message: "Invalid booking ID.",
      });
    }

    const booking = await TestDrive.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true },
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      message: "Booking status updated successfully.",
      booking,
    });
  } catch (error) {
    console.error("Update booking status error:", error);

    return res.status(500).json({
      message: "Failed to update booking status.",
    });
  }
});

export default router;
