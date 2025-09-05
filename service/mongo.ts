import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(
      String(process.env.MONGODB_CONNECTION_STRING)
    );
    console.log("✅ MongoDB Connected");

    return conn;
  } catch (err) {
    console.log("❌ MongoDB Connected Failed");
    console.error(err);
  }
}
