import dotenv from "dotenv";

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || "production";
export const PORT = parseInt(process.env.PORT as string) || 3000;
export const DB_URL = process.env.DATABASE_URL as string;
export const SERVER_HOST = process.env.SERVER_HOST || "localhost";
