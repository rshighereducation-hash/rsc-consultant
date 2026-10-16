import dns from "node:dns";
import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  try {
    await mongoose.connect(uri);
  } catch (error) {
    const dnsError = error as NodeJS.ErrnoException;
    const configuredServers = process.env.MONGODB_DNS_SERVERS?.split(",")
      .map((server) => server.trim())
      .filter(Boolean);

    if (dnsError.code !== "ECONNREFUSED" || dnsError.syscall !== "querySrv") {
      throw error;
    }

    dns.setServers(
      configuredServers?.length ? configuredServers : ["8.8.8.8", "8.8.4.4"],
    );
    await mongoose.connect(uri);
  }

  console.log("MongoDB connected");
};
