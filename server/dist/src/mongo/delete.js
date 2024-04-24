import { log } from '../service/console.service';
export async function deleteDatabase(mongooseInstance) {
    log(`deleteDatabase ${mongooseInstance}`);
    const dbName = mongooseInstance.name;
    log(`Deleting database '${dbName}'...`);
    try {
        // Get a reference to the native MongoDB driver
        const db = mongooseInstance.db;
        // Delete the entire database
        await db.dropDatabase();
        log(`Database '${dbName}' deleted successfully`);
    }
    catch (error) {
        console.error('Error deleting database:', error);
    }
}
