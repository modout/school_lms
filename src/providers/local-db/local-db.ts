//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user.interface';

/*
  Generated class for the LocalDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalDbProvider {

  constructor(private local_db: Storage) {
  }

  setUserProfile(user: User):Promise<User>{
  	return this.local_db.set('user', user);
  }

  getCurrentUserProfile():Promise<User>{
  	return this.local_db.get('user');
  }

  removeCurrentUser(){
    return this.local_db.remove('user');
  }

  setSchool(school: any): Promise<any>{
    return this.local_db.set('school', school);
  }

  getSchool(): Promise<any>{
    return this.local_db.get('school');
  }

  removeSchool(): Promise<any>{
    return this.local_db.remove('school');
  }

  setChildren(children: any): Promise<any>{
    return this.local_db.set('children', children)
  }

  getChildren():Promise<any>{
    return this.local_db.get('children')
  }

  removeChildren(): Promise<any>{
    return this.local_db.remove('children');
  }

  setSubjects(subjects: any): Promise<any>{
    return this.local_db.set('subjects', subjects)
  }

  getSubjects():Promise<any>{
    return this.local_db.get('subjects')
  }

  removeSubjects(): Promise<any>{
    return this.local_db.remove('subjects');
  }

  setGrade(grade: any): Promise<any>{
    return this.local_db.set('grade', grade)
  }

  getGrade():Promise<any>{
    return this.local_db.get('grade')
  }

  removeGrade(): Promise<any>{
    return this.local_db.remove('grade');
  }

}
