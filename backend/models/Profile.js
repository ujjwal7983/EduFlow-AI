import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Academic
    degree: String,
    field: String,
    cgpa: Number,

    // Study plans
    targetCountry: String,
    targetCourse: String,

    // Financial
    budget: Number,
    hasCollateral: Boolean,

    // Experience
    experienceYears: Number,
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;