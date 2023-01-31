"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Show = void 0;
var typeorm_1 = require("typeorm");
var Person_js_1 = require("./Person.js");
var Show = /** @class */ (function () {
    function Show() {
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)("varchar")
    ], Show.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)("varchar")
    ], Show.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)("varchar")
    ], Show.prototype, "streamingApp");
    __decorate([
        (0, typeorm_1.Column)("float")
    ], Show.prototype, "rating");
    __decorate([
        (0, typeorm_1.Column)("varchar")
    ], Show.prototype, "review");
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return Person_js_1.Person; }, function (person) { return person.id; })
    ], Show.prototype, "person");
    Show = __decorate([
        (0, typeorm_1.Entity)()
    ], Show);
    return Show;
}());
exports.Show = Show;
