import mongoose from "mongoose";
const connectDB = (handler) => (req, res) => {
  if (mongoose.connections[0].readyState) {
    mongoose.set("strictQuery", true);
    return handler(req, res);
  }
  mongoose.connect(process.env.MONGO_URI);
  return handler(req, res);
};

export default connectDB;
