import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "apivenda",
    entities: ["./src/modules/**/typeorm/entities/*.ts"],
    migrations: [
        "./src/shared/typeorm/migrations/*.ts"
    ],
});