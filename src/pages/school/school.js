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
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SchoolProfilePage } from '../school-profile/school-profile';
import { SchoolUsersPage } from '../school-users/school-users';
import { SchoolDevicesPage } from '../school-devices/school-devices';
import { TimetablePage } from '../timetable/timetable';
import { ChatsPage } from '../chats/chats';
/**
 * Generated class for the SchoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SchoolPage = /** @class */ (function () {
    function SchoolPage(navCtrl, navParams, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.platform.ready().then(function (data) {
            _this.tab0Root = SchoolProfilePage;
            _this.tab1Root = SchoolUsersPage;
            _this.tab2Root = SchoolDevicesPage;
            _this.tab3Root = TimetablePage;
            _this.tab4Root = ChatsPage;
        });
    }
    SchoolPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-school',
            templateUrl: 'school.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams,
            Platform])
    ], SchoolPage);
    return SchoolPage;
}());
export { SchoolPage };
//# sourceMappingURL=school.js.map