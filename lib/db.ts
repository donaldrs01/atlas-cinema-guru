import "dotenv/config";
import { Generated } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

// Explicitly use DATABASE_URL instead of POSTGRES_URL
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Missing DATABASE_URL env variable");
}

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

// Ensure that Kysely connects using DATABASE_URL
export const db = createKysely<Database>({
  connectionString,
});
