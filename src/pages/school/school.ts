import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SchoolProfilePage } from '../school-profile/school-profile';
import { SchoolUsersPage } from '../school-users/school-users';
import { SchoolDevicesPage } from '../school-devices/school-devices';
import { TimetablePage } from '../timetable/timetable';
import { ChatsPage } from '../chats/chats';


/**
 * Generated class for the SchoolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-school',
  templateUrl: 'school.html',
})
export class SchoolPage {
  tab0Root: any;
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	private platform: Platform){

  	this.platform.ready().then(data =>{
  	  this.tab0Root = SchoolProfilePage;
  	  this.tab1Root = SchoolUsersPage;
  	  this.tab2Root = SchoolDevicesPage;
  	  this.tab3Root = TimetablePage;
      this.tab4Root = ChatsPage;
  	})

  }

 

}
