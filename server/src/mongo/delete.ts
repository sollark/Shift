import { Db } from 'mongodb'
import { Connection } from 'mongoose'
import { log } from '../service/console.service'

export async function deleteDatabase(
  mongooseInstance: Connection
): Promise<void> {
  log(`deleteDatabase ${mongooseInstance}`)
  const dbName = mongooseInstance.name
  log(`Deleting database '${dbName}'...`)

  try {
    // Get a reference to the native MongoDB driver
    const db = mongooseInstance.db as any as Db

    // Delete the entire database
    await db.dropDatabase()
    log(`Database '${dbName}' deleted successfully`)
  } catch (error) {
    console.error('Error deleting database:', error)
  }
}
