import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user.interface';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RegisterPage } from '../register/register';
import { Learner } from '../../models/learner.interface';
import { Teacher } from '../../models/teacher.interface';
import { Parent } from '../../models/parent.interface';
import { Support } from '../../models/support.interface';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  image: string = 'assets/imgs/placeholder.png';
  user: any;
  editProfile: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider, 
  	private alertCtrl: AlertController){
  	this.local_db.getCurrentUser().then(user =>{
      if(user){
        this.user = user;
      }
    })
    .catch(err => console.log(err))
  }

  edit(){
  	this.editProfile = !this.editProfile;
  }

  showAlert(topic: string, subTitle: string){
    let alert = this.alertCtrl.create({
      title:    topic,
      subTitle: subTitle,
      cssClass: 'alertCtrl',
      buttons: ['OK']
    });
    alert.present();
  }

  logout(){
    this.local_db.removeCurrentUser().then(() =>{
      this.navCtrl.push(RegisterPage)
      .catch(err => console.log(err));
    })
  }

}
