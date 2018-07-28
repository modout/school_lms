import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { EconomyPage } from '../economy/economy';
import { SupportDashPage } from '../support-dash/support-dash';
import { SupportTimetablePage } from '../support-timetable/support-timetable';
import { SupportContentPage } from '../support-content/support-content';
import { SupportDevicesPage } from '../support-devices/support-devices';
import { SupportMessagingPage } from '../support-messaging/support-messaging';
import { SupportSchoolsPage } from '../support-schools/support-schools';

/**
 * Generated class for the SupportHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support-home',
  templateUrl: 'support-home.html',
})
export class SupportHomePage {
  tab0Root = ProfilePage;
  tab1Root = SupportDashPage;
  tab2Root = EconomyPage;
  tab3Root = SupportTimetablePage;
  tab4Root = SupportMessagingPage;
  tab5Root = SupportSchoolsPage;
  tab6Root = SupportDevicesPage;
  tab7Root = SupportContentPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportHomePage');
  }

}
