import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB using the provided connection URI from environment variables.
 * @async
 * @function getMongoDBConnection
 * @returns {Promise<string>} A promise that resolves with a success message when connected
 * @throws {Error} If connection fails
 */
export const getMongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
    return "MongoDB connected";
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};
