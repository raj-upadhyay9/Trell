"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Person = void 0;
var typeorm_1 = require("typeorm");
var Show_js_1 = require("./Show.js");
var Person = /** @class */ (function () {
    function Person() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("varchar")
    ], Person.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("varchar")
    ], Person.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)("varchar")
    ], Person.prototype, "password");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Show_js_1.Show; }, function (show) { return show.person; }, { cascade: true })
    ], Person.prototype, "shows");
    Person = __decorate([
        (0, typeorm_1.Entity)()
    ], Person);
    return Person;
}());
exports.Person = Person;
