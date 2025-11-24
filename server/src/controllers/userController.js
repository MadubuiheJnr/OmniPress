import handleError from "../utils/handleError.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import imageKit from "../configs/imageKit.js";
import fs from "fs";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .sort({ createdAt: -1 })
      .select("-password");
    res.status(200).json(users);
  } catch (error) {
    handleError(res, error);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, password, bio } = req.body;
    const avatar = req.file;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    if (userName && (userName.length < 5 || userName.length > 10)) {
      return res
        .status(400)
        .json({ message: "Username must be between 5 and 10 characters" });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password) {
      if (password.length < 8) {
        return res
          .status(400)
          .json({ message: "Password must be at least 8 characters" });
      }
    }
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : user.password;

    if (bio && bio.length > 100) {
      return res
        .status(400)
        .json({ message: "Maximum character of 100 exceeded" });
    }

    // upload image to imageKit
    let optimizedImageUrl = user.avatar;

    if (req.file) {
      const response = await imageKit.files.upload({
        file: fs.createReadStream(req.file.path),
        fileName: req.file.originalname,
        folder: "/OmniPress/users",
      });

      fs.unlinkSync(req.file.path);

      optimizedImageUrl = imageKit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.url,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
    }

    const updatedData = {
      userName: userName || user.userName,
      email: email || user.email,
      password: password ? hashedPassword : user.password,
      bio: bio || user.bio,
      avatar: optimizedImageUrl,
    };

    const updatedUser = await userModel
      .findByIdAndUpdate(id, updatedData, { new: true, runValidators: true })
      .select("-password");

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);

    handleError(res, error);
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

export const toggleIsAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle role
    user.role = user.role === "admin" ? "user" : "admin";

    await user.save();

    return res.status(200).json({
      message: `Role updated. User is now ${user.role}.`,
    });
  } catch (error) {
    handleError(res, error);
  }
};
