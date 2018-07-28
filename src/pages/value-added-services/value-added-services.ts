import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { VasProfilePage } from '../vas-profile/vas-profile';
import { VasUsersPage } from '../vas-users/vas-users';
import { TimetablePage } from '../timetable/timetable';
import { VasDevicesPage } from '../vas-devices/vas-devices';
import { ChatsPage } from '../chats/chats';

/**
 * Generated class for the ValueAddedServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-value-added-services',
  templateUrl: 'value-added-services.html',
})
export class ValueAddedServicesPage {
  tab0Root: any;
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform){

  	this.platform.ready().then(data =>{
  	  this.tab0Root = VasProfilePage;
  	  this.tab1Root = VasUsersPage;
  	  this.tab2Root = VasDevicesPage;
  	  this.tab3Root = TimetablePage;
      this.tab4Root = ChatsPage;
  	})
  }

  

}
