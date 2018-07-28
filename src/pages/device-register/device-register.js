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
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { FilteringProvider } from '../../providers/filtering/filtering';
/**
 * Generated class for the DeviceRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DeviceRegisterPage = /** @class */ (function () {
    function DeviceRegisterPage(navCtrl, navParams, object_init_svc, local_db, remote_sync, filter_svc) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.object_init_svc = object_init_svc;
        this.local_db = local_db;
        this.remote_sync = remote_sync;
        this.filter_svc = filter_svc;
        this.devices = [];
        this.predictions = [];
        this.searchTxt = '';
        this.supplierTxt = '';
        this.suppliers = [];
        this.supplierPredictions = [];
        this.device = this.object_init_svc.initialDevice();
        this.remote_sync.getAllVAS().subscribe(function (suppliers) {
            _this.suppliers = suppliers;
        });
    }
    DeviceRegisterPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.local_db.getDevices().then(function (devices) {
            if (devices) {
                _this.devices = devices;
                console.log('devices already on system: ', _this.devices);
            }
        });
        if (this.navParams.data) {
            console.log('data found ', this.navParams.data);
            var preData = this.navParams.data;
            this.device.type = preData.user;
            this.searchTxt = preData.school.name;
            this.device.institution_assigned_to = preData.school.id;
        }
    };
    DeviceRegisterPage.prototype.register = function () {
        var _this = this;
        this.devices.push(this.device);
        var fbRef = this.remote_sync.setDevice(this.device);
        this.device.device_id = fbRef.key;
        this.local_db.addDevices(this.devices).then(function (data) {
            _this.remote_sync.updateDevice(fbRef.key, _this.device);
            alert('Device added');
        });
    };
    DeviceRegisterPage.prototype.supplierAutocomplete = function () {
        this.supplierPredictions = this.filter_svc.supplierAutocomplete(this.suppliers, this.supplierTxt);
    };
    DeviceRegisterPage.prototype.selectSupplier = function (supplier) {
        this.device.supplier_id = supplier.company_id;
        this.device.supplier_name = supplier.company_name;
        this.supplierTxt = supplier.company_name;
        this.supplierPredictions = [];
    };
    DeviceRegisterPage.prototype.school_autocomplete = function () {
    };
    DeviceRegisterPage.prototype.selectSchool = function (pred) {
    };
    DeviceRegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-device-register',
            templateUrl: 'device-register.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ObjectInitializerProvider,
            LocalDbProvider, RemoteSyncProvider, FilteringProvider])
    ], DeviceRegisterPage);
    return DeviceRegisterPage;
}());
export { DeviceRegisterPage };
//# sourceMappingURL=device-register.js.map