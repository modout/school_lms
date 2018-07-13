import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.interface';
import { LocalDbProvider } from '../../providers/local-db/local-db';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  user: User;
  tab0Root: string ='ProfilePage';
  tab1Root: string ='DashboardPage';
  tab2Root: string = 'EconomyPage';
  tab3Root: string = 'TimetablePage';
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider){
    this.local_db.getCurrentUserProfile().then(user => this.user = user)
    .catch(err => console.log(err))
  }

  ionViewDidLoad(){
    
  }

  



}
