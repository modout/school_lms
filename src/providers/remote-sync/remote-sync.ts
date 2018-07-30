//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Parent } from '../../models/parent.interface';
import { Device } from '../../models/device.interface';
import { Learner } from '../../models/learner.interface';
import { Teacher } from '../../models/teacher.interface';
import { School } from '../../models/school.interface';
import { VAS } from '../../models/vas.interface';
import { Observable } from 'rxjs';
import { SchoolManagement } from '../../models/school_management.interface';
import { Support } from '../../models/support.interface';
import { Sim } from '../../models/sim.interface';

@Injectable()
export class RemoteSyncProvider{

  constructor(private db: AngularFireDatabase) {
  }

  //Setters--------------------------------------------------------------------------------------------------------

  setSupport(support: Support){
    return this.db.list('Users').push(support)
  }

  setSim(sim: Sim){
    return this.db.list('Sims').push(sim);
  }

  setParent(parent: Parent){
    return this.db.list('Users').push(parent);
  }

  setDevice(device: Device){
    return this.db.list('Devices').push(device);
  }

  setLearner(learner: Learner){
  return this.db.list('Users').push(learner);
  }

  setSchoolManagement(school_management: SchoolManagement){
    return this.db.list('Users').push(school_management);
  }

  setSchool(school: School){
    return this.db.list('Schools').push(school);
  }

  setTeacher(teacher: Teacher){
    return this.db.list('Users').push(teacher);
  }

  setVAS(vas: VAS){
    return this.db.list('Users').push(vas);
  }

  setSimDevice(sim: Sim, device_id: string){
    return this.db.object(`Sims/${sim.sim_id}`).set(sim)
  }

  //-----------------------------------------------------------------------------------------------------------------

  //getters

  getUser(uid: string):Observable<any>{
    return this.db.object(`Users/${uid}`).valueChanges();
  }

  getAllSims(): Observable<Sim[]>{
    return this.db.list<Sim>('Sims').valueChanges();
  }

  getSimByNumber(number: string): Observable<Sim[]>{
    return this.db.list<Sim>(`Sims`, ref => ref.orderByChild('phone_no').equalTo(number))
    .valueChanges()
  }

  getAllDevices(): Observable<Device[]>{
    return this.db.list<Device>('Devices').valueChanges();
  }

  getAllUsers(): Observable<any[]>{
    return this.db.list('Users').valueChanges();
  }

  getAllVAS(): Observable<VAS[]>{
    return this.db.list<VAS>('Users', ref => ref.orderByChild('type').equalTo('VAS')).valueChanges();
  }

  getAllLearners():Observable<Learner[]>{
    return this.db.list<Learner>('Users', ref => ref.orderByChild('type').equalTo('learner')).valueChanges();
  }

  getAllTeachers():Observable<Teacher[]>{
    return this.db.list<Teacher>('Users', ref => ref.orderByChild('type').equalTo('teacher')).valueChanges();
  }

  getAllParents():Observable<Parent[]>{
  return this.db.list<Parent>('Users', ref => ref.orderByChild('type').equalTo('parent')).valueChanges();
  }

  getAllSchools(): Observable<School[]>{
    return this.db.list<School>('Schools').valueChanges();
  }

  getVAS(vas_id: string):Observable<VAS>{
    return this.db.object<VAS>(`Users/${vas_id}`).valueChanges()
  }

  getParent(uid: string):Observable<Parent>{
    return this.db.object<Parent>(`Users/${uid}`).valueChanges();
  }

  getLearner(uid: string):Observable<Learner>{
    return this.db.object<Learner>(`Users/${uid}`).valueChanges();
  }

  getTeacher(uid: string):Observable<Teacher>{
    return this.db.object<Teacher>(`Users/${uid}`).valueChanges();
  }

  getDevice(device_id: string): Observable<Device>{
    return this.db.object<Device>(`Devices/${device_id}`).valueChanges();
  }

  getSchoolDevices(school_id: string): Observable<Device[]>{
    return this.db.list<Device>('Devices', ref => ref.orderByChild('institution_assigned_to').equalTo(school_id)).valueChanges();
  }

  getVasDevices(supplier_id: string): Observable<Device[]>{
    return this.db.list<Device>('Devices', ref => ref.orderByChild('supplier_id').equalTo(supplier_id)).valueChanges();
  }

  getSchool(school_id: string):Observable<School>{
    return this.db.object<School>(`Schools/${school_id}`).valueChanges();
  }

  getSchoolUsers(school_id:string):Observable<Parent[]>{
    return this.db.list<Parent>('Users', ref => ref.orderByChild('school_id').equalTo(school_id)).valueChanges();
  }

  getSchoolParents(school_id: string):Observable<Parent[]>{
    return this.db.list<Parent>('Users', ref => ref.orderByChild('school_id').equalTo(school_id))
    .valueChanges().map(users => users.filter(user => user.type === 'parent'))
  }

  getSchoolLearners(school_id: string): Observable<Learner[]>{
    return this.db.list<Learner>('Users', ref => ref.orderByChild('school_id').equalTo(school_id))
    .valueChanges().map(users => users.filter(user => user.type === 'learner' ))
  }

  getSchoolTeachers(school_id: string): Observable<Teacher[]>{
    return this.db.list<Teacher>('Users', ref => ref.orderByChild('school_id').equalTo(school_id))
    .valueChanges().map(users => users.filter(user => user.type === 'teacher'))
  }

  getTeachersPerSubject(school_id: string, subject: string):Observable<Teacher[]>{
    return this.db.list<Teacher>('Users', ref => ref.orderByChild('school_id').equalTo(school_id))
    .valueChanges()
    .map(users => users.filter(user => (user.type === 'teacher') ))
    .map(users =>  users.filter(user => {
        let truth: boolean = false;
          if(user.subjects){
            user.subjects.forEach(usersubject =>{
              if(usersubject.indexOf(subject) != -1) truth = true;
            })
            return truth;
          }else{
            return false;
          }
        }))
  }

  //------------------------------------------------------------------------------------------------------------------------

  //updates

  updateUser(user: any){
    return this.db.object(`Users/${user.profile.uid}`).set(user);
  }

  updateParent(uid: string, parent: Parent){
    return this.db.object(`Users/${uid}`).set(parent);
  }

  updateDevice(device_id: string, device: Device){
    return this.db.object(`Devices/${device_id}`).set(device);
  }

  updateSchoolManager(uid: string, person: SchoolManagement){
    return this.db.object(`Users/${uid}`).set(person);
  }

  upateLearner(uid: string, learner: Learner){
    return this.db.object(`Users/${uid}`).set(learner);
  }

  updateTeacher(uid:string, teacher: Teacher){
    return this.db.object(`Users/${uid}`).set(teacher);
  }

  updateSchool(school_id: string, school: School){
    return this.db.object(`Schools/${school_id}`).set(school);
  }

  updateVAS(vas_id: string, vas: VAS){
    return this.db.object(`Users/${vas_id}`).set(vas);
  }

  updateSim(sim: Sim){
    return this.db.object(`Sims/${sim.sim_id}`).set(sim);
  }

  

 //------------------------------------------------------------------------------------------------------------------------- 


}
