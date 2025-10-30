import * as SQLite from "expo-sqlite";

let db: Awaited<ReturnType<typeof SQLite.openDatabaseAsync>> | null = null;

export const initDb = async () => {
  try {
    if (!db || typeof db.execAsync !== "function") {
      db = await SQLite.openDatabaseAsync("inventra");
      console.log("📦 Database opened");

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS products (
          id TEXT PRIMARY KEY NOT NULL,
          name TEXT NOT NULL,
          quantity TEXT NOT NULL,
          price TEXT NOT NULL,
          category TEXT NOT NULL,
          image TEXT,
          createdAt TEXT NOT NULL
        );
      `);

      console.log("✅ Table ensured");
    }
    return db;
  } catch (error) {
    console.error("❌ initDb error:", error);
    throw error;
  }
};
