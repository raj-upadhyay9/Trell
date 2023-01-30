var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Person } from './Person.js';
let Show = class Show {
};
__decorate([
    PrimaryColumn("varchar")
], Show.prototype, "id", void 0);
__decorate([
    Column("varchar")
], Show.prototype, "title", void 0);
__decorate([
    Column("varchar")
], Show.prototype, "streamingApp", void 0);
__decorate([
    Column("float")
], Show.prototype, "rating", void 0);
__decorate([
    Column("varchar")
], Show.prototype, "review", void 0);
__decorate([
    ManyToOne(type => Person, (person) => person.id)
], Show.prototype, "person", void 0);
Show = __decorate([
    Entity()
], Show);
export { Show };
