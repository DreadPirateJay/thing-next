import mongoose from "mongoose";

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error('MONGODB_URI missing from environment');

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null }
}

export const dbConnect = async () => {
    if (cached.conn) return cached.conn;

    cached.conn = await mongoose.connect(MONGODB_URI);

    return cached.conn;
}

export default dbConnect;
