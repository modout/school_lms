import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserRolesProvider } from '../../providers/user-roles/user-roles';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { User } from '../../models/user.interface';
import { FilteringProvider } from '../../providers/filtering/filtering';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';
import { Address2 } from '../../models/address2.interface';
import { SchoolPage } from '../school/school';
import { SchoolDetailsPage } from '../school-details/school-details'
import { ValueAddedServicesPage } from '../value-added-services/value-added-services';
import { HomePage } from '../home/home';
import { School } from '../../models/school.interface';
import { Learner } from '../../models/learner.interface';
import  { Parent } from '../../models/parent.interface';
import { Teacher } from '../../models/teacher.interface';
import { VAS } from '../../models/vas.interface';
import { Device } from '../../models/device.interface';
import { Support } from '../../models/support.interface';
import { SchoolManagement } from '../../models/school_management.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { Child } from '../../models/child.interface';
import { DeviceRegisterPage } from '../device-register/device-register';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { SupportHomePage } from '../support-home/support-home';
import { UploadServiceProvider } from '../../providers/upload-service/upload-service';
import { FileUpload } from '../../models/fileupload.interface';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild('proof') proofInput: ElementRef;
  @ViewChild('affidavit') affidavitInput: ElementRef;
  @ViewChild('stepper') stepper: ElementRef;
  contractPoints: boolean[] = [false, false, false, false, false, false, false, false, false, false, false]
  address: Address2;
  schoolManagement: SchoolManagement;
  schools: School[] = [];
  suppliers: VAS[] = [];
  learners: Learner[] = [];
  teachers: Teacher[] = [];
  parents: Parent[] = [];
  role: string[] = [];
  roleComplete: boolean = false;
  roles: string[] = [];
  userRole: string[] = ['null','null','null','null','null','null'];
  level: number = 0;
  roleString: string = '';
  user: User;
  proof_attach: any;
  affidavit_attach: any;
  schoolPredictions: any[] = [];
  addPredictions: any[] = [];
  searchTxt: string = '';
  newSchool: boolean = false;
  school: School;
  subjects: any[] = [];
  grade: string = '';
  showSchoolPrompt: boolean = false;
  schoolSelected: boolean = false;
  subjectField: string = '';
  child: Child;
  children: Child[] = [];
  subjectsArry: string[] = [];
  gradesArry: string[] = [];
  vas: VAS;
  isVAS: boolean = false;
  learner: Learner;
  isLearner: boolean = false;
  parent: Parent;
  isParent: boolean = false;
  device: Device;
  isDevice: boolean = false;
  teacher: Teacher;
  isTeacher: boolean = false;
  childrenNames: string[] = [];
  isSchoolManagement: boolean = false;
  isPrincipal: boolean = false;
  isHOD: boolean = false;
  isSGB: boolean = false;
  isIT: boolean = false;
  isSupport: boolean = false;
  support: Support;
  allAgreed: boolean = false;
  idLengthMessage: string = '';
  idNotMatch: string = '';
  idMatch: string = '';
  emailNotGood: boolean = false;
  detailFormCorrect: boolean = false;
  proofAttached: boolean = false;

  service = new google.maps.places.AutocompleteService();
  constructor(public navCtrl: NavController, public navParams: NavParams, private user_role_svc: UserRolesProvider, 
    private local_db: LocalDbProvider, private filtering_svc: FilteringProvider, private schools_popup: ModalController,
    private place_svc: PlacesServiceProvider, private object_init_svc: ObjectInitializerProvider,
    private remote_sync: RemoteSyncProvider, private alertCtrl: AlertController, private upload_svc: UploadServiceProvider){
  	this.user = this.object_init_svc.initializeUser();
    this.school = this.object_init_svc.initializeSchool();
    this.vas = this.object_init_svc.initializeVAS();
    this.learner = this.object_init_svc.initializeLearner();
    this.parent = this.object_init_svc.initializeParent();
    this.device = this.object_init_svc.initialDevice();
    this.teacher = this.object_init_svc.initializeTeacher();
    this.child = this.object_init_svc.initializeChild();
    this.schoolManagement = this.object_init_svc.initializeSchoolManagement();
    this.support = this.object_init_svc.initializeSupport();
    this.remote_sync.getAllSchools().subscribe(schools =>{
      this.schools = schools;
    })
    this.remote_sync.getAllVAS().subscribe(suppliers =>{
      this.suppliers = suppliers;
    })
    this.remote_sync.getAllParents().subscribe(parents =>{

    })
    this.remote_sync.getAllLearners().subscribe(learners =>{
      this.learners = learners;
    })
    this.remote_sync.getAllTeachers().subscribe(teachers =>{
      this.teachers = teachers;
    })
  }

  ionViewDidLoad() {
    this.getUniqueRolesForColumn(0);//getting an array of non repeating roles in a certain column
  }

  //Shows a popup alert with a custom message
  showAlert(topic: string, subTitle: string){
    let alert = this.alertCtrl.create({
      title:    topic,
      subTitle: subTitle,
      cssClass: 'alertCtrl',
      buttons: ['OK']
    });
    alert.present();
  }

  isEmail(event)
    {
        var  serchfind:boolean;

        let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        serchfind = regexp.test(event.target.value);

        if(event.target.value == ''){
          this.emailNotGood = false;
          this.detailFormCorrect = true;
        }
        else if(!serchfind){
          this.emailNotGood = true;
          this.detailFormCorrect = false;
        }else{
          this.emailNotGood = false;
          this.detailFormCorrect = true;
        }
    }

  checkIdLength(event){
      if(event.target.value.length < 13){
          this.idLengthMessage = 'ID number must be 13 digits long';
          this.detailFormCorrect = false;
      }else if(event.target.value.length > 13){
        this.idLengthMessage = 'ID number too long';
        this.detailFormCorrect = false;
      }else{
        this.idLengthMessage = '';
        this.detailFormCorrect = true;
      }
  }

  checkIdMatch(event){
      if(event.target.value.toLowerCase() != this.user.id_or_passport.toLowerCase()){
        this.idNotMatch = 'ID or passport number does not match';
        this.idMatch = '';
        this.detailFormCorrect = false;
      }else{
        this.idMatch = 'ID or passport number matches';
        this.idNotMatch = '';
        this.detailFormCorrect = true;
      }
  }

  //Check if all contract points have been agreed to, show a popup and stop navigation if not all points are agreed to
  checkIfAgreed(){
    this.allAgreed = true;
    for(var i: number = 0; i < this.contractPoints.length; ++i){
      if(!this.contractPoints[i]){
        //this.showAlert('Contract not complete', 'You have to agree to all contract points before you proceed');
        this.allAgreed = false;
        break;
      }
    }
  }

  //Setting the first and last name for the current child object
  updateChild(event){
    let names = event.target.value.split(" ");
    this.child.firstname = names[0];
    this.child.lastname = names[names.length - 1];
  }

  //load proof of residence file from device to app memory
  updateproof(event){
    console.log('The file ', event.target.files);
    this.proof_attach = event.target.files[0];
    this.user.proof_of_address = event.target.files[0];
    if(this.proof_attach != null || this.proof_attach != undefined) this.proofAttached = true;
  }

  //go to the school interface, given a school object
  gotoSchool(school: School){
    this.school = school;
    this.local_db.setSchool(this.school).then(data =>{
      this.navCtrl.push(SchoolPage);
    })
    .catch(err => console.log(err))
  }

  //go to the school interface, given a school object
  gotoSupplier(supplier: VAS){
    this.vas = supplier;
    this.local_db.setVAS(this.vas).then(data =>{
      this.navCtrl.push(ValueAddedServicesPage)
    })
    .catch(err => console.log(err))
  }

  //go to the school interface, given a school object
  gotoLearner(learner: Learner){
    this.learner = learner;
    this.local_db.setLearner(this.learner).then(data =>{
      this.navCtrl.push(HomePage)
    })
    .catch(err => console.log(err))
  }

  //go to the school interface, given a school object
  gotoTeacher(teacher: Teacher){
    this.teacher = teacher;
    this.local_db.setTeacher(this.teacher).then(data =>{
      this.navCtrl.push(HomePage)
    })
    .catch(err => console.log(err))
  }

  //go to the school interface, given a school object
  gotoParent(parent: Parent){
    this.parent = parent;
    this.local_db.setParent(this.parent).then(data =>{
      this.navCtrl.push(HomePage)
    })
    .catch(err => console.log(err))
  }

  //Add subjects to the subject arrsy
  addSubject(subject){
    this.subjects.push(subject + '  ' + this.grade);
    this.subjectField = '';
    this.subjectsArry = [];
  }

  //Add a grade to the grades array, given a grade input
  addGrade(grade){
    this.grade = grade;
    this.gradesArry = [];
  }

  //load affidavit of residence file from device to app memory
  updateaffidavitf(event){
    this.user.affidavit = event.target.files[0];
    this.affidavit_attach = event.target.files[0];
    if(this.proof_attach != null || this.proof_attach != undefined) this.proofAttached = true;
  }

  //Get unique strings (of roles/categories) in a certain column and update the roles array
  getUniqueRolesForColumn(col: number):any[]{
    let tempArry: any[] = [];
    for(var row: number = 0; row < this.user_role_svc.USER_ROLES.length; ++row){
      if(tempArry.indexOf(this.user_role_svc.USER_ROLES[row][col]) == -1){
        tempArry.push(this.user_role_svc.USER_ROLES[row][col]);
      }
    }
    this.roles = tempArry;
    return tempArry;
  }

  //Select a role from the displayed options and generate the next options screen
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
      if(tempArry.indexOf(this.user_role_svc.USER_ROLES[row][this.level +1]) == -1 && //check if string exists in tempArry
        this.isDecendant(this.user_role_svc.USER_ROLES[row], this.userRole) &&  //Check if is child of selected
        this.user_role_svc.USER_ROLES[row][this.level +1] !== 'null' && //Check if string isn't null
        this.level < 4) 
      {
        tempArry.push(this.user_role_svc.USER_ROLES[row][this.level +1]);
        console.log('tempArray: ', tempArry);
      }
    }
    if(tempArry.length == 0){
      this.searchRole(this.userRole);
      this.user.role = this.userRole;
      this.roleComplete = true;
      let roleCode = parseInt(this.userRole[5]);
      if(roleCode >= 36 && roleCode <= 57){
        this.isSupport = true;
      }
      if(this.userRole[5] ==='58') {
        this.newSchool = true;
      }
      if(this.userRole[5] ==='59' || this.userRole[5] ==='60' || this.userRole[5] ==='73' 
        || this.userRole[5] ==='74'){
          this.isDevice = true;
          console.log('is device');
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
      }
      if(roleCode <= 20 || (roleCode >=58 && roleCode <=60) || (roleCode >=63 && roleCode <=65) || 
        roleCode == 73 || roleCode == 74) 
      {
        this.showPopUp();
      }
      if((roleCode >= 18 && roleCode <= 20) || roleCode == 11){
        this.isSchoolManagement = true;
        switch (roleCode) {
          case 18:
            this.isPrincipal = true
            break;
          case 19:
            this.isHOD = true
            break;
            case 20:
            this.isSGB = true
            break;
            case 11:
            this.isIT = true
            break;
        }
      }
    }
    this.roles = tempArry;
    ++this.level
    return tempArry;
  }

  //Checking if the supplied role array matches any of the roles in the roles database and updating the userRole object
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

  caputureNewSchool(){
    this.schools_popup.create(SchoolDetailsPage).present();
  }

  //Reset the whole role system to its initial state
  resetRole(){
    this.getUniqueRolesForColumn(0);
    this.userRole = ['null','null','null','null','null','null'];
    this.showSchoolPrompt = false;
    this.roleComplete = false;
    this.roleString = '';
    this.level = 0;
    this.newSchool = false;
    this.isLearner = false;
    this.isTeacher = false;
    this.isParent = false;
    this.isDevice = false;
    this.isVAS = false;
    this.isPrincipal = false;
    this.isSGB = false;
    this.isHOD = false;
    this.isSchoolManagement = false;
    this.isIT = false;
    this.isSupport = false;
    this.grade = '';
    this.subjects = [];
    this.child = this.object_init_svc.initializeChild();
    this.children = [];
  }

  //Add children to the parent object
  addChild(){
    this.children.push(this.child);
    this.parent.children.push(this.child);
    this.childrenNames.push(this.child.firstname);
    this.child.firstname = '';
  }

  //Delete children from the parent object
  deleteChild(nearby:string) {
    const index: number = this.childrenNames.indexOf(nearby);
    if (index !== -1) {
        this.childrenNames.splice(index, 1);
        this.children.splice(index, 1);
        this.parent.children.splice(index, 1);
    }        
  }

  //Remove subject from array of current subjects
  deleteSubject(nearby:string) {
    const index: number = this.subjects.indexOf(nearby);
    if (index !== -1) {
        this.subjects.splice(index, 1);
    }        
  }

  //Upload user regristration to the online and offline database
  register(){
    if(this.isSupport){
      this.support.type = 'support';
      this.support.profile = this.user;
      let fbRef = this.remote_sync.setSupport(this.support);
      this.support.profile.uid = fbRef.key;
      this.local_db.setUser(this.support)
      .then(support =>{
        this.remote_sync.updateUser(this.support)
        .then(() =>{
          this.navCtrl.push(SupportHomePage);
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
    }
    else if(this.isLearner){
        this.learner.type = 'learner';
        this.learner.subjects = this.subjects;
        this.learner.profile = this.user;
        this.learner.grade = this.grade;
        this.learner.school_id = this.school.id ;
        this.learner.school_name = this.school.name;
        this.learner.school_emblem = this.school.emblem;
        let fbRef = this.remote_sync.setLearner(this.learner); //create learner on remote server and get the user id
        this.learner.profile.uid = fbRef.key; //update the id of the learners profile
        this.local_db.setLearner(this.learner).then(data =>{
          this.remote_sync.upateLearner(fbRef.key, this.learner);
          this.navCtrl.push(HomePage);
        })
        .catch(err => console.log(err))
    }
    else if(this.isTeacher){
      this.teacher.type = 'teacher';
        this.teacher.profile = this.user;
        this.teacher.school_id = this.school.id;
        this.teacher.school_name = this.school.name;
        this.teacher.school_emblem = this.school.emblem;
        this.teacher.subjects = this.subjects;
        let fbRef = this.remote_sync.setTeacher(this.teacher);
        this.teacher.profile.uid = fbRef.key;
        this.local_db.setTeacher(this.teacher).then(data => {
          this.remote_sync.updateTeacher(fbRef.key, this.teacher)
          this.navCtrl.push(HomePage)
        })
        .catch(err => console.log(err))
    }
    else if(this.isSchoolManagement){
        this.schoolManagement.profile = this.user;
        this.schoolManagement.school_id = this.school.id;
        this.schoolManagement.school_emblem = this.school.emblem;
        this.schoolManagement.school_name = this.school.name;
        if(this.isPrincipal){
          this.schoolManagement.type = "principal"
        }else if(this.isHOD){
          this.schoolManagement.type = "HOD"
        }else if(this.isSGB){
          this.schoolManagement.type = "SGB"
        }else if(this.isIT){
          this.schoolManagement.type = "IT Administrator";
        }
        let fbRef = this.remote_sync.setSchoolManagement(this.schoolManagement)
        this.schoolManagement.profile.uid = fbRef.key;
        this.local_db.setSchoolManagement(this.schoolManagement).then(data =>{
          this.remote_sync.updateSchoolManager(this.schoolManagement.profile.uid , this.schoolManagement);
          this.navCtrl.push(HomePage);
        })
        .catch(err =>console.log(err))
    }

    else if(this.isParent){
        this.parent.type = 'parent';
        this.parent.profile = this.user;
        this.parent.school_id = this.school.id;
        this.parent.school_name = this.school.name;
        this.parent.school_emblem = this.school.emblem;
        this.parent.children = this.children;
        let fbRef = this.remote_sync.setParent(this.parent);
        this.parent.profile.uid = fbRef.key;
        this.local_db.setParent(this.parent).then(parent =>{
            this.remote_sync.updateParent(fbRef.key, this.parent);
            this.navCtrl.push(HomePage);
        })
        .catch(err => console.log(err))
    }
    else if(this.newSchool){
      this.school.profile = this.user;
      let fbRef = this.remote_sync.setSchool(this.school)
      this.school.profile.uid = fbRef.key;
      this.local_db.setSchool(this.school).then(data =>{
        this.remote_sync.updateSchool(fbRef.key, this.school)
        this.navCtrl.push(SchoolPage);
      })
      .catch(err => console.log(err))
    }
    else if(this.isVAS){
        this.vas.type = 'VAS';
        this.vas.profile = this.user;
        this.vas.company_name = this.userRole[2];
        let fbRef = this.remote_sync.setVAS(this.vas);
        this.vas.company_id = fbRef.key;
        this.vas.profile.uid = fbRef.key;
        this.local_db.setVAS(this.vas).then(data =>{
          this.remote_sync.updateVAS(fbRef.key, this.vas);
          this.navCtrl.push(ValueAddedServicesPage)
        })
        .catch(err => console.log(err))
    }
    else if(this.isDevice){
      this.navCtrl.push(DeviceRegisterPage, {school: {id: this.school.id, name: this.school.name}, user: this.user.role[1]})
      .catch(err => console.log(err))
    }
    else{
      console.log('no role selected');
    }
    this.local_db.setSchool(this.school);
  }

  //Activate the file dialog when affidavit button is clicked
  chooseAffidavit(){
    this.affidavitInput.nativeElement.click();
  }
  //Activate the file dialog when proof button is clicked
  chooseProof(){
    this.proofInput.nativeElement.click();
  }

  //Show screen for entering school details (Name must be changed to avoid confusion)
  showPopUp(){
    this.showSchoolPrompt = true;
  }

  //Check if a role is a decendant of the correct role family
  isDecendant(arry1: string[], arry2: string[]): boolean{
    for(var i: number = 0; i <= this.level; ++i ){
        if(arry1[i] !== arry2[i]) return false;
    }
    return true;
  }

  //Autocomplete for schools
  school_autocomplete(event:any){
    this.place_svc.getEstablishmentPredictionsSA(event.target.value, this.service).then(data =>{
      this.schoolPredictions = data;
    })
    .catch(err => console.log(err))
  }

  //Select school from a list of schools 
  selectSchool(school: any){
    this.place_svc.geoGoder(school.description).then(data =>{
       this.searchTxt = data.description;
        this.school.address.province = data.administrative_area_level_1_lng?  data.administrative_area_level_1_lng : this.school.address.province;
        this.school.address.lat = data.lat;
        this.school.address.lng = data.lng;
        this.school.address.postal_code = data.postal_code;
        this.school.address.country = data.country_long;
        this.school.id = data.place_id;
        this.schoolPredictions = [];
        this.schoolSelected = true;
    })
    .catch(err => console.log(err))
  }

  //Unselect school as the name suggests
  unselectSchool(){
    this.searchTxt = '';
    this.school.name = '';
    this.schoolPredictions = [];
    this.schoolSelected = false;
  }

  //Persist te current school details on the local database
  done():Promise<any>{
    console.log('current school: ', this.school);
    return this.local_db.setSchool(this.school)
  }

  //Select an address from a  list
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

  //Get address predictions from the google places services
  getPredictions(event){
    this.place_svc.getAdressPredictionsSA(event.target.value, this.service).then(data =>{
      this.addPredictions = data;
    })
    .catch(err => console.log(err))
  }

  //Autocomplete for subjects
  subjectsAutocomplete(){
    this.subjectsArry = this.filtering_svc.autocomplete(this.user_role_svc.SUBJECTS, this.subjectField)
  }

  //Autocomplete for grades
  gradesAutocomplete(){
    this.gradesArry = this.filtering_svc.autocomplete(this.user_role_svc.GRADES, this.grade)
  }

  uploadFiles(){
      let proof: FileUpload = {
        file: this.user.proof_of_address,
        name: this.user.proof_of_address.file.name,
        url: '',
        path: 'Proofs',
        progress: 0
      }

      let affidavit: FileUpload = {
        file: this.user.affidavit,
        name: this.user.affidavit.file.name,
        url: '',
        path: 'Affidavits',
        progress: 0
      }
      this.upload_svc.uploadProof(proof).then(prf =>{
        this.upload_svc.uploadProof(affidavit).then(afdvt =>{
          return {affidavit: afdvt, proof: prf}
        })
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }



}
