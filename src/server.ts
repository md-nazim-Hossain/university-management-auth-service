import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    console.log("Database connected successfully!");
    app.listen(config.port, () => {
      console.log(`Server app listening on port ${config.port}`);
    });
  } catch (error: any) {
    console.log("Failed To connected database", error.message);
  }
}

main();
