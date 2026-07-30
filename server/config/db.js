import mongoose from 'mongoose';
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

let cached = global._mongooseConn;

export async function connectDB() {
  if (cached) return cached;
  cached = mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DBNAME || 'enchanted_arts',
  });
  global._mongooseConn = cached;
  return cached;
}
