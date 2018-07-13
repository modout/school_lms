import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider){
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SchoolDevicesPage');
  }

}
