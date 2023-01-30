import "reflect-metadata";
import { DataSource } from "typeorm";
import { Person } from "./entities/Person.js";
import { Show } from "./entities/Show.js";
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: true,
    entities: [Person, Show],
    subscribers: [],
    migrations: [],
    ssl: true
});
export default AppDataSource;
