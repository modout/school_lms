import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatsPage } from '../chats/chats';
import { DashboardPage } from '../dashboard/dashboard';
import { EconomyPage } from '../economy/economy';
import { TimetablePage } from '../timetable/timetable';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
 
  tab0Root: any = ProfilePage;
  tab1Root: any = DashboardPage;
  tab2Root: any = EconomyPage;
  tab3Root: any = TimetablePage;
  tab4Root: any = ChatsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams){
    
  }

  ionViewDidLoad(){
    
  }

  



}
