import "dotenv/config";
import { Generated, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import ws from "ws"; // Import WebSockets
import { neonConfig } from "@neondatabase/serverless"; // NeonDB config

// ✅ Set WebSocket support for NeonDB
neonConfig.webSocketConstructor = ws;

// ✅ Use DATABASE_URL from your environment variables
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Missing DATABASE_URL env variable");
}

// ✅ Create a connection pool with WebSockets enabled
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }, // Required for NeonDB
});

// ✅ Set up Kysely with the NeonDB connection
export const db = new Kysely<Database>({
  dialect: new PostgresDialect({ pool }),
});

// ✅ Database Schema Interfaces
export interface Database {
  titles: TitlesTable;
  users: UsersTable;
  favorites: FavoritesTable;
  watchlater: WatchLaterTable;
  activities: ActivitiesTable;
}

export interface TitlesTable {
  id: Generated<string>;
  title: string;
  synopsis: string;
  released: number;
  genre: string;
}

export interface UsersTable {
  id: Generated<string>;
  name: string;
  email: string;
  password: string;
}

export interface FavoritesTable {
  id: Generated<string>;
  title_id: Generated<string>;
  user_id: Generated<string>;
}

export interface WatchLaterTable {
  id: Generated<string>;
  title_id: Generated<string>;
  user_id: Generated<string>;
}

export interface ActivitiesTable {
  id: Generated<string>;
  timestamp: Date;
  title_id: string;
  user_id: string;
  activity: "FAVORITED" | "WATCH_LATER";
}
