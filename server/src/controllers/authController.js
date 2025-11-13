import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import handleError from "../utils/handleError.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (userName.length < 5) {
    return res
      .status(400)
      .json({ message: "Username must be at least 5 characters long" });
  }

  if (userName.length > 10) {
    return res
      .status(400)
      .json({ message: "Username must not exceed 10 characters" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  try {
    const existingUser = await userModel.findOne({
      $or: [{ userName: userName }, { email: email }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUsers = await userModel.find();
    const role = existingUsers.length === 0 ? "admin" : "user";

    const user = new userModel({
      userName,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();

    return res.status(201).json({ message: "Created" });
  } catch (error) {
    handleError(res, error);
  }
};

export const loginUser = async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: "Please provide email/username and password" });
  }

  try {
    const user = await userModel.findOne({
      $or: [{ userName: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getLoggedInUser = async (req, res) => {
  const userID = req.user.id;

  try {
    const user = await userModel.findById(userID).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    handleError(res, error);
  }
};
