import * as mongoose from "mongoose";
import { config } from "../config.js";
import logger from "../service/logger.service.js";
import { deleteDatabase } from "./delete.js";

export const connectMongo = async (db: "development" | "production") => {
  const url =
    db === "development" ? config.mongo.test_url : config.mongo.prod_url;
  if (!url) {
    throw new Error("MONGO_URL is not defined");
  }

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(url);
    logger.info(`Connected to MongoDB ${db} database`);
  } catch (error) {
    logger.error(error);
    throw new Error(`Failed to connect to MongoDB ${db} database`);
  }

  // Uncomment this lines to delete the database
  // await deleteDatabase(mongoose.connections[0])
  // await populate.populateTestData()
  // await mongoose.connection.close()
};
