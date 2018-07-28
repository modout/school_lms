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
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { RegisterPage } from '../register/register';
var SchoolProfilePage = /** @class */ (function () {
    function SchoolProfilePage(navCtrl, local_db, navParams, object_init_svc) {
        this.navCtrl = navCtrl;
        this.local_db = local_db;
        this.navParams = navParams;
        this.object_init_svc = object_init_svc;
        this.changeName = false;
        this.changePricipal = false;
        this.profileChanged = false;
        this.showSchool = true;
        this.showUser = false;
        this.school = this.object_init_svc.initializeSchool();
    }
    SchoolProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.local_db.getSchool().then(function (school) {
            _this.school = school;
        });
    };
    SchoolProfilePage.prototype.editName = function () {
        this.changeName = !this.changeName;
        this.profileChanged = true;
    };
    SchoolProfilePage.prototype.toggleUser = function () {
        this.showSchool = !this.showSchool;
        this.showUser = !this.showUser;
    };
    SchoolProfilePage.prototype.editPrincipal = function () {
        this.changePricipal = !this.changePricipal;
        this.profileChanged = true;
    };
    SchoolProfilePage.prototype.saveChanges = function () {
        var _this = this;
        this.local_db.setSchool(this.school).then(function (data) {
            _this.changeName = false;
            _this.changePricipal = false;
            _this.profileChanged = false;
            alert('changes saved!');
        });
    };
    SchoolProfilePage.prototype.logout = function () {
        var _this = this;
        this.local_db.removeCurrentUser().then(function () {
            _this.navCtrl.push(RegisterPage)
                .catch(function (err) { return console.log(err); });
        });
    };
    SchoolProfilePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-school-profile',
            templateUrl: 'school-profile.html',
        }),
        __metadata("design:paramtypes", [NavController, LocalDbProvider,
            NavParams, ObjectInitializerProvider])
    ], SchoolProfilePage);
    return SchoolProfilePage;
}());
export { SchoolProfilePage };
//# sourceMappingURL=school-profile.js.map