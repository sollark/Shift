import * as mongoose from 'mongoose';
import { config } from '../config.js';
export const connectMongo = async (db) => {
    const url = db === 'development' ? config.mongo.test_url : config.mongo.prod_url;
    if (!url) {
        throw new Error('MONGO_URL is not defined');
    }
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(url);
        console.log(`Connected to MongoDB ${db} database`);
    }
    catch (error) {
        console.log(error);
        throw new Error(`Failed to connect to MongoDB ${db} database`);
    }
    // Uncomment this lines to delete the database
    // await deleteDatabase(mongoose.connections[0])
    // await populate.populateTestData()
    // await mongoose.connection.close()
};
