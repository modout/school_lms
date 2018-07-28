import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { User } from '../../models/user.interface';
import { VAS } from '../../models/vas.interface';
import { School } from '../../models/school.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';

/**
 * Generated class for the VasUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vas-users',
  templateUrl: 'vas-users.html',
})
export class VasUsersPage {

  vas: VAS;
  suppliers: VAS[] = [];
  schools: School[] = [];
  searchTxt: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider, 
  	private remote_sync: RemoteSyncProvider, private object_init: ObjectInitializerProvider){
  	this.vas = this.object_init.initializeVAS();
  }

  ionViewDidLoad(){
  	this.local_db.getCurrentUser().then(vas =>{
  		this.remote_sync.getVAS(vas.company_id).subscribe(supplier =>{
  			this.vas = supplier;
  		})

  		this.remote_sync.getAllSchools().subscribe(schools =>{
  			this.schools = schools;
  		})
  	})
  	.catch(err => console.log(err))
  }

}
