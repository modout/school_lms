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
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';
import { RegisterPage } from '../register/register';
var VasProfilePage = /** @class */ (function () {
    function VasProfilePage(navCtrl, navParams, local_db, alertCtrl, object_init_svc, places_svc) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.local_db = local_db;
        this.alertCtrl = alertCtrl;
        this.object_init_svc = object_init_svc;
        this.places_svc = places_svc;
        this.image = 'assets/imgs/placeholder.png';
        this.editProfile = false;
        this.showUser = false;
        this.showCompany = true;
        this.service = new google.maps.places.AutocompleteService();
        this.addPredictions = [];
        this.adressSearchTxt = '';
        this.vas = this.object_init_svc.initializeVAS();
        this.local_db.getCurrentUser().then(function (data) {
            _this.vas = data;
            if (data.user.role[2])
                _this.vas.company_name = data.user.role[2];
            console.log(data);
        });
    }
    VasProfilePage.prototype.edit = function () {
        this.editProfile = !this.editProfile;
    };
    VasProfilePage.prototype.toggleUser = function () {
        this.showCompany = false;
        this.showUser = true;
    };
    VasProfilePage.prototype.toggleCompany = function () {
        this.showCompany = true;
        this.showUser = false;
    };
    VasProfilePage.prototype.showAlert = function (topic, subTitle) {
        var alert = this.alertCtrl.create({
            title: topic,
            subTitle: subTitle,
            cssClass: 'alertCtrl',
            buttons: ['OK']
        });
        alert.present();
    };
    VasProfilePage.prototype.getPredictions = function (event) {
        var _this = this;
        this.places_svc.getAdressPredictionsSA(event.target.value, this.service).then(function (data) {
            _this.addPredictions = data;
        })
            .catch(function (err) { return console.log(err); });
    };
    VasProfilePage.prototype.selectAddress = function (pred) {
        var _this = this;
        this.places_svc.geoGoder(pred.description).then(function (data) {
            _this.vas.address.street_address = data.description;
            _this.vas.address.country = data.country_long;
            _this.vas.address.postal_code = data.postal_code;
            _this.vas.address.province = data.administrative_area_level_1_lng;
            _this.vas.address.city = data.locality_lng;
            _this.vas.address.lat = data.lat;
            _this.vas.address.lng = data.lng;
            _this.adressSearchTxt = data.description.split(' ')[0] + data.description.split(' ')[1] + data.description.split(' ')[2];
            _this.addPredictions = [];
        })
            .catch(function (err) { return console.log(err); });
    };
    VasProfilePage.prototype.logout = function () {
        var _this = this;
        this.local_db.removeCurrentUser().then(function () {
            _this.navCtrl.push(RegisterPage)
                .catch(function (err) { return console.log(err); });
        });
    };
    VasProfilePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-vas-profile',
            templateUrl: 'vas-profile.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LocalDbProvider,
            AlertController, ObjectInitializerProvider,
            PlacesServiceProvider])
    ], VasProfilePage);
    return VasProfilePage;
}());
export { VasProfilePage };
//# sourceMappingURL=vas-profile.js.map