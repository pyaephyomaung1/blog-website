import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '15june2002Ppm!',
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: ["src/models/**/*.ts"], // Where to find entity files
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
});
