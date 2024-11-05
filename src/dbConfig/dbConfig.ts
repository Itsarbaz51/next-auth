import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
  path: './.env'
})

export async function connect() {
  console.log("process.env.MONGO_URL", process.env.MONGO_URL);
  
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected.");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error, please make sure db is up and running: " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went worng in connecting to DB.", error);
  }
}
