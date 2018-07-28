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
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserRolesProvider } from '../../providers/user-roles/user-roles';
import { FilteringProvider } from '../../providers/filtering/filtering';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
var SchoolDetailsPage = /** @class */ (function () {
    function SchoolDetailsPage(navCtrl, navParams, user_roles_svc, filtering_svc, local_db, view, object_init_service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user_roles_svc = user_roles_svc;
        this.filtering_svc = filtering_svc;
        this.local_db = local_db;
        this.view = view;
        this.object_init_service = object_init_service;
        this.predictions = [];
        this.searchTxt = '';
        this.school = this.object_init_service.initializeSchool();
    }
    SchoolDetailsPage.prototype.school_autocomplete = function () {
        this.predictions = [];
        this.predictions = this.filtering_svc.autocomplete(this.user_roles_svc.SCHOOLS, this.searchTxt);
    };
    SchoolDetailsPage.prototype.selectSchool = function (school) {
        this.searchTxt = school;
        this.school.name = school;
        this.predictions = [];
    };
    SchoolDetailsPage.prototype.done = function () {
        this.view.dismiss();
        return this.local_db.setSchool(this.school);
    };
    SchoolDetailsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-school-details',
            templateUrl: 'school-details.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserRolesProvider,
            FilteringProvider, LocalDbProvider, ViewController,
            ObjectInitializerProvider])
    ], SchoolDetailsPage);
    return SchoolDetailsPage;
}());
export { SchoolDetailsPage };
//# sourceMappingURL=school-details.js.map