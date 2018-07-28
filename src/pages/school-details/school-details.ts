import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserRolesProvider } from '../../providers/user-roles/user-roles'
import { FilteringProvider } from '../../providers/filtering/filtering';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { School } from '../../models/school.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';


@IonicPage()
@Component({
  selector: 'page-school-details',
  templateUrl: 'school-details.html',
})
export class SchoolDetailsPage {

  predictions: string[] = [];
  searchTxt: string = '';
  school: School;
  constructor(public navCtrl: NavController, public navParams: NavParams, private user_roles_svc: UserRolesProvider,
  	private filtering_svc: FilteringProvider, private local_db: LocalDbProvider, private view: ViewController,
    private object_init_service: ObjectInitializerProvider){
    this.school = this.object_init_service.initializeSchool();
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
