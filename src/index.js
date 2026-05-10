import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not defined in .env file");
} else {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
}
