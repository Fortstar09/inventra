import * as SQLite from "expo-sqlite";

// Open or create the database
export const db = await SQLite.openDatabaseAsync("inventra.db");

// Create table for products
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
