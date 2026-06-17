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

// UPDATE AI CONTEXT
export const updateUserContext = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "No context message provided" });
    }

    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      {
        $push: {
          aiContextNotes: {
            $each: [message],
            $slice: -10 // Keep only the last 10 messages
          }
        }
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      profile,
    });
  } catch (error) {
    next(error);
  }
};