"use strict";
exports.__esModule = true;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Person_js_1 = require("./entities/Person.js");
var Show_js_1 = require("./entities/Show.js");
var AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PGHOST,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    synchronize: true,
    logging: true,
    entities: [Person_js_1.Person, Show_js_1.Show],
    subscribers: [],
    migrations: [],
    ssl: true
});
exports["default"] = AppDataSource;
