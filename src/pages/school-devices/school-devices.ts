import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { User } from '../../models/user.interface';
import { School } from '../../models/school.interface';
import { Device } from '../../models/device.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';

/**
 * Generated class for the SchoolDevicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-school-devices',
  templateUrl: 'school-devices.html',
})
export class SchoolDevicesPage {

  school: School;
  devices: Device[] = [];
  device: Device;
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider,
  	private remote_sync: RemoteSyncProvider, private object_init_svc: ObjectInitializerProvider){
  	this.device = this.object_init_svc.initialDevice();
  	this.school = this.object_init_svc.initializeSchool();
  }

  ionViewDidLoad(){
    this.local_db.getSchool().then(school =>{
    	console.log(school);
    	this.school = school;
    	this.remote_sync.getSchoolDevices(school.id).subscribe(devices =>{
    		this.devices = devices;
        this.school.devices = devices;
    	})
      this.remote_sync.getSchoolLearners(school.id).subscribe(learners =>{
        this.school.learners = learners;
      })
      this.remote_sync.getSchoolTeachers(school.id).subscribe(teachers =>{
        this.school.teachers = teachers;
      })
    })
  }

}
