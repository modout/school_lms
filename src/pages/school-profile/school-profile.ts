import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { User } from '../../models/user.interface';
import { School } from '../../models/school.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { RegisterPage } from '../register/register';


@IonicPage()
@Component({
  selector: 'page-school-profile',
  templateUrl: 'school-profile.html',
})
export class SchoolProfilePage {
    
  school: School;
  changeName: boolean = false;
  changePricipal: boolean = false;
  profileChanged: boolean = false;
  showSchool: boolean = true;
  showUser: boolean = false;
  constructor(public navCtrl: NavController, private local_db: LocalDbProvider,
   public navParams: NavParams, private object_init_svc: ObjectInitializerProvider){
    this.school = this.object_init_svc.initializeSchool();
  }

  ionViewDidLoad(){
    this.local_db.getSchool().then(school =>{
      this.school = school;
    })
  }

  editName(){
  	this.changeName = !this.changeName;
  	this.profileChanged = true;
  }

  toggleUser(){
    this.showSchool = !this.showSchool;
    this.showUser = !this.showUser;
  }

  editPrincipal(){
  	this.changePricipal = !this.changePricipal;
  	this.profileChanged = true;
  }

  saveChanges(){
  	this.local_db.setSchool(this.school).then(data =>{
    this.changeName = false;
    this.changePricipal = false;
    this.profileChanged = false;
  		alert('changes saved!');
  	})
  }
  
  logout(){
    this.local_db.removeCurrentUser().then(() =>{
      this.navCtrl.push(RegisterPage)
      .catch(err => console.log(err));
    })
  }


}
