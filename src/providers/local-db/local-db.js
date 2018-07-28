var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
var LocalDbProvider = /** @class */ (function () {
    function LocalDbProvider(local_db) {
        this.local_db = local_db;
    }
    //Getters-----------------------------------------------------------------------------------------------------------------------
    LocalDbProvider.prototype.getCurrentUser = function () {
        return this.local_db.get('current_schoolLms_User');
    };
    LocalDbProvider.prototype.getSchool = function () {
        return this.local_db.get('school');
    };
    LocalDbProvider.prototype.getType = function () {
        return this.local_db.get('type');
    };
    LocalDbProvider.prototype.getDevices = function () {
        return this.local_db.get('devices');
    };
    //-------------------------------------------------------------------------------------------------------------------------------
    //Setters-------------------------------------------------------------------------------------------------------------------------
    LocalDbProvider.prototype.setUser = function (user) {
        this.setType('user');
        return this.local_db.set('current_schoolLms_User', user);
    };
    LocalDbProvider.prototype.setSchoolManagement = function (school_man) {
        this.setType('user');
        return this.local_db.set('current_schoolLms_User', school_man);
    };
    LocalDbProvider.prototype.setDevice = function (device) {
        return this.local_db.set('device', device);
    };
    LocalDbProvider.prototype.addDevices = function (devices) {
        return this.local_db.set('devices', devices);
    };
    LocalDbProvider.prototype.setVAS = function (vas) {
        this.setType('user');
        return this.local_db.set('current_schoolLms_User', vas);
    };
    LocalDbProvider.prototype.setTeacher = function (teacher) {
        this.setType('user');
        return this.local_db.set('current_schoolLms_User', teacher);
    };
    LocalDbProvider.prototype.setLearner = function (learner) {
        this.setType('user');
        return this.local_db.set('current_schoolLms_User', learner);
    };
    LocalDbProvider.prototype.setParent = function (parent) {
        this.setType('user');
        return this.local_db.set('current_schoolLms_User', parent);
    };
    LocalDbProvider.prototype.setSchool = function (school) {
        this.setType('school');
        return this.local_db.set('school', school);
    };
    LocalDbProvider.prototype.setType = function (type) {
        return this.local_db.set('type', type);
    };
    //Removers-----------------------------------------------------------------------------------------------------------------
    LocalDbProvider.prototype.removeSchool = function () {
        return this.local_db.remove('school');
    };
    LocalDbProvider.prototype.removeCurrentUser = function () {
        this.removeType();
        return this.local_db.remove('current_schoolLms_User');
    };
    LocalDbProvider.prototype.removeType = function () {
        return this.local_db.remove('type');
    };
    LocalDbProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage])
    ], LocalDbProvider);
    return LocalDbProvider;
}());
export { LocalDbProvider };
//# sourceMappingURL=local-db.js.map