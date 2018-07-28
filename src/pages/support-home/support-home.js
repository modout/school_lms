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
import { ProfilePage } from '../profile/profile';
import { EconomyPage } from '../economy/economy';
import { SupportDashPage } from '../support-dash/support-dash';
import { SupportTimetablePage } from '../support-timetable/support-timetable';
import { SupportContentPage } from '../support-content/support-content';
import { SupportDevicesPage } from '../support-devices/support-devices';
import { SupportMessagingPage } from '../support-messaging/support-messaging';
import { SupportSchoolsPage } from '../support-schools/support-schools';
/**
 * Generated class for the SupportHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SupportHomePage = /** @class */ (function () {
    function SupportHomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab0Root = ProfilePage;
        this.tab1Root = SupportDashPage;
        this.tab2Root = EconomyPage;
        this.tab3Root = SupportTimetablePage;
        this.tab4Root = SupportMessagingPage;
        this.tab5Root = SupportSchoolsPage;
        this.tab6Root = SupportDevicesPage;
        this.tab7Root = SupportContentPage;
    }
    SupportHomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SupportHomePage');
    };
    SupportHomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-support-home',
            templateUrl: 'support-home.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], SupportHomePage);
    return SupportHomePage;
}());
export { SupportHomePage };
//# sourceMappingURL=support-home.js.map