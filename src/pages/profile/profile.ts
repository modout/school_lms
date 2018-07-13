import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user.interface';
import { LocalDbProvider } from '../../providers/local-db/local-db';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  image: string = 'assets/imgs/placeholder.png';
  user: User;
  editProfile: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider, 
  	private alertCtrl: AlertController){
  	this.local_db.getCurrentUserProfile().then(user => this.user = user)
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
      this.navCtrl.popAll().then(data =>{
          this.navCtrl.push('RegisterPage');
      })
      .catch(err => console.log(err));
    })
  }

}
