import handleError from "../utils/handleError.js";
import categoryModel from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
  const { name, slug, isDefault, isFeatured } = req.body;

  if (!name || !slug) {
    return res.status(400).json({ message: "Name and slug are required" });
  }

  let validSlug;
  if (slug) {
    validSlug = slug
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  }

  let validName;
  if (name) {
    const lower = name.toLowerCase();
    validName = lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  try {
    if (validName) {
      const exists = await categoryModel.findOne({ name: validName });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }
    }

    if (validSlug) {
      const exists = await categoryModel.findOne({ slug: validSlug });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Category slug already exists" });
      }
    }
    if (isDefault) {
      const exists = await categoryModel.findOne({ isDefault: true });
      if (exists) {
        return res.status(400).json({
          message: `Default category (${exists.name}) already exists`,
        });
      }
    }

    const category = new categoryModel({
      name: validName,
      slug: validSlug,
      isDefault,
      isFeatured,
    });

    await category.save();

    return res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
export const getAllCategory = async (req, res) => {
  try {
    const category = await categoryModel
      .find()
      .sort({ createdAt: -1 })
      .select("-__v");
    res.status(200).json({
      // message: "Categories fetched successfully",
      // total: category.length,
      category,
    });
  } catch (error) {
    handleError(res, error);
  }
};
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category found successfully", category });
  } catch (error) {
    handleError(res, error);
  }
};
export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, isDefault, isFeatured, postCount } = req.body;

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    let validSlug;
    if (slug) {
      validSlug = slug
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "");
    }

    let validName;
    if (name) {
      const lower = name.toLowerCase();
      validName = lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    if (validName) {
      const exists = await categoryModel.findOne({
        name: validName,
        _id: { $ne: id },
      });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Category name already exists" });
      }
    }

    if (validSlug) {
      const exists = await categoryModel.findOne({
        slug: validSlug,
        _id: { $ne: id },
      });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Category slug already exists" });
      }
    }
    if (isDefault) {
      const exists = await categoryModel.findOne({
        isDefault: true,
        _id: { $ne: id },
      });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Default category (General) already exists" });
      }
    }

    if (category.isDefault) {
      // Prevent changing the default flag
      if (req.body.isDefault !== undefined && req.body.isDefault !== true) {
        return res.status(400).json({
          message: "Cannot change isDefault for the default category",
        });
      }
    }

    const updatedData = {
      name: validName || category.name,
      slug: validSlug || category.slug,
      isDefault: isDefault !== undefined ? isDefault : category.isDefault,
      isFeatured: isFeatured ?? category.isFeatured,
      postCount: postCount !== undefined ? postCount : category.postCount,
    };

    const updatedCategory = await categoryModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category does not exist" });
    }

    if (category.isDefault) {
      return res.status(400).json({
        message: "Cannot delete default category",
      });
    }

    await categoryModel.findByIdAndDelete(id);

    res.status(200).json({ message: "category Deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
