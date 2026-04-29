import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("DATABASE_URL is not set. Database features will fail until configured.");
}

const client = postgres(connectionString || "postgres://postgres:postgres@localhost:5432/workflow_editor");
export const db = drizzle(client, { schema });
export { schema };
