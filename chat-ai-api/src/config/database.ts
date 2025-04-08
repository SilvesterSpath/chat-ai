import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { config } from 'dotenv';

// Load environment variables from .env file
config({ path: '.env' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables.');
}

// Inint Neon client
const neonClient = neon(process.env.DATABASE_URL);

// Init drizzle ORM
export const db = drizzle(neonClient);
