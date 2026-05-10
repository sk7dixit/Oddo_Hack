import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`⚠️ Database Warning: ${error.message}. Running in volatile mode.`);
  }
};

export default connectDB;
