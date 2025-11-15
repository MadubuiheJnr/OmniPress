import handleError from "../utils/handleError.js";
import blogModel from "../models/blogModel.js";
import categoryModel from "../models/categoryModel.js";
import imageKit from "../configs/imageKit.js";
import fs from "fs";
import { boolify } from "../utils/boolify.js";

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      tags,
      author,
      category,
      isFeatured,
      readingTime,
      isPublished,
      sentiment,
    } = req.body;
    const thumbnail = req.file;

    if (!title) {
      return res.status(400).json({ message: "Blog title is required" });
    }
    if (!thumbnail) {
      return res.status(400).json({ message: "Image is required" });
    }
    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    if (!tags) {
      return res.status(400).json({ message: "Tags are required" });
    }

    let tagsArray = tags;
    if (tags && typeof tagsArray === "string") {
      try {
        tagsArray = JSON.parse(tags);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Tags must be a valid JSON array" });
      }
    }

    if (!tagsArray || tagsArray.length !== 5) {
      return res.status(400).json({ message: "Exactly 5 tags are required" });
    }

    let parsedAuthor = author;
    if (typeof author === "string") {
      try {
        parsedAuthor = JSON.parse(author);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Author must be a valid JSON object" });
      }
    }

    if (!parsedAuthor.name) {
      return res.status(400).json({ message: "Author's name is required" });
    }
    if (!category) {
      return res.status(400).json({ message: "Blog category is required" });
    }
    if (sentiment && (sentiment.length < 5 || sentiment.length > 10)) {
      return res
        .status(400)
        .json({ message: "Sentiment must be 5–10 chars long" });
    }

    const blogAuthor = {
      name: parsedAuthor.name,
      social: parsedAuthor.social || author.social || {},
    };

    let categoryID;
    if (category) {
      const categoryExist = await categoryModel.findOne({
        name: category,
      });

      if (!categoryExist) {
        return res.status(404).json({ message: "Category does not exist" });
      }
      categoryID = categoryExist._id;
    }

    // upload image to imageKit
    const response = await imageKit.files.upload({
      file: fs.createReadStream(thumbnail.path),
      fileName: thumbnail.originalname,
      folder: "/OmniPress/blogs",
    });
    fs.unlinkSync(thumbnail.path);

    // optimization through imageKit URL transformation
    const optimizedImageUrl = imageKit.helper.buildSrc({
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      src: response.url,
      transformation: [
        { quality: "auto" }, // Auto compression
        { format: "webp" }, // Covert to modern format
        { width: "1280" }, // Width resizing
      ],
    });

    const isFeaturedBool = boolify(isFeatured);
    const isPublishedBool = boolify(isPublished);

    const blog = new blogModel({
      title,
      content,
      tags: tagsArray,
      author: blogAuthor,
      category: categoryID,
      thumbnail: optimizedImageUrl,
      isFeatured: isFeaturedBool,
      isPublished: isPublishedBool,
      readingTime: readingTime || "",
      sentiment: sentiment || "",
    });
    await blog.save();

    const populatedBlog = await blog.populate({
      path: "category",
      select: "name slug -_id",
    });

    return res
      .status(201)
      .json({ message: "Blog created successfully", blog: populatedBlog });
  } catch (error) {
    handleError(res, error.message);
  }
};

export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { search, category, skip = 0, limit = 0, isFeatured } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { tags: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      const categoryDoc = await categoryModel.findOne({
        name: category,
      });
      if (categoryDoc) query.category = categoryDoc._id;
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    const blogs = await blogModel
      .find(query)
      .skip(Number(skip))
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .populate("category");

    res.status(200).json(blogs);
  } catch (error) {
    handleError(res, error);
  }
};
export const getAllPublishedBlogs = async (req, res) => {
  try {
    const { search, category, skip = 0, limit = 0, isFeatured } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { tags: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      const categoryDoc = await categoryModel.findOne({
        name: category,
      });
      if (categoryDoc) query.category = categoryDoc._id;
    }

    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === "true";
    }

    const blogs = await blogModel
      .find({ ...query, isPublished: true })
      .skip(Number(skip))
      .limit(Number(limit))
      .populate({ path: "category", select: "name slug -_id" })
      .sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (error) {
    handleError(res, error);
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id).populate("category");
    if (!blog) {
      return res.status(404).json({ message: "Blog does not exist" });
    }
    return res.status(200).json({ message: "Blog fetched successfully", blog });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      tags,
      author,
      category,
      isFeatured,
      isPublished,
      readingTime,
      sentiment,
    } = req.body;
    const thumbnail = req.file;

    const blog = await blogModel.findById(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    let tagsArray = blog.tags;
    if (tags && typeof tags === "string") {
      try {
        tagsArray = JSON.parse(tags);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Tags must be a valid JSON array" });
      }
    }

    if (!tagsArray || tagsArray.length !== 5) {
      return res.status(400).json({ message: "Exactly 5 tags are required" });
    }

    let parsedAuthor = blog.author;
    if (author && typeof author === "string") {
      try {
        parsedAuthor = JSON.parse(author);
      } catch (err) {
        return res
          .status(400)
          .json({ message: "Author must be a valid JSON object" });
      }
    }

    const blogAuthor = {
      name: parsedAuthor.name,
      social: parsedAuthor.social || author.social || {},
    };

    if (sentiment && (sentiment.length < 5 || sentiment.length > 10)) {
      return res
        .status(400)
        .json({ message: "Sentiment must be 5–10 chars long" });
    }

    let categoryID = blog.category;
    if (category) {
      const categoryExist = await categoryModel.findOne({
        name: category,
      });

      if (!categoryExist) {
        return res.status(404).json({ message: "Category does not exist" });
      }
      categoryID = categoryExist._id;
    }

    let optimizedImageUrl;
    if (thumbnail) {
      const response = await imageKit.files.upload({
        file: fs.createReadStream(thumbnail.path),
        fileName: thumbnail.originalname,
        folder: "/OmniPress/blogs",
      });

      fs.unlinkSync(thumbnail.path);

      optimizedImageUrl = imageKit.helper.buildSrc({
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
        src: response.url,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });
    } else {
      optimizedImageUrl = blog.thumbnail;
    }

    const updatedData = {
      title: title || blog.title,
      content: content || blog.content,
      tags: tagsArray,
      author: blogAuthor,
      category: categoryID,
      thumbnail: optimizedImageUrl,
      isFeatured: isFeatured ?? blog.isFeatured,
      isPublished: isPublished ?? blog.isPublished,
      readingTime: readingTime || blog.readingTime,
      sentiment: sentiment || blog.sentiment,
    };

    const updatedBlog = await blogModel.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    const populatedBlog = await updatedBlog.populate("category");
    res
      .status(200)
      .json({ message: "Blog updated successfully", blog: populatedBlog });
  } catch (error) {
    handleError(res, error.message);
  }
};

export const deleteBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog does not exist" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};

export const toggleIsPublished = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.isApproved = !blog.isApproved;
    await blog.save();

    const status = blog.isPublished ? "published" : "unpublished";
    res.status(200).json({ message: `Blog ${status}` });
  } catch (error) {
    handleError(res, error);
  }
};

export const toggleIsFeatured = async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    blog.isFeatured = !blog.isFeatured;
    await blog.save();

    const status = blog.isFeatured ? "featured" : "unfeatured";
    res.status(200).json({ message: `Blog ${status}` });
  } catch (error) {
    handleError(res, error);
  }
};
