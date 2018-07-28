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
/**
 * Generated class for the VasUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VasUsersPage = /** @class */ (function () {
    function VasUsersPage(navCtrl, navParams, local_db, remote_sync, object_init) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.local_db = local_db;
        this.remote_sync = remote_sync;
        this.object_init = object_init;
        this.suppliers = [];
        this.schools = [];
        this.searchTxt = '';
        this.vas = this.object_init.initializeVAS();
    }
    VasUsersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.local_db.getCurrentUser().then(function (vas) {
            _this.remote_sync.getVAS(vas.company_id).subscribe(function (supplier) {
                _this.vas = supplier;
            });
            _this.remote_sync.getAllSchools().subscribe(function (schools) {
                _this.schools = schools;
            });
        })
            .catch(function (err) { return console.log(err); });
    };
    VasUsersPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-vas-users',
            templateUrl: 'vas-users.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LocalDbProvider,
            RemoteSyncProvider, ObjectInitializerProvider])
    ], VasUsersPage);
    return VasUsersPage;
}());
export { VasUsersPage };
//# sourceMappingURL=vas-users.js.map