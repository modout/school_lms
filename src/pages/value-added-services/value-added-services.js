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
import { VasProfilePage } from '../vas-profile/vas-profile';
import { VasUsersPage } from '../vas-users/vas-users';
import { TimetablePage } from '../timetable/timetable';
import { VasDevicesPage } from '../vas-devices/vas-devices';
import { ChatsPage } from '../chats/chats';
/**
 * Generated class for the ValueAddedServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ValueAddedServicesPage = /** @class */ (function () {
    function ValueAddedServicesPage(navCtrl, navParams, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.platform.ready().then(function (data) {
            _this.tab0Root = VasProfilePage;
            _this.tab1Root = VasUsersPage;
            _this.tab2Root = VasDevicesPage;
            _this.tab3Root = TimetablePage;
            _this.tab4Root = ChatsPage;
        });
    }
    ValueAddedServicesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-value-added-services',
            templateUrl: 'value-added-services.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform])
    ], ValueAddedServicesPage);
    return ValueAddedServicesPage;
}());
export { ValueAddedServicesPage };
//# sourceMappingURL=value-added-services.js.map