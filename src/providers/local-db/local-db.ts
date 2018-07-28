//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { User } from '../../models/user.interface';
import { VAS } from '../../models/vas.interface';
import { Device } from '../../models/device.interface';
import { Learner } from '../../models/learner.interface';
import { Parent } from '../../models/parent.interface';
import { Teacher } from '../../models/teacher.interface';
import { School } from '../../models/school.interface';
import { SchoolManagement } from '../../models/school_management.interface';

@Injectable()
export class LocalDbProvider {

  constructor(private local_db: Storage){
  }

  //Getters-----------------------------------------------------------------------------------------------------------------------

  getCurrentUser():Promise<any>{
    return this.local_db.get('current_schoolLms_User');
  }

  getSchool(): Promise<School>{
    return this.local_db.get('school');
  }

  getType(): Promise<string>{
    return this.local_db.get('type');
  }

  getDevices(): Promise<Device[]>{
    return this.local_db.get('devices');
  }

  //-------------------------------------------------------------------------------------------------------------------------------

//Setters-------------------------------------------------------------------------------------------------------------------------
  setUser(user: any): Promise<any>{
    this.setType('user');
    return this.local_db.set('current_schoolLms_User', user);
  }

  setSchoolManagement(school_man: SchoolManagement){
      this.setType('user');
      return this.local_db.set('current_schoolLms_User', school_man);
  }

  setDevice(device: Device): Promise<Device>{
    return this.local_db.set('device', device);
  }

  addDevices(devices: Device[]): Promise<Device[]>{
    return this.local_db.set('devices', devices);
  }

  setVAS(vas: VAS):Promise<VAS>{
    this.setType('user');
    return this.local_db.set('current_schoolLms_User', vas);
  }

  setTeacher(teacher: Teacher):Promise<Teacher>{
    this.setType('user');
    return this.local_db.set('current_schoolLms_User', teacher);
  }

  setLearner(learner: Learner):Promise<Learner>{
    this.setType('user');
    return this.local_db.set('current_schoolLms_User', learner);
  }

  setParent(parent: Parent):Promise<Parent>{
    this.setType('user');
    return this.local_db.set('current_schoolLms_User', parent);
  }

  setSchool(school: School): Promise<School>{
    this.setType('school');
    return this.local_db.set('school', school);
  }

  setType(type: string): Promise<string>{
    return this.local_db.set('type', type);
  }

  //Removers-----------------------------------------------------------------------------------------------------------------

  removeSchool(): Promise<any>{
    return this.local_db.remove('school');
  }

  removeCurrentUser(){
    this.removeType()
    return this.local_db.remove('current_schoolLms_User');
    
  }

  removeType(){
    return this.local_db.remove('type')
  }

}
