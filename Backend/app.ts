import express, { Express, Request, Response } from 'express';
import errorHandler from "errorhandler";
import { json, urlencoded } from "body-parser";
import methodOverride from "method-override";
import logger from "morgan";
import { uid } from 'uid';

import dotenv from 'dotenv';

import AppDataSource from './db/data-source.js';
import {Show} from './db/entities/Show.js';
import {Person} from './db/entities/Person.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(errorHandler());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server is sending hello');
});


app.get('')


app.get('/db',async (req:Request,res:Response) => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize();

  const personRepo = AppDataSource.getRepository(Person);
  const showRepo = AppDataSource.getRepository(Show);

  const person = new Person();
  person.id = "1a";
  person.username = "test";
  person.password = "asf;lkwje";

  personRepo.save(person);

  const show = new Show();
  show.id = 'asdl;fk';
  show.title = 'Game of Thrones';
  show.streamingApp = 'Netflix';
  show.rating = 3.5;
  show.review = 'nice movie';
  show.person = person;

  showRepo.save(show);

  res.send(JSON.stringify(await showRepo.find({relations : {person : true}})));
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});