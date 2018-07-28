import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { Period } from '../../models/period.interface';
import { Timetable } from '../../models/timetable.interface';
import { Day } from '../../models/day.interface';
import { Audience } from '../../models/audience.interface';
import { FilteringProvider } from '../../providers/filtering/filtering';
import { UserRolesProvider } from '../../providers/user-roles/user-roles';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { School } from '../../models/school.interface';
import { TimetableSettingsPage } from '../timetable-settings/timetable-settings';


@IonicPage()
@Component({
  selector: 'page-timetable',
  templateUrl: 'timetable.html',
})
export class TimetablePage {
 
  @ViewChild('content') contentInput: ElementRef;
  timetable: Timetable;
  day: Day;
  grade: string ='';
  period: Period;
  audience: Audience;
  showAdd: boolean = false;
  today: number = 0;
  eventType: string = '';
  isPeriod: boolean = false;
  isEvent: boolean = false;
  contentUploaded: boolean = false;
  eventContent: any;
  periodEditting: boolean = false;
  teacherSelected: boolean = false;
  dayNumber: number = 0;
  period_index: number = 0;
  subjectTxt: string = '';
  teacherTxt: string = '';
  subjectPredictions: string[] = [];
  teacherPredictions: string[] = []
  user: any;
  schoolUsers: any;
  selectedTeacher: any;
  schoolTeachers: any;
  subjectTeachers: any;
  school: School;
  width: number = 100;
  grades: string[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private object_init: ObjectInitializerProvider,
    private filter_svc: FilteringProvider, private cached_data: UserRolesProvider, private remote_sync: RemoteSyncProvider,
    private local_db: LocalDbProvider, private platform: Platform){
    this.grades = this.cached_data.GRADES;
    this.local_db.getCurrentUser().then(user =>{
      this.user = user;
    })
  	this.timetable = this.object_init.initializeTimetable();
  	this.day = this.object_init.initializeDay();
  	this.period = this.object_init.initializePeriod();
  	this.audience = this.object_init.initializeAudience();
    this.school = this.object_init.initializeSchool();
    this.local_db.getSchool().then(school =>{
      this.school = school;
        this.remote_sync.getSchoolUsers(school.id).subscribe(users =>{
          this.schoolUsers = users;
        })
        this.remote_sync.getSchoolTeachers(school.id).subscribe(users =>{
          this.schoolTeachers = users
        })
      })

  }

  ionViewDidLoad(){
    for(var i: number = 0; i < 7; ++i){
    	this.timetable.days[i].number = i + 1;
    }

    this.width = this.platform.width();
  }

  addPeriodToDay(){
  	this.period.audience = this.audience;
  	this.timetable.days[this.today - 1].periods.push(this.period)
  	this.showAdd = false;
    this.periodEditting = false;
  }

  gotoSettings(){
    this.navCtrl.push(TimetableSettingsPage);
  }

  teacherAutocomplete(event){
    this.teacherPredictions = this.filter_svc.userAutocomplete(this.schoolUsers, event.target.value);
  }

  getTeachersBySubject(){
    this.remote_sync.getTeachersPerSubject(this.school.id, this.subjectTxt).subscribe(teachers =>{
      console.log('data recieved: ', teachers)
      this.subjectTeachers = teachers;
    })
  }

  selectTeacher(teacher){
    this.selectedTeacher = teacher;
    this.user = teacher;
    this.subjectTeachers = []; 
    this.teacherSelected = true;
  }

  deletePeriod(day: number, period_index: number){
    if(day != -1 && period_index != -1){
        this.timetable.days[day].periods.splice(period_index, 1);
    }        
  }

  savePeriod(){
    if(this.dayNumber != -1 && this.period_index != -1){
        this.timetable.days[this.dayNumber].periods[this.period_index] = this.period;
    }
    this.showAdd = false;
    this.periodEditting = false;
  }

  addSubject(pred: string){
    this.period.subject = pred;
    this.subjectTxt = pred;
    this.subjectPredictions = [];
    this.getTeachersBySubject();
  }

  showEditDialog(day: number, period_index: number){
    if(day != -1 && period_index != -1){
      this.dayNumber = day;
      this.period_index = period_index;
      this.period = this.timetable.days[day].periods[period_index];
      this.showAdd = true;
      this.periodEditting = true;
    }
  }

  subjectAutocomplete(event){
    
      this.subjectPredictions = this.filter_svc.autocomplete(this.cached_data.SUBJECTS, event.target.value);
    
    
  }

  updateContent(event){
    this.eventContent = event.target.value;
    this.contentUploaded = true;
  }

  chooseContent(){
    this.contentInput.nativeElement.click();
  }

  showAddDialog(day: Day){
  	this.showAdd = true;
    this.periodEditting = false;
  	this.today = day.number;
  }

  eventSelected(){
    this.isPeriod = false;
    this.isEvent = true;
  }

  periodSelected(){
    this.isPeriod = true;
    this.isEvent = false;
  }

  cancel(){
  	this.showAdd = !this.showAdd;
    this.contentUploaded = true;
    this.periodEditting = false;
  }

  dayName(day: number): string{
  	let today: string = '';
  	switch (day){
  		case 1:
  			today = "Monday";
  			break;
  		case 2:
  			today = "Tuesday";
  			break;
  		case 3:
  			today = "Wednesday";
  			break;
  		case 4:
  			today = "Thursday";
  			break;
  		case 5:
  			today = "Friday";
  			break;
  		case 6:
  			today = "Saturday";
  			break;
  		case 7:
  			today = "Sunday";
  			break;
  		default:
  			today = "What day is this ?"
  			break;
  	}
  	return today;
  }

}
