var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { FilteringProvider } from '../../providers/filtering/filtering';
import { UserRolesProvider } from '../../providers/user-roles/user-roles';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { TimetableSettingsPage } from '../timetable-settings/timetable-settings';
var TimetablePage = /** @class */ (function () {
    function TimetablePage(navCtrl, navParams, object_init, filter_svc, cached_data, remote_sync, local_db, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.object_init = object_init;
        this.filter_svc = filter_svc;
        this.cached_data = cached_data;
        this.remote_sync = remote_sync;
        this.local_db = local_db;
        this.platform = platform;
        this.grade = '';
        this.showAdd = false;
        this.today = 0;
        this.eventType = '';
        this.isPeriod = false;
        this.isEvent = false;
        this.contentUploaded = false;
        this.periodEditting = false;
        this.teacherSelected = false;
        this.dayNumber = 0;
        this.period_index = 0;
        this.subjectTxt = '';
        this.teacherTxt = '';
        this.subjectPredictions = [];
        this.teacherPredictions = [];
        this.width = 100;
        this.grades = this.cached_data.GRADES;
        this.local_db.getCurrentUser().then(function (user) {
            _this.user = user;
        });
        this.timetable = this.object_init.initializeTimetable();
        this.day = this.object_init.initializeDay();
        this.period = this.object_init.initializePeriod();
        this.audience = this.object_init.initializeAudience();
        this.school = this.object_init.initializeSchool();
        this.local_db.getSchool().then(function (school) {
            _this.school = school;
            _this.remote_sync.getSchoolUsers(school.id).subscribe(function (users) {
                _this.schoolUsers = users;
            });
            _this.remote_sync.getSchoolTeachers(school.id).subscribe(function (users) {
                _this.schoolTeachers = users;
            });
        });
    }
    TimetablePage.prototype.ionViewDidLoad = function () {
        for (var i = 0; i < 7; ++i) {
            this.timetable.days[i].number = i + 1;
        }
        this.width = this.platform.width();
    };
    TimetablePage.prototype.addPeriodToDay = function () {
        this.period.audience = this.audience;
        this.timetable.days[this.today - 1].periods.push(this.period);
        this.showAdd = false;
        this.periodEditting = false;
    };
    TimetablePage.prototype.gotoSettings = function () {
        this.navCtrl.push(TimetableSettingsPage);
    };
    TimetablePage.prototype.teacherAutocomplete = function (event) {
        this.teacherPredictions = this.filter_svc.userAutocomplete(this.schoolUsers, event.target.value);
    };
    TimetablePage.prototype.getTeachersBySubject = function () {
        var _this = this;
        this.remote_sync.getTeachersPerSubject(this.school.id, this.subjectTxt).subscribe(function (teachers) {
            console.log('data recieved: ', teachers);
            _this.subjectTeachers = teachers;
        });
    };
    TimetablePage.prototype.selectTeacher = function (teacher) {
        this.selectedTeacher = teacher;
        this.user = teacher;
        this.subjectTeachers = [];
        this.teacherSelected = true;
    };
    TimetablePage.prototype.deletePeriod = function (day, period_index) {
        if (day != -1 && period_index != -1) {
            this.timetable.days[day].periods.splice(period_index, 1);
        }
    };
    TimetablePage.prototype.savePeriod = function () {
        if (this.dayNumber != -1 && this.period_index != -1) {
            this.timetable.days[this.dayNumber].periods[this.period_index] = this.period;
        }
        this.showAdd = false;
        this.periodEditting = false;
    };
    TimetablePage.prototype.addSubject = function (pred) {
        this.period.subject = pred;
        this.subjectTxt = pred;
        this.subjectPredictions = [];
        this.getTeachersBySubject();
    };
    TimetablePage.prototype.showEditDialog = function (day, period_index) {
        if (day != -1 && period_index != -1) {
            this.dayNumber = day;
            this.period_index = period_index;
            this.period = this.timetable.days[day].periods[period_index];
            this.showAdd = true;
            this.periodEditting = true;
        }
    };
    TimetablePage.prototype.subjectAutocomplete = function (event) {
        this.subjectPredictions = this.filter_svc.autocomplete(this.cached_data.SUBJECTS, event.target.value);
    };
    TimetablePage.prototype.updateContent = function (event) {
        this.eventContent = event.target.value;
        this.contentUploaded = true;
    };
    TimetablePage.prototype.chooseContent = function () {
        this.contentInput.nativeElement.click();
    };
    TimetablePage.prototype.showAddDialog = function (day) {
        this.showAdd = true;
        this.periodEditting = false;
        this.today = day.number;
    };
    TimetablePage.prototype.eventSelected = function () {
        this.isPeriod = false;
        this.isEvent = true;
    };
    TimetablePage.prototype.periodSelected = function () {
        this.isPeriod = true;
        this.isEvent = false;
    };
    TimetablePage.prototype.cancel = function () {
        this.showAdd = !this.showAdd;
        this.contentUploaded = true;
        this.periodEditting = false;
    };
    TimetablePage.prototype.dayName = function (day) {
        var today = '';
        switch (day) {
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
                today = "What day is this ?";
                break;
        }
        return today;
    };
    __decorate([
        ViewChild('content'),
        __metadata("design:type", ElementRef)
    ], TimetablePage.prototype, "contentInput", void 0);
    TimetablePage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-timetable',
            templateUrl: 'timetable.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ObjectInitializerProvider,
            FilteringProvider, UserRolesProvider, RemoteSyncProvider,
            LocalDbProvider, Platform])
    ], TimetablePage);
    return TimetablePage;
}());
export { TimetablePage };
//# sourceMappingURL=timetable.js.map