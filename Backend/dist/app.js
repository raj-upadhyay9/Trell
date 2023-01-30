var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotenv from 'dotenv';
import AppDataSource from './db/data-source.js';
import { Show } from './db/entities/Show.js';
import { Person } from './db/entities/Person.js';
dotenv.config();
const app = express();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is sending hello');
});
app.get('/db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield AppDataSource.initialize();
    yield AppDataSource.synchronize();
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
    res.send(JSON.stringify(yield showRepo.find({ relations: { person: true } })));
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
