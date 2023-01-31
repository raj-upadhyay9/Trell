var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import express from 'express';
import errorHandler from "errorhandler";
import methodOverride from "method-override";
import logger from "morgan";
import jwt from 'jsonwebtoken';
import cors from "cors";
import dotenv from 'dotenv';
import AppDataSource from './db/data-source.js';
import { Show } from './db/entities/Show.js';
import { Person } from './db/entities/Person.js';
dotenv.config();
AppDataSource.initialize();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));
app.use(methodOverride("_method"));
app.use(errorHandler());
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
    if (req.path == '/login' || req.path == '/db') {
        next();
    }
    else { //login path
        console.log('entered');
        const token = req.headers['token'];
        console.log(token);
        if (!token) {
            console.log('no token');
            return res.status(401).json({ message: 'No token provided' });
        }
        try {
            console.log('here is some error');
            const decoded = JSON.stringify(jwt.verify(token, !!process.env.JWT_SECRET ? process.env.JWT_SECRET : ""));
            console.log(decoded, "decoded");
            req.user = decoded;
            next();
        }
        catch (error) {
            console.log("reaching error zone");
            return res.status(401).json({ message: error });
        }
    }
});
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server is sending hello');
});
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const user = JSON.parse(req.user);
        const showRepo = AppDataSource.getRepository(Show);
        console.log("reaching here");
        var showsByUser = yield showRepo
            .createQueryBuilder("show")
            .leftJoinAndSelect("show.person", "user")
            .where("user.id = :userId", { userId: user.userId })
            .getMany();
        const filteredShowByUser = showsByUser.map(item => {
            const { person } = item, rest = __rest(item, ["person"]);
            return rest;
        });
        res.send(JSON.stringify(filteredShowByUser));
    }
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    yield AppDataSource.synchronize();
    const personRepo = AppDataSource.getRepository(Person);
    const user = yield personRepo.findOneBy({ username: username });
    console.log(password);
    console.log(user === null || user === void 0 ? void 0 : user.password);
    console.log(password);
    if ((user === null || user === void 0 ? void 0 : user.password) === password) {
        console.log('entered');
        console.log("username", user === null || user === void 0 ? void 0 : user.username);
        console.log("userId", user === null || user === void 0 ? void 0 : user.id);
        console.log(process.env.JWT_SECRET);
        var token = jwt.sign(JSON.stringify({ userId: user === null || user === void 0 ? void 0 : user.id, username: user === null || user === void 0 ? void 0 : user.username }), !!process.env.JWT_SECRET ? process.env.JWT_SECRET : "", { algorithm: "HS256" });
        res.status(200).send({ auth: true, token: !!token ? token : "" });
    }
    else {
        res.send("wrong password");
    }
}));
app.get('/db', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield AppDataSource.synchronize();
    const personRepo = AppDataSource.getRepository(Person);
    const showRepo = AppDataSource.getRepository(Show);
    const person1 = new Person();
    person1.id = "1a";
    person1.username = "test";
    person1.password = "asf;lkwje";
    const show1 = new Show();
    show1.id = 'asdwef;lk';
    show1.title = 'Stranger Things';
    show1.streamingApp = 'Hulu';
    show1.rating = 4.5;
    show1.review = 'excellent movie';
    show1.person = person1;
    showRepo.save(show1);
    const person2 = new Person();
    person2.id = "1c";
    person2.username = "test2";
    person2.password = "sdf;lkwe";
    const show2 = new Show();
    show2.id = 'asdfwe;lk';
    show2.title = 'The Crown';
    show2.streamingApp = 'Amazon';
    show2.rating = 4.0;
    show2.review = 'great movie';
    show2.person = person2;
    showRepo.save(show2);
    //
    const show3 = new Show();
    show3.id = 'asdfl;kwe';
    show3.title = 'Westworld';
    show3.streamingApp = 'HBO';
    show3.rating = 4.2;
    show3.review = 'interesting movie';
    show3.person = person1;
    showRepo.save(show3);
    const show4 = new Show();
    show4.id = 'asdfl;kae';
    show4.title = 'The Mandalorian';
    show4.streamingApp = 'Disney+';
    show4.rating = 4.7;
    show4.review = 'amazing movie';
    show4.person = person2;
    showRepo.save(show4);
    const show5 = new Show();
    show5.id = 'asdfl;kfe';
    show5.title = 'Vikings';
    show5.streamingApp = 'Amazon';
    show5.rating = 3.9;
    show5.review = 'good movie';
    show5.person = person2;
    showRepo.save(show5);
    const show6 = new Show();
    show6.id = 'asdfl;kge';
    show6.title = 'The Boys';
    show6.streamingApp = 'Amazon';
    show6.rating = 4.3;
    show6.review = 'awesome movie';
    show6.person = person1;
    showRepo.save(show6);
    const show7 = new Show();
    show7.id = 'asdfl;khe';
    show7.title = 'Dark';
    show7.streamingApp = 'Netflix';
    show7.rating = 4.1;
    show7.review = 'great movie';
    show7.person = person2;
    showRepo.save(show7);
    const show8 = new Show();
    show8.id = 'asdfl;kie';
    show8.title = 'The Witcher';
    show8.streamingApp = 'Netflix';
    show8.rating = 4.2;
    show8.review = 'fantastic movie';
    show8.person = person1;
    showRepo.save(show8);
    const show9 = new Show();
    show9.id = 'asdfl;kje';
    show9.title = 'House of Cards';
    show9.streamingApp = 'Netflix';
    show9.rating = 3.8;
    show9.review = 'good movie';
    show9.person = person2;
    showRepo.save(show9);
    const show10 = new Show();
    show10.id = 'asdfl;kke';
    show10.title = 'Breaking Bad';
    show10.streamingApp = 'Netflix';
    show10.rating = 4.8;
    show10.review = 'brilliant movie';
    show10.person = person1;
    showRepo.save(show10);
    const show11 = new Show();
    show11.id = 'asdfl;kle';
    show11.title = 'Mindhunter';
    show11.streamingApp = 'Netflix';
    show11.rating = 4.4;
    show11.review = 'amazing movie';
    show11.person = person2;
    showRepo.save(show11);
    const show12 = new Show();
    show12.id = 'asdfl;kme';
    show12.title = 'Peaky Blinders';
    show12.streamingApp = 'Netflix';
    show12.rating = 4.6;
    show12.review = 'great movie';
    show12.person = person1;
    showRepo.save(show12);
    const show13 = new Show();
    show13.id = 'asdfl;kne';
    show13.title = 'Narcos';
    show13.streamingApp = 'Netflix';
    show13.rating = 4.1;
    show13.review = 'excellent movie';
    show13.person = person2;
    showRepo.save(show13);
    const show14 = new Show();
    show14.id = 'asdfl;koe';
    show14.title = 'Sherlock';
    show14.streamingApp = 'Netflix';
    show14.rating = 4.5;
    show14.review = 'great movie';
    show14.person = person1;
    showRepo.save(show14);
    const show15 = new Show();
    show15.id = 'jlkjgfwe';
    show15.title = 'FRIENDS';
    show15.streamingApp = 'Hulu';
    show15.rating = 4.7;
    show15.review = 'awesome show';
    show15.person = person2;
    showRepo.save(show15);
    const show16 = new Show();
    show16.id = 'qwertyasdf';
    show16.title = 'Game of Thrones';
    show16.streamingApp = 'HBO';
    show16.rating = 4.9;
    show16.review = 'fantastic series';
    show16.person = person1;
    showRepo.save(show16);
    const show17 = new Show();
    show17.id = 'poiuytrewq';
    show17.title = 'Breaking Bad';
    show17.streamingApp = 'Netflix';
    show17.rating = 4.8;
    show17.review = 'mind-blowing show';
    show17.person = person2;
    showRepo.save(show17);
    const show18 = new Show();
    show18.id = 'lkjhgfdsa';
    show18.title = 'Friends';
    show18.streamingApp = 'Netflix';
    show18.rating = 4.3;
    show18.review = 'funny sitcom';
    show18.person = person1;
    showRepo.save(show18);
    const show19 = new Show();
    show19.id = 'mnbvcxzas';
    show19.title = 'Stranger Things';
    show19.streamingApp = 'Netflix';
    show19.rating = 4.7;
    show19.review = 'scary and thrilling';
    show19.person = person2;
    showRepo.save(show19);
    const show20 = new Show();
    show20.id = 'zxcvbnmlk';
    show20.title = 'The Crown';
    show20.streamingApp = 'Netflix';
    show20.rating = 4.2;
    show20.review = 'engaging drama';
    show20.person = person1;
    showRepo.save(show20);
    const show21 = new Show();
    show21.id = 'poiuytrew';
    show21.title = 'Westworld';
    show21.streamingApp = 'HBO';
    show21.rating = 4.4;
    show21.review = 'thought-provoking show';
    show21.person = person2;
    showRepo.save(show21);
    const show22 = new Show();
    show22.id = 'lkjhgfdsq';
    show22.title = 'Black Mirror';
    show22.streamingApp = 'Netflix';
    show22.rating = 4.5;
    show22.review = 'intriguing show';
    show22.person = person1;
    showRepo.save(show22);
    const show23 = new Show();
    show23.id = 'mnbvcxzpo';
    show23.title = 'The Twilight Zone';
    show23.streamingApp = 'CBS All Access';
    show23.rating = 4.0;
    show23.review = 'mysterious and suspenseful';
    show23.person = person2;
    showRepo.save(show23);
    const show24 = new Show();
    show24.id = 'zxcvbnmli';
    show24.title = 'The Office';
    show24.streamingApp = 'Netflix';
    show24.rating = 4.7;
    show24.review = 'hilarious comedy';
    show24.person = person1;
    showRepo.save(show24);
    const show25 = new Show();
    show25.id = 'qwertyuiop';
    show25.title = 'The Handmaid\'s Tale';
    show25.streamingApp = 'Hulu';
    show25.rating = 4.1;
    show25.review = 'powerful and disturbing';
    show25.person = person2;
    showRepo.save(show25);
    const show26 = new Show();
    show26.id = 'asdfghjkl;';
    show26.title = 'The Walking Dead';
    show26.streamingApp = 'AMC';
    show26.rating = 4.0;
    show26.review = 'brutal and shocking';
    show26.person = person1;
    showRepo.save(show26);
    const show27 = new Show();
    show27.id = 'zxcvbnm,.';
    show27.title = 'True Detective';
    show27.streamingApp = 'HBO';
    show27.rating = 4.3;
    show27.review = 'intense and mysterious';
    show27.person = person2;
    showRepo.save(show27);
    const show28 = new Show();
    show28.id = 'qwertyuiofcp';
    show28.title = 'The West Wing';
    show28.streamingApp = 'Netflix';
    show28.rating = 4.6;
    show28.review = 'inspiring political drama';
    show28.person = person1;
    showRepo.save(show28);
    const show29 = new Show();
    show29.id = 'lkjhgfdsa';
    show29.title = 'Fringe';
    show29.streamingApp = 'Hulu';
    show29.rating = 4.2;
    show29.review = 'weird and mysterious';
    show29.person = person2;
    showRepo.save(show29);
    const show30 = new Show();
    show30.id = 'mnbvcxzas';
    show30.title = 'The X-Files';
    show30.streamingApp = 'Hulu';
    show30.rating = 4.5;
    show30.review = 'supernatural drama';
    show30.person = person1;
    showRepo.save(show30);
    res.send(JSON.stringify(yield showRepo.find({ relations: { person: true } })));
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
