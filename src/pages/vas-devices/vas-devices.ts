import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { User } from '../../models/user.interface';
import { VAS } from '../../models/vas.interface';
import { Device } from '../../models/device.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { Parent } from '../../models/parent.interface';
import { Learner } from '../../models/learner.interface';
import { School } from '../../models/school.interface';
import { Teacher } from '../../models/teacher.interface';


@IonicPage()
@Component({
  selector: 'page-vas-devices',
  templateUrl: 'vas-devices.html',
})
export class VasDevicesPage {
  
  vas: VAS;
  devices: Device[] = [];
  device: Device;
  parents: Parent[] = [];
  learners: Learner[] = [];
  teachers: Teacher[] = [];
  schools: School[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider,
  	private remove_sync: RemoteSyncProvider, private object_init: ObjectInitializerProvider){
  	this.vas = this.object_init.initializeVAS();
  	this.device = this.object_init.initialDevice();
  	
  }

  ionViewDidLoad(){
  	this.local_db.getCurrentUser().then(vas =>{
      this.vas = vas;
  		this.remove_sync.getAllDevices().subscribe(devices =>{
  			this.devices = devices;
  		})
  	})
  	.catch(err => console.log(err))
  }

}
