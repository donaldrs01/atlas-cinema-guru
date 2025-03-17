import { createKysely } from "@vercel/postgres-kysely";
import { Generated } from "kysely";
import ws from "ws"; // Import WebSockets

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error("Database connection string not provided. Set the POSTGRES_URL environment variable.");
}

// Ensure Neon uses WebSockets
const neonConfig = { webSocketConstructor: ws };

export const db = createKysely<Database>({
  connectionString,
  ...neonConfig, // Apply WebSocket configuration
});

// Database schema interfaces
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
