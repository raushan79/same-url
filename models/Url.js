import mongoose from "mongoose";

/**
 * Defines the schema for URL shortening
 * @typedef {Object} UrlSchema
 * @property {string} original_url - The original URL to be shortened
 * @property {string} short_url - The shortened URL
 * @property {string} custom_url - Optional custom URL path chosen by user
 * @property {number} clicks - The number of clicks on the shortened URL
 * @property {Date} created_at - When the URL was created
 * @property {Date} updated_at - When the URL was last updated
 * @property {ObjectId} user_id - Reference to the user who created the URL
 */
const urlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
  },
  custom_url: {
    type: String,
    unique: true,
    sparse: true,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
urlSchema.index({ original_url: 1 });
urlSchema.index({ short_url: 1 }, { unique: true });
urlSchema.index({ custom_url: 1 }, { unique: true, sparse: true });

export default mongoose.model("Url", urlSchema);
