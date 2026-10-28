import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined");
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected.");

    const email = "admin@autodrive.com";
    const password = "Admin@123";

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.role = "admin";
      existingAdmin.name = "AutoDrive Admin";

      await existingAdmin.save();

      console.log("Admin already existed.");
      console.log("Admin password has been updated.");
      console.log("Email:", email);
      console.log("Password:", password);

      return;
    }

    await User.create({
      name: "AutoDrive Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully.");
    console.log("Email:", email);
    console.log("Password:", password);
  } catch (error) {
    console.error("Error creating/updating admin:", error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();
