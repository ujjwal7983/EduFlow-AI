import Profile from "../models/Profile.js";

// GET PROFILE
export const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};

// CREATE / UPDATE PROFILE
export const saveProfile = async (req, res, next) => {
  try {
    const data = req.body;

    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        data,
        { new: true }
      );
    } else {
      profile = await Profile.create({
        user: req.user._id,
        ...data,
      });
    }

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};