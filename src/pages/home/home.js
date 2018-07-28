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
import { ChatsPage } from '../chats/chats';
import { DashboardPage } from '../dashboard/dashboard';
import { EconomyPage } from '../economy/economy';
import { TimetablePage } from '../timetable/timetable';
import { ProfilePage } from '../profile/profile';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab0Root = ProfilePage;
        this.tab1Root = DashboardPage;
        this.tab2Root = EconomyPage;
        this.tab3Root = TimetablePage;
        this.tab4Root = ChatsPage;
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-home',
            templateUrl: 'home.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map