import TestDrive from "../models/TestDrive.js";
export async function createBooking(req, res) {
  try {
    const { name, email, phone, selectedCar, date, message } = req.body;

    if (!name || !email || !phone || !selectedCar || !date) {
      return res.status(400).json({
        message: "Please provide all required booking details.",
      });
    }

    const booking = await TestDrive.create({
      name,
      email,
      phone,
      selectedCar,
      date,
      message: message || "",
    });

    return res.status(201).json({
      message: "Test drive booked successfully.",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);

    return res.status(500).json({
      message: "Something went wrong while booking the test drive.",
    });
  }
}
export async function getBookings(req, res) {
  try {
    const bookings = await TestDrive.find().sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Get bookings error:", error);

    return res.status(500).json({
      message: "Unable to fetch bookings.",
    });
  }
}
export const updateTestDriveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["Pending", "Confirmed", "Completed", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid booking status.",
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
};
export async function deleteBooking(req, res) {
  try {
    const { id } = req.params;

    const booking = await TestDrive.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    console.error("Delete booking error:", error);

    return res.status(500).json({
      message: "Unable to delete booking.",
    });
  }
}
