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
import { AngularFireDatabase } from 'angularfire2/database';
var RemoteSyncProvider = /** @class */ (function () {
    function RemoteSyncProvider(db) {
        this.db = db;
    }
    //Setters--------------------------------------------------------------------------------------------------------
    RemoteSyncProvider.prototype.setSupport = function (support) {
        return this.db.list('Users').push(support);
    };
    RemoteSyncProvider.prototype.setParent = function (parent) {
        return this.db.list('Users').push(parent);
    };
    RemoteSyncProvider.prototype.setDevice = function (device) {
        return this.db.list('Devices').push(device);
    };
    RemoteSyncProvider.prototype.setLearner = function (learner) {
        return this.db.list('Users').push(learner);
    };
    RemoteSyncProvider.prototype.setSchoolManagement = function (school_management) {
        return this.db.list('Users').push(school_management);
    };
    RemoteSyncProvider.prototype.setSchool = function (school) {
        return this.db.list('Schools').push(school);
    };
    RemoteSyncProvider.prototype.setTeacher = function (teacher) {
        return this.db.list('Users').push(teacher);
    };
    RemoteSyncProvider.prototype.setVAS = function (vas) {
        return this.db.list('Users').push(vas);
    };
    //-----------------------------------------------------------------------------------------------------------------
    //getters
    RemoteSyncProvider.prototype.getUser = function (uid) {
        return this.db.object("Users/" + uid).valueChanges();
    };
    RemoteSyncProvider.prototype.getAllDevices = function () {
        return this.db.list('Devices').valueChanges();
    };
    RemoteSyncProvider.prototype.getAllUsers = function () {
        return this.db.list('Users').valueChanges();
    };
    RemoteSyncProvider.prototype.getAllVAS = function () {
        return this.db.list('Users', function (ref) { return ref.orderByChild('type').equalTo('VAS'); }).valueChanges();
    };
    RemoteSyncProvider.prototype.getAllLearners = function () {
        return this.db.list('Users', function (ref) { return ref.orderByChild('type').equalTo('learner'); }).valueChanges();
    };
    RemoteSyncProvider.prototype.getAllTeachers = function () {
        return this.db.list('Users', function (ref) { return ref.orderByChild('type').equalTo('teacher'); }).valueChanges();
    };
    RemoteSyncProvider.prototype.getAllParents = function () {
        return this.db.list('Users', function (ref) { return ref.orderByChild('type').equalTo('parent'); }).valueChanges();
    };
    RemoteSyncProvider.prototype.getAllSchools = function () {
        return this.db.list('Schools').valueChanges();
    };
    RemoteSyncProvider.prototype.getVAS = function (vas_id) {
        return this.db.object("Users/" + vas_id).valueChanges();
    };
    RemoteSyncProvider.prototype.getParent = function (uid) {
        return this.db.object("Users/" + uid).valueChanges();
    };
    RemoteSyncProvider.prototype.getLearner = function (uid) {
        return this.db.object("Users/" + uid).valueChanges();
    };
    RemoteSyncProvider.prototype.getTeacher = function (uid) {
        return this.db.object("Users/" + uid).valueChanges();
    };
    RemoteSyncProvider.prototype.getDevice = function (device_id) {
        return this.db.object("Devices/" + device_id).valueChanges();
    };
    RemoteSyncProvider.prototype.getSchoolDevices = function (school_id) {
        return this.db.list('Devices', function (ref) { return ref.orderByChild('institution_assigned_to').equalTo(school_id); }).valueChanges();
    };
    RemoteSyncProvider.prototype.getVasDevices = function (supplier_id) {
        return this.db.list('Devices', function (ref) { return ref.orderByChild('supplier_id').equalTo(supplier_id); }).valueChanges();
    };
    RemoteSyncProvider.prototype.getSchool = function (school_id) {
        return this.db.object("Schools/" + school_id).valueChanges();
    };
    RemoteSyncProvider.prototype.getSchoolUsers = function (school_id) {
        return this.db.list('Users', function (ref) { return ref.orderByChild('school_id').equalTo(school_id); }).valueChanges();
    };
    RemoteSyncProvider.prototype.getSchoolParents = function (school_id) {
        return this.db.list('Users', function (ref) { return ref.orderByChild('school_id').equalTo(school_id); })
            .valueChanges().map(function (users) { return users.filter(function (user) { return user.type === 'parent'; }); });
    };
    RemoteSyncProvider.prototype.getSchoolLearners = function (school_id) {
        return this.db.list('Users', function (ref) { return ref.orderByChild('school_id').equalTo(school_id); })
            .valueChanges().map(function (users) { return users.filter(function (user) { return user.type === 'learner'; }); });
    };
    RemoteSyncProvider.prototype.getSchoolTeachers = function (school_id) {
        return this.db.list('Users', function (ref) { return ref.orderByChild('school_id').equalTo(school_id); })
            .valueChanges().map(function (users) { return users.filter(function (user) { return user.type === 'teacher'; }); });
    };
    RemoteSyncProvider.prototype.getTeachersPerSubject = function (school_id, subject) {
        return this.db.list('Users', function (ref) { return ref.orderByChild('school_id').equalTo(school_id); })
            .valueChanges()
            .map(function (users) { return users.filter(function (user) { return (user.type === 'teacher'); }); })
            .map(function (users) { return users.filter(function (user) {
            var truth = false;
            if (user.subjects) {
                user.subjects.forEach(function (usersubject) {
                    if (usersubject.indexOf(subject) != -1)
                        truth = true;
                });
                return truth;
            }
            else {
                return false;
            }
        }); });
    };
    //------------------------------------------------------------------------------------------------------------------------
    //updates
    RemoteSyncProvider.prototype.updateUser = function (user) {
        return this.db.object("Users/" + user.profile.uid).set(user);
    };
    RemoteSyncProvider.prototype.updateParent = function (uid, parent) {
        return this.db.object("Users/" + uid).set(parent);
    };
    RemoteSyncProvider.prototype.updateDevice = function (device_id, device) {
        return this.db.object("Devices/" + device_id).set(device);
    };
    RemoteSyncProvider.prototype.updateSchoolManager = function (uid, person) {
        return this.db.object("Users/" + uid).set(person);
    };
    RemoteSyncProvider.prototype.upateLearner = function (uid, learner) {
        return this.db.object("Users/" + uid).set(learner);
    };
    RemoteSyncProvider.prototype.updateTeacher = function (uid, teacher) {
        return this.db.object("Users/" + uid).set(teacher);
    };
    RemoteSyncProvider.prototype.updateSchool = function (school_id, school) {
        return this.db.object("Schools/" + school_id).set(school);
    };
    RemoteSyncProvider.prototype.updateVAS = function (vas_id, vas) {
        return this.db.object("Users/" + vas_id).set(vas);
    };
    RemoteSyncProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireDatabase])
    ], RemoteSyncProvider);
    return RemoteSyncProvider;
}());
export { RemoteSyncProvider };
//# sourceMappingURL=remote-sync.js.map