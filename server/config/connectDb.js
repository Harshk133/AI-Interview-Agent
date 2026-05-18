import mongoose from "mongoose";
import dns from "dns";

const connectDb = async () => {
  try {
    // Test DNS resolution first
    console.log("Testing DNS resolution...");
    dns.resolveSrv(
      "_mongodb._tcp.cluster0.qtsvmvl.mongodb.net",
      (err, addresses) => {
        if (err) {
          console.warn("⚠️ DNS Resolution Failed:", err.code);
          console.warn(
            "This likely means: VPN/Firewall is blocking, or IP is not whitelisted in MongoDB Atlas",
          );
        } else {
          console.log("✓ DNS Resolution OK");
        }
      },
    );

    await mongoose.connect(process.env.MONGODB_URL, {
      retryWrites: true,
      w: "majority",
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      family: 4,
    });
    console.log("✓ DataBase Connected Successfully");
  } catch (error) {
    console.error("✗ DataBase Connection Error:", error.message);
    console.error("Code:", error.code);

    if (error.code === "ECONNREFUSED" || error.message.includes("querySrv")) {
      console.error(
        "\n❌ Fix: Check if your IP is whitelisted in MongoDB Atlas Network Access",
      );
      console.error(
        "🔗 Go to: https://cloud.mongodb.com → Cluster → Network Access",
      );
      console.error("Also check: VPN/Firewall blocking the connection\n");
    }

    // Retry connection after 5 seconds
    setTimeout(connectDb, 5000);
  }
};

export default connectDb;
