var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
var SchoolUsersPage = /** @class */ (function () {
    function SchoolUsersPage(navCtrl, navParams, local_db, remote_sync, object_init_svc) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.local_db = local_db;
        this.remote_sync = remote_sync;
        this.object_init_svc = object_init_svc;
        this.userType = '';
        this.users = [];
        this.school = this.object_init_svc.initializeSchool();
    }
    SchoolUsersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.local_db.getSchool().then(function (school) {
            _this.remote_sync.getSchoolUsers(school.id).subscribe(function (users) {
                _this.users = users;
            });
            _this.remote_sync.getSchoolLearners(school.id).subscribe(function (learners) {
                _this.school.learners = learners;
            });
            _this.remote_sync.getSchoolTeachers(school.id).subscribe(function (teachers) {
                _this.school.teachers = teachers;
            });
            _this.remote_sync.getSchoolParents(school.id).subscribe(function (parents) {
                _this.school.parents = parents;
            });
        });
    };
    SchoolUsersPage.prototype.showLearners = function () {
        this.users = this.school.learners;
    };
    SchoolUsersPage.prototype.showTeachers = function () {
        this.users = this.school.teachers;
    };
    SchoolUsersPage.prototype.showParents = function () {
        this.users = this.school.parents;
    };
    SchoolUsersPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-school-users',
            templateUrl: 'school-users.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LocalDbProvider,
            RemoteSyncProvider, ObjectInitializerProvider])
    ], SchoolUsersPage);
    return SchoolUsersPage;
}());
export { SchoolUsersPage };
//# sourceMappingURL=school-users.js.map