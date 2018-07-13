import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserRolesProvider } from '../../providers/user-roles/user-roles';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { User } from '../../models/user.interface';
import { FilteringProvider } from '../../providers/filtering/filtering';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';
import { Address2 } from '../../models/address2.interface';
import { SchoolPage } from '../school/school';
import { ValueAddedServicesPage } from '../value-added-services/value-added-services';
import { HomePage } from '../home/home';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('proof') proofInput: ElementRef;
  @ViewChild('affidavit') affidavitInput: ElementRef;
  address: Address2;
  role: string[] = [];
  roleComplete: boolean = false;
  roles: string[] = [];
  userRoles: any;
  userRole: string[] = ['null','null','null','null','null','null'];
  level: number = 0;
  roleString: string = '';
  user: User;
  proof_attach: any;
  affidavit_attach: any;
  schoolPredictions: any[] = [];
  addPredictions: any[] = [];
  searchTxt: string = '';
  school = {
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
  subjects: any[] = [];
  grade: string = '';
  showSchoolPrompt: boolean = false;
  newSchool: boolean = false;
  schoolSelected: boolean = false;
  isLearner: boolean = false;
  isTeacher: boolean = false;
  isParent: boolean = false;
  isVAS: boolean = false;
  subjectField: string = '';
  child: string = '';
  children: string[] = [];
  subjectsArry: string[] = [];
  gradesArry: string[] = [];
  service = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController, public navParams: NavParams, private user_role_svc: UserRolesProvider, 
    private local_db: LocalDbProvider, private filtering_svc: FilteringProvider, private schools_popup: ModalController,
    private place_svc: PlacesServiceProvider){
  	this.user = {
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
  }

  ionViewDidLoad() {
  	this.userRoles = this.user_role_svc.USER_ROLES;
    this.getUniques(0);
  }

  updateproof(event){
    this.proof_attach = event.target.value;
  }

  addSubject(subject){
    this.subjects.push(subject + '  ' + this.grade);
    this.subjectField = '';
    this.subjectsArry = [];
  }

  addGrade(grade){
    this.grade = grade;
    this.gradesArry = [];
  }

  updateaffidavitf(event){
    this.affidavit_attach = event.target.value;
  }
  //Get unique strings in a certain column
  getUniques(col: number):any[]{
    let tempArry: any[] = [];
    for(var row: number = 0; row < this.user_role_svc.USER_ROLES.length; ++row){
      if(tempArry.indexOf(this.userRoles[row][col]) == -1){
        tempArry.push(this.userRoles[row][col]);
      }
    }
    this.roles = tempArry;
    return tempArry;
  }

  selectRole(role: string){
    console.log('level: ', this.level);
    console.log('selecting role')
    let tempArry: any[] = [];
    if(this.roleString === '') this.roleString += role; //Update roleString
    else{
      this.roleString +=  '   >>   ' + role;
    }
    console.log(this.roleString);
    this.userRole[this.level] = role; //update userRole
     console.log('updating  userRole...', this.userRole)
    for(var row: number = 0; row < this.user_role_svc.USER_ROLES.length; ++row){ //update tempArry
      if(tempArry.indexOf(this.userRoles[row][this.level +1]) == -1 && //check if string exists in tempArry
        this.isDecendant(this.userRoles[row], this.userRole) &&  //Check if is child of selected
        this.userRoles[row][this.level +1] !== 'null' && //Check if string isn't null
        this.level < 4) 
      {
        tempArry.push(this.userRoles[row][this.level +1]);
        console.log('tempArray: ', tempArry);
      }
    }
    if(tempArry.length == 0){
      this.searchRole(this.userRole);
      this.user.role = this.userRole;
      this.roleComplete = true;
      let roleCode = parseInt(this.userRole[5]);
      console.log('rolecode: ', roleCode);
      if(this.userRole[5] ==='58') {

        this.newSchool = true;
      }
      if(this.userRole[5] ==='63'){
        this.isLearner = true;
      } 
      if(this.userRole[5] ==='64'){
        this.isTeacher = true;
      }
      if(this.userRole[5] ==='65'){
        this.isParent = true;
      }
      if(roleCode >= 66 && roleCode <= 72)
      {
        this.isVAS = true;
        console.log('is vas');
      }
      //console.log('userRole[5]: ', this.userRole[5]);
      //console.log('roleCode: ', roleCode);
      
      if(roleCode <= 20 || (roleCode >=58 && roleCode <=60) || (roleCode >=63 && roleCode <=65)) this.showPopUp();
    }
    this.roles = tempArry;
    ++this.level
    return tempArry;
  }

  searchRole(arry: string[]){
    let tempArr = this.user_role_svc.USER_ROLES
    loop1:
    for(var row = 0; row < this.user_role_svc.USER_ROLES.length; ++row){
      loop2:
      for(var col = 0; col < 5; ++col){
          if(tempArr[row][col] != arry[col]){
            break loop2
          }else if(col == 4 && tempArr[row][col] === arry[col]){
            this.userRole = tempArr[row];
            break loop1;
          }
      }
    }
  }

  resetRole(){
    this.getUniques(0);
    this.userRole = ['null','null','null','null','null','null'];
    this.showSchoolPrompt = false;
    this.roleComplete = false;
    this.roleString = '';
    this.level = 0;
    this.newSchool = false;
    this.isLearner = false;
    this.isTeacher = false;
    this.isParent = false;
    this.grade = '';
    this.subjects = [];
    this.child = '';
    this.children = [];
  }

  addChild(){
    this.children.push(this.child);
    this.child = '';
  }

  deleteChild(nearby:string) {
    const index: number = this.children.indexOf(nearby);
    if (index !== -1) {
        this.children.splice(index, 1);
    }        
  }

  deleteSubject(nearby:string) {
    const index: number = this.subjects.indexOf(nearby);
    if (index !== -1) {
        this.subjects.splice(index, 1);
    }        
  }

  register(){
    this.local_db.setUserProfile(this.user).then(data1 =>{
        return this.local_db.setSubjects(this.subjects)
    }).then(data2 =>{
        return this.local_db.setSchool(this.school);
    })
    .then(data3 =>{
        return this.local_db.setChildren(this.children);
    })
    .then(data4 =>{
        return this.local_db.setGrade(this.grade);
    } )
    .then(data5 =>{
      if(this.newSchool){
        this.navCtrl.setRoot(SchoolPage)
        .catch(err => console.log(err))
      }else if(this.isVAS){
          this.navCtrl.setRoot(ValueAddedServicesPage);
      }
      else{
        this.navCtrl.setRoot(HomePage)
        .catch(err => console.log(err))
      }
    })
  }

  chooseAffidavit(){
    this.affidavitInput.nativeElement.click();
  }
  chooseProof(){
    this.proofInput.nativeElement.click();
  }

  showPopUp(){
    this.showSchoolPrompt = true;
  }

  isDecendant(arry1: string[], arry2: string[]): boolean{
    for(var i: number = 0; i <= this.level; ++i ){
        if(arry1[i] !== arry2[i]) return false;
    }
    return true;
  }

   school_autocomplete(event:any){
    this.place_svc.getPlacePredictionsSA(event.target.value, this.service).then(data =>{
      this.schoolPredictions = data;
    })
    .catch(err => console.log(err))
  }

  selectSchool(school: any){
    this.place_svc.geoGoder(school.description).then(data =>{
      console.log('Seleted school: ', data);
       this.searchTxt = data.description;
        this.school.name = data.name;
        this.school.province = data.administrative_area_level_1_lng;
        this.school.lat = data.lat;
        this.school.lng = data.lng;
        this.school.postal_code = data.postal_code;
        this.school.country = data.country_long;
        this.schoolPredictions = [];
        this.schoolSelected = true;
    })
    .catch(err => console.log(err))
  }

  unselectSchool(){
    this.searchTxt = '';
    this.school.name = '';
    this.schoolPredictions = [];
    this.schoolSelected = false;
  }

  done():Promise<any>{
    //this.showSchoolPrompt = false;
    return this.local_db.setSchool(this.school)
  }

  selectAddress(pred: any){
    this.place_svc.geoGoder(pred.description).then(data =>{
        this.address = data;
        this.user.residential_address.street_address = data.description;
        this.user.residential_address.country = data.country_long;
        this.user.residential_address.postal_code = data.postal_code;
        this.user.residential_address.province = data.administrative_area_level_1_lng;
        this.user.residential_address.city = data.locality_lng;
        this.user.residential_address.lat = data.lat;
        this.user.residential_address.lng = data.lng;
        this.addPredictions = [];
    })
    .catch(err => console.log(err))
  }

  getPredictions(event){
    this.place_svc.getPlacePredictionsSA(event.target.value, this.service).then(data =>{
      this.addPredictions = data;
    })
    .catch(err => console.log(err))
  }

  subjectsAutocomplete(){
    this.subjectsArry = this.filtering_svc.autocomplete(this.user_role_svc.SUBJECTS, this.subjectField)
  }

  gradesAutocomplete(){
    this.gradesArry = this.filtering_svc.autocomplete(this.user_role_svc.GRADES, this.grade)
  }

}
