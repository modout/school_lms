import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { User } from '../../models/user.interface';


@IonicPage()
@Component({
  selector: 'page-school-profile',
  templateUrl: 'school-profile.html',
})
export class SchoolProfilePage {
  image = 'assets/imgs/placeholder.png';
  school: any = {
    name: '',
    province: '',
    district: '',
    lat: 0,
    lng: 0,
    country: '',
    postal_code: '',
    principlal: '',
    id: ''
  }
  user: User = {
      firstname: '',
      lastname: '',
      email: '',
      title: '',
      id_or_passport: '',
      gender: '',
      cell_number: '',
      home_number: '',
      work_number: '',
      dp: '',
      proof_of_address: '',
      residential_address: {
        street_address: '',
        city: '',
        province: '',
        country: '',
        postal_code: '',
        lat: 0,
        lng: 0
      }
    }
    changeName: boolean = false;
    changePricipal: boolean = false;
    profileChanged: boolean = false;
  constructor(public navCtrl: NavController, private local_db: LocalDbProvider,
   public navParams: NavParams){
		this.local_db.getSchool().then(school =>{
			console.log('getting school')
			this.school = school;
			console.log(school);
		})
		this.local_db.getCurrentUserProfile().then(user =>{
			console.log('getting user')
			this.user = user;
			console.log(user);
		})	
  }

  editName(){
  	this.changeName = !this.changeName;
  	this.profileChanged = true;
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
      this.navCtrl.popAll().then(data =>{
          this.navCtrl.push('RegisterPage');
      })
      .catch(err => console.log(err));
    })
  }


}
