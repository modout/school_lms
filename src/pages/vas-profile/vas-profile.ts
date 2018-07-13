import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user.interface';
import { LocalDbProvider } from '../../providers/local-db/local-db';


@IonicPage()
@Component({
  selector: 'page-vas-profile',
  templateUrl: 'vas-profile.html',
})
export class VasProfilePage {

  image = 'assets/imgs/placeholder.png';
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
