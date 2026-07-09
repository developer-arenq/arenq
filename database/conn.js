import mongoose from "mongoose";

const MONGODB_URL = process.env.DATABASE;

if (!MONGODB_URL) {
  throw new Error("Please define the DATABASE environment variable inside .env.local");
}

mongoose.set("strictQuery", false);

let cached = global.mongoose;

if (!cached) {
  global.mongoose = { conn: null, promise: null };
  cached = global.mongoose;
}

async function connectToDatabase() {
  if (cached.conn) {
    if (process.env.NODE_ENV !== "production") {
      console.log("✅ Reusing existing MongoDB connection");
    }
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      ssl: true,
    };

    if (process.env.NODE_ENV !== "production") {
      console.log("🔄 Connecting to MongoDB...");
    }

    cached.promise = mongoose.connect(MONGODB_URL, options)
      .then((mongoose) => {
        if (process.env.NODE_ENV !== "production") {
          console.log("✅ Connected to MongoDB");
        }
        return mongoose.connection;
      })
      .catch((err) => {
        cached.promise = null;  // reset promise so next call can retry
        console.error("❌ MongoDB connection error:", err.message);
        return null; 
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    console.error("❌ Connection error after promise:", err.message);
    return null; 
  }
}

export default connectToDatabase;
