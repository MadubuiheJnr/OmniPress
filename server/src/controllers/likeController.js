import likeModel from "../models/likeModel.js";
import blogModel from "../models/blogModel.js";
import commentModel from "../models/commentModel.js";

const updateCounts = async (targetId, targetType) => {
  const Model = targetType === "blog" ? blogModel : commentModel;

  const likes = await likeModel.countDocuments({
    targetId,
    targetType,
    type: "like",
  });

  const dislikes = await likeModel.countDocuments({
    targetId,
    targetType,
    type: "dislike",
  });

  await Model.findByIdAndUpdate(targetId, {
    likesCount: likes,
    dislikesCount: dislikes,
  });
};

export const toggleLike = async (req, res) => {
  const { targetId, targetType, type } = req.body; // type = "like" or "dislike"
  const userId = req.user.id; // must come from auth middleware

  try {
    // Validate targetType
    if (!["blog", "comment"].includes(targetType)) {
      return res.status(400).json({ message: "Invalid target type." });
    }

    // Ensure the target exists
    const Model = targetType === "blog" ? blogModel : commentModel;
    const exists = await Model.findById(targetId);
    if (!exists) {
      return res.status(404).json({ message: `${targetType} not found.` });
    }

    // Check if user previously liked/disliked this target
    const existing = await likeModel.findOne({
      user: userId,
      targetId,
      targetType,
    });

    // CASE 1: No previous like/dislike → create a new one
    if (!existing) {
      await likeModel.create({
        user: userId,
        targetId,
        targetType,
        type,
      });

      await updateCounts(targetId, targetType);

      return res.status(201).json({
        message: `${type}d successfully.`,
      });
    }

    // CASE 2: User clicked the same reaction → remove it (unlike)
    if (existing.type === type) {
      await likeModel.findByIdAndDelete(existing._id);

      await updateCounts(targetId, targetType);

      return res.status(200).json({
        message: `${type} removed.`,
      });
    }

    // CASE 3: User switches from like → dislike or reverse
    existing.type = type;
    await existing.save();

    await updateCounts(targetId, targetType);

    return res.status(200).json({
      message: `Changed to ${type}.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong." });
  }
};
