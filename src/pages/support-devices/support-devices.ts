import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { User } from '../../models/user.interface';
import { School } from '../../models/school.interface';
import { Device } from '../../models/device.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { Observable } from 'rxjs';
import { VAS } from '../../models/vas.interface';
import { FilteringProvider } from '../../providers/filtering/filtering';
import { Sim } from '../../models/sim.interface';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-support-devices',
  templateUrl: 'support-devices.html',
})
export class SupportDevicesPage {
  service = new google.maps.places.AutocompleteService();
  devices: Observable<Device[]>;
  device: Device;
  predictions: any[] = [];
  searchTxt: string = '';
  supplierTxt: string = '';
  suppliers: VAS[] = [];
  schools: School[];
  schoolPredictions: School[];
  simC: Sim;
  sims: Observable<Sim[]> ;
  isSim: boolean = false;
  isDevice: boolean = false;
  showSims: boolean = false;
  supplierPredictions: VAS[] = [];
  deviceBeingAdded: boolean = false;
  deviceBeingEdited: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,private object_init_svc: ObjectInitializerProvider,
  	private local_db: LocalDbProvider, private remote_sync: RemoteSyncProvider, private filter_svc: FilteringProvider,
    private place_svc: PlacesServiceProvider){
  	this.devices = this.remote_sync.getAllDevices();
    this.device = this.object_init_svc.initialDevice();
    this.simC = this.object_init_svc.initializeSim();
    this.remote_sync.getAllVAS().subscribe(data =>{
      this.suppliers = data;
    })
    this.sims = this.remote_sync.getAllSims()
  }

  ionViewDidLoad(){
  }

  register(){
    let fbRef = this.remote_sync.setDevice(this.device);
    this.device.device_id = fbRef.key;
    this.remote_sync.updateDevice(fbRef.key, this.device).then(() =>{
    	alert('Device added');
      this.cancel();
    })
  }

  addDevice(){
  	this.deviceBeingAdded = true;
  }

  cancel(){
  	this.deviceBeingAdded = false;
  	this.deviceBeingEdited = false;
    this.isSim = false;
    this.isDevice = false;
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

  showSimCards(){
    this.showSims = true;
  }

  showDevices(){
    this.showSims = false;
  }

  school_autocomplete(event){
    this.place_svc.getEstablishmentPredictionsSA(event.target.value, this.service).then(predictions =>{
      this.schoolPredictions = predictions;
    })
    .catch(err => console.log(err))
  }

  simCapture(){
    this.isSim = true;
    this.isDevice = false;
  }

  selectSchool(pred){
    this.device.institution_assigned_to = pred.place_id;
    this.searchTxt = pred.description
    this.schoolPredictions = [];
  }

  vasAutocomplete(event){
    this.supplierPredictions = this.filter_svc.supplierAutocomplete(this.suppliers, event.target.value)
  }

  selectVAS(pred: VAS){
    console.log(pred)
    this.device.supplier_id = pred.company_id;
    this.device.supplier_name = pred.company_name;
    this.simC.supplier_id = pred.company_id;
    this.simC.supplier_name = pred.company_name;
    this.supplierTxt = pred.company_name;
    this.supplierPredictions = [];
  }

  saveSim(){
    let key = this.remote_sync.setSim(this.simC)
    if(key.key){
      alert('Device successfully registered on th system')
      this.cancel();
    }
  }

}
