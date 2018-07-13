import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserRolesProvider } from '../../providers/user-roles/user-roles'
import { FilteringProvider } from '../../providers/filtering/filtering';
import { LocalDbProvider } from '../../providers/local-db/local-db'
/**
 * Generated class for the SchoolDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-school-details',
  templateUrl: 'school-details.html',
})
export class SchoolDetailsPage {

  predictions: string[] = [];
  searchTxt: string = '';
  school = {
  	name: '',
  	province: '',
  	district: '',
  	id: ''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private user_roles_svc: UserRolesProvider,
  	private filtering_svc: FilteringProvider, private local_db: LocalDbProvider, private view: ViewController){
  }

  ionViewDidLoad(){
  }

  school_autocomplete(){
  	this.predictions = [];
  	this.predictions = this.filtering_svc.autocomplete(this.user_roles_svc.SCHOOLS, this.searchTxt);
  }

  selectSchool(school: string){
  	this.searchTxt = school;
  	this.school.name = school;
  	this.predictions = [];
  }

  done():Promise<any>{
  	this.view.dismiss();
  	return this.local_db.setSchool(this.school)
  }

}
