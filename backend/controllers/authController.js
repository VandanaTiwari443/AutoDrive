import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createToken, verifyToken } from "../utils/auth.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function getTokenFromRequest(req) {
  return req.cookies?.["auth-token"];
}

// SIGNUP
export async function signup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      message: "Account created successfully.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error?.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({
      message: "Unable to create account.",
    });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      !password
    ) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = await createToken({
      userId: user._id.toString(),
      role: user.role,
    });

    res.cookie("auth-token", token, cookieOptions);

    return res.status(200).json({
      message: "Login successful.",
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Unable to log in. Please try again.",
    });
  }
}

// GET CURRENT LOGGED-IN USER
export async function me(req, res) {
  try {
    const token = getTokenFromRequest(req);

    if (!token) {
      return res.status(401).json({
        message: "You are not logged in.",
      });
    }

    const payload = await verifyToken(token);

    if (typeof payload.userId !== "string") {
      return res.status(401).json({
        message: "Invalid authentication token.",
      });
    }

    const user = await User.findById(payload.userId).select(
      "_id name email role",
    );

    if (!user) {
      res.clearCookie("auth-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        message: "User account not found.",
      });
    }

    return res.status(200).json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // An expired or invalid token means the user is not authenticated.
    if (
      error?.code === "ERR_JWT_EXPIRED" ||
      error?.code === "ERR_JWS_INVALID" ||
      error?.code === "ERR_JWT_INVALID"
    ) {
      res.clearCookie("auth-token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        message: "Your session has expired. Please log in again.",
      });
    }

    console.error("Authentication check error:", error);

    return res.status(500).json({
      message: "Unable to verify your session.",
    });
  }
}

// LOGOUT
export async function logout(req, res) {
  res.clearCookie("auth-token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    message: "Logged out successfully.",
  });
}
