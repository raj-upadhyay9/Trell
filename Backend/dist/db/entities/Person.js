var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Show } from "./Show.js";
let Person = class Person {
};
__decorate([
    PrimaryColumn("varchar")
], Person.prototype, "id", void 0);
__decorate([
    Column("varchar")
], Person.prototype, "username", void 0);
__decorate([
    Column("varchar")
], Person.prototype, "password", void 0);
__decorate([
    OneToMany(() => Show, (show) => show.person, { cascade: true })
], Person.prototype, "shows", void 0);
Person = __decorate([
    Entity()
], Person);
export { Person };
