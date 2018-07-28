import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { User } from '../../models/user.interface';
import { School } from '../../models/school.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';


@IonicPage()
@Component({
  selector: 'page-school-users',
  templateUrl: 'school-users.html',
})
export class SchoolUsersPage {
  school: School;
  userType: string = '';
  users: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider, 
  	private remote_sync: RemoteSyncProvider, private object_init_svc: ObjectInitializerProvider){
  	this.school = this.object_init_svc.initializeSchool();
  }

  ionViewDidLoad(){
  	this.local_db.getSchool().then(school =>{
  		
      this.remote_sync.getSchoolUsers(school.id).subscribe(users =>{
          this.users = users;
      })

  		this.remote_sync.getSchoolLearners(school.id).subscribe(learners =>{
  			this.school.learners = learners;
  		})

  		this.remote_sync.getSchoolTeachers(school.id).subscribe(teachers =>{
  			this.school.teachers = teachers;
  		})

  		this.remote_sync.getSchoolParents(school.id).subscribe(parents =>{
  			this.school.parents = parents;
  		})
  	})
  }

  showLearners(){
  	this.users = this.school.learners;
  }

  showTeachers(){
  	this.users = this.school.teachers;
  }

  showParents(){
  	this.users = this.school.parents;
  }

}
