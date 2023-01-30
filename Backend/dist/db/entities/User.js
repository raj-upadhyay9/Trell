var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Show } from "./Show.js";
let User = class User {
};
__decorate([
    PrimaryColumn("varchar")
], User.prototype, "id", void 0);
__decorate([
    Column("varchar")
], User.prototype, "username", void 0);
__decorate([
    Column("varchar")
], User.prototype, "password", void 0);
__decorate([
    OneToMany(() => Show, (Show) => Show.user) // note: we will create author property in the Photo class below
], User.prototype, "shows", void 0);
User = __decorate([
    Entity()
], User);
export { User };
