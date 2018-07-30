import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Device } from '../../models/device.interface';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { Sim } from '../../models/sim.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';

@IonicPage()
@Component({
  selector: 'page-add-device-sim',
  templateUrl: 'add-device-sim.html',
})
export class AddDeviceSimPage {

  simC: Sim;
  device: Device;
  phone: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController, 
  	private remote_sync: RemoteSyncProvider, private object_init: ObjectInitializerProvider){
  	this.simC = this.object_init.initializeSim();
  	this.device = this.object_init.initialDevice();
  }

  ionViewDidLoad(){
  	if(this.navParams.data) this.device = this.navParams.data;
  	else{
  		this.toastCtrl.create({
          message: 'No device selected! go back to device list',
          closeButtonText: 'Ok',
          showCloseButton: true
        }).present()
  	}
  }

   addSimToDevice(){
    let updatedDevice: Device = this.device;
    this.remote_sync.getSimByNumber(this.phone).take(1)
    .subscribe(sims =>{
      this.simC = sims[0];
      updatedDevice.sim = sims[0];
      this.remote_sync.setSimDevice(sims[0], this.device.device_id)
      .then(() =>{
        this.remote_sync.updateDevice(this.device.device_id, updatedDevice)
        .then(() => this.toastCtrl.create({
          message: 'Sim added to device',
          duration: 5000
        }).present().then(() => this.navCtrl.pop()))
      })
      .catch(err => console.log(err))
    })
  }


}
