import mongoose from "mongoose";
const connectDB = (handler) => (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.MONGO_URI);
  return handler(req, res);
};

export default connectDB;
