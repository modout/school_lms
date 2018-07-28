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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RegisterPage } from '../register/register';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, navParams, local_db, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.local_db = local_db;
        this.alertCtrl = alertCtrl;
        this.image = 'assets/imgs/placeholder.png';
        this.editProfile = false;
        this.local_db.getCurrentUser().then(function (user) {
            if (user) {
                _this.user = user;
            }
        })
            .catch(function (err) { return console.log(err); });
    }
    ProfilePage.prototype.edit = function () {
        this.editProfile = !this.editProfile;
    };
    ProfilePage.prototype.showAlert = function (topic, subTitle) {
        var alert = this.alertCtrl.create({
            title: topic,
            subTitle: subTitle,
            cssClass: 'alertCtrl',
            buttons: ['OK']
        });
        alert.present();
    };
    ProfilePage.prototype.logout = function () {
        var _this = this;
        this.local_db.removeCurrentUser().then(function () {
            _this.navCtrl.push(RegisterPage)
                .catch(function (err) { return console.log(err); });
        });
    };
    ProfilePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LocalDbProvider,
            AlertController])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.js.map