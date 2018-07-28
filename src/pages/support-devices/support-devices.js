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
import { FilteringProvider } from '../../providers/filtering/filtering';
/**
 * Generated class for the SupportDevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SupportDevicesPage = /** @class */ (function () {
    function SupportDevicesPage(navCtrl, navParams, object_init_svc, local_db, remote_sync, filter_svc) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.object_init_svc = object_init_svc;
        this.local_db = local_db;
        this.remote_sync = remote_sync;
        this.filter_svc = filter_svc;
        this.predictions = [];
        this.searchTxt = '';
        this.supplierTxt = '';
        this.suppliers = [];
        this.supplierPredictions = [];
        this.deviceBeingAdded = false;
        this.deviceBeingEdited = false;
        this.devices = this.remote_sync.getAllDevices();
    }
    SupportDevicesPage.prototype.ionViewDidLoad = function () {
    };
    SupportDevicesPage.prototype.register = function () {
        var fbRef = this.remote_sync.setDevice(this.device);
        this.device.device_id = fbRef.key;
        this.remote_sync.updateDevice(fbRef.key, this.device).then(function () {
            alert('Device added');
        });
    };
    SupportDevicesPage.prototype.addDevice = function () {
        this.deviceBeingAdded = true;
    };
    SupportDevicesPage.prototype.cancel = function () {
        this;
    };
    SupportDevicesPage.prototype.supplierAutocomplete = function () {
        this.supplierPredictions = this.filter_svc.supplierAutocomplete(this.suppliers, this.supplierTxt);
    };
    SupportDevicesPage.prototype.selectSupplier = function (supplier) {
        this.device.supplier_id = supplier.company_id;
        this.device.supplier_name = supplier.company_name;
        this.supplierTxt = supplier.company_name;
        this.supplierPredictions = [];
    };
    SupportDevicesPage.prototype.school_autocomplete = function () {
    };
    SupportDevicesPage.prototype.selectSchool = function (pred) {
    };
    SupportDevicesPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-support-devices',
            templateUrl: 'support-devices.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ObjectInitializerProvider,
            LocalDbProvider, RemoteSyncProvider, FilteringProvider])
    ], SupportDevicesPage);
    return SupportDevicesPage;
}());
export { SupportDevicesPage };
//# sourceMappingURL=support-devices.js.map