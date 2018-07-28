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
var VasDevicesPage = /** @class */ (function () {
    function VasDevicesPage(navCtrl, navParams, local_db, remove_sync, object_init) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.local_db = local_db;
        this.remove_sync = remove_sync;
        this.object_init = object_init;
        this.devices = [];
        this.parents = [];
        this.learners = [];
        this.teachers = [];
        this.schools = [];
        this.vas = this.object_init.initializeVAS();
        this.device = this.object_init.initialDevice();
    }
    VasDevicesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.local_db.getCurrentUser().then(function (vas) {
            _this.vas = vas;
            _this.remove_sync.getAllDevices().subscribe(function (devices) {
                _this.devices = devices;
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    VasDevicesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-vas-devices',
            templateUrl: 'vas-devices.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LocalDbProvider,
            RemoteSyncProvider, ObjectInitializerProvider])
    ], VasDevicesPage);
    return VasDevicesPage;
}());
export { VasDevicesPage };
//# sourceMappingURL=vas-devices.js.map