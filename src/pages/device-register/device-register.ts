import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Device } from '../../models/device.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { VAS } from '../../models/vas.interface';
import { FilteringProvider } from '../../providers/filtering/filtering';
/**
 * Generated class for the DeviceRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device-register',
  templateUrl: 'device-register.html',
})
export class DeviceRegisterPage {
  device: Device;
  devices: Device[] = [];
  predictions: any[] = [];
  searchTxt: string = '';
  supplierTxt: string = '';
  suppliers: VAS[] = [];
  supplierPredictions: VAS[] = [];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private object_init_svc: ObjectInitializerProvider,
  	private local_db: LocalDbProvider, private remote_sync: RemoteSyncProvider, private filter_svc: FilteringProvider) {
  	this.device = this.object_init_svc.initialDevice();
  	this.remote_sync.getAllVAS().subscribe(suppliers =>{
      this.suppliers = suppliers;
    })
  }

  ionViewDidLoad(){
   	this.local_db.getDevices().then(devices =>{
   		if(devices){
   			this.devices = devices;
   			console.log('devices already on system: ', this.devices);
   		}
   	})

   	if(this.navParams.data){
  		console.log('data found ',  this.navParams.data)
  		let preData = this.navParams.data;
  		this.device.type = preData.user;
  		this.searchTxt = preData.school.name;
      this.device.institution_assigned_to = preData.school.id;
  	}
  }

  register(){
  	this.devices.push(this.device);
    let fbRef = this.remote_sync.setDevice(this.device);
    this.device.device_id = fbRef.key;
  	this.local_db.addDevices(this.devices).then(data =>{
      this.remote_sync.updateDevice(fbRef.key, this.device);
  		alert('Device added');
  	})
  }

  supplierAutocomplete(){
    this.supplierPredictions = this.filter_svc.supplierAutocomplete(this.suppliers, this.supplierTxt);
  }

  selectSupplier(supplier: VAS){
    this.device.supplier_id = supplier.company_id;
    this.device.supplier_name = supplier.company_name;
    this.supplierTxt = supplier.company_name;
    this.supplierPredictions = [];
  }

  school_autocomplete(){
    
  }

  selectSchool(pred){

  }

}
