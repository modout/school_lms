var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
var ObjectInitializerProvider = /** @class */ (function () {
    function ObjectInitializerProvider() {
    }
    ObjectInitializerProvider.prototype.initializeSupport = function () {
        var support = {
            type: 'support',
            profile: this.initializeUser(),
            assigned_issues: ['default']
        };
        return support;
    };
    ObjectInitializerProvider.prototype.initializeAudience = function () {
        console.log('initializeAudience');
        var audience = {
            name: 'IT1001',
            subscribers: [' '],
            id: ''
        };
        return audience;
    };
    ObjectInitializerProvider.prototype.initializePeriod = function () {
        console.log('initializePeriod');
        var period = {
            timeStart: new Date(),
            timeEnd: new Date(),
            audience: this.initializeAudience(),
            venue: '',
            description: '',
            periodNumber: 0,
            periodId: '',
            content: null,
            subject: ''
        };
        return period;
    };
    ObjectInitializerProvider.prototype.initializeDay = function () {
        console.log('initializeDay');
        var day = {
            date: new Date(),
            number: 1,
            periods: this.initializeDayPeriods()
        };
        return day;
    };
    ObjectInitializerProvider.prototype.initializeTimetable = function (uid) {
        console.log('initializeTimetable');
        var timetable = {
            uid: uid ? uid : '',
            days: this.initializeTimetableDays()
        };
        return timetable;
    };
    ObjectInitializerProvider.prototype.initializeTimetableDays = function () {
        console.log('initializeTimetableDays');
        var days = [];
        for (var i = 1; i <= 7; ++i) {
            days.push(this.initializeDay());
        }
        return days;
    };
    ObjectInitializerProvider.prototype.initializeDayPeriods = function () {
        console.log('initializeDayPeriods');
        var periods = [];
        periods.push(this.initializePeriod());
        return periods;
    };
    ObjectInitializerProvider.prototype.initializeSchoolManagement = function () {
        var manager = {
            profile: this.initializeUser(),
            school_id: '',
            school_emblem: '',
            school_name: '',
            classes: [],
            timetable: [],
            type: '',
            subjects: []
        };
        return manager;
    };
    ObjectInitializerProvider.prototype.initializeSchoolManagement1 = function (smanager) {
        var manager = {
            profile: smanager.profile,
            school_id: smanager.school_id,
            school_emblem: smanager.school_emblem,
            school_name: smanager.school_name,
            classes: smanager.classes,
            timetable: smanager.timetable,
            type: smanager.type,
            subjects: smanager.subjects
        };
        return manager;
    };
    ObjectInitializerProvider.prototype.initializeChannel = function () {
        var channel = {
            creator: this.initializeUser(),
            date_created: 0,
            messages: [],
            name: '',
            subscribers: [],
            id: ''
        };
        return channel;
    };
    ObjectInitializerProvider.prototype.initializeChannel1 = function (channell) {
        var channel = {
            creator: channell.creator,
            date_created: 0,
            messages: channell.messages ? channell.messages : [],
            name: channell.name,
            subscribers: channell.subscribers,
            id: channell.id
        };
        return channel;
    };
    ObjectInitializerProvider.prototype.initializeChannelMessage = function () {
        var message = {
            by: this.initializeUser(),
            text: '',
            timeStamp: 0,
            topic: '',
            channel_id: '',
            comments: [],
            delivered: false,
            read: false
        };
        return message;
    };
    ObjectInitializerProvider.prototype.initializeChannelMessage1 = function (cmessage) {
        var message = {
            by: cmessage.by,
            text: cmessage.text,
            timeStamp: cmessage.timeStamp,
            topic: cmessage.topic,
            channel_id: cmessage.channel_id,
            comments: cmessage.comments,
            delivered: false,
            read: false
        };
        return message;
    };
    ObjectInitializerProvider.prototype.initializeUser = function () {
        var user = {
            firstname: '',
            lastname: '',
            email: '',
            title: '',
            id_or_passport: '',
            gender: '',
            cell_number: '',
            home_number: '',
            work_number: '',
            dp: 'assets/imgs/placeholder.png',
            uid: '',
            proof_of_address: '',
            residential_address: this.initializeResidentialAddress(),
            role: [],
            channels: ['-LHqBOqBzOsg2bL_PP9S']
        };
        return user;
    };
    ObjectInitializerProvider.prototype.initializeUser1 = function (userr) {
        var user = {
            firstname: userr.firstname,
            lastname: userr.lastname,
            email: userr.email,
            title: userr.title,
            id_or_passport: userr.id_or_passport,
            gender: userr.gender,
            cell_number: userr.cell_number,
            home_number: userr.home_number,
            work_number: userr.work_number,
            dp: userr.dp,
            proof_of_address: userr.proof_of_address,
            residential_address: userr.residential_address,
            role: userr.role,
            uid: userr.uid,
            channels: userr.channels ? userr.channels : []
        };
        return user;
    };
    ObjectInitializerProvider.prototype.initializeResidentialAddress = function () {
        var address = {
            street_address: '',
            city: '',
            province: '',
            country: '',
            postal_code: '',
            lat: 0,
            lng: 0
        };
        return address;
    };
    ObjectInitializerProvider.prototype.initializeChild = function () {
        var child = {
            firstname: '',
            lastname: '',
            uid: ''
        };
        return child;
    };
    ObjectInitializerProvider.prototype.initializeGoogleAddress = function () {
        var adress = {
            administrative_area_level_1_lng: '',
            administrative_area_level_1_short: '',
            administrative_area_level_2_lng: '',
            administrative_area_level_2_short: '',
            country_long: '',
            country_short: '',
            description: '',
            lat: 0,
            lng: 0,
            locality_lng: '',
            locality_short: '',
            name: '',
            sublocality_lng: '',
            sublocality_short: '',
            vicinity: '',
            postal_code: '',
            place_id: '',
        };
        return adress;
    };
    ObjectInitializerProvider.prototype.initializeVAS = function () {
        var vas = {
            profile: this.initializeUser(),
            company_name: '',
            service_type: [],
            service_description: '',
            company_logo: 'assets/imgs/logo-placeholder.jpg',
            schools_ids: [],
            address: this.initializeResidentialAddress(),
            company_reg: '',
            company_id: '',
            type: ''
        };
        return vas;
    };
    ObjectInitializerProvider.prototype.initializeLearner = function () {
        var learner = {
            profile: this.initializeUser(),
            grade: '',
            subjects: [],
            devices_ids: [],
            timetable: {},
            school_id: '',
            school_name: '',
            school_emblem: 'assets/imgs/logo-placeholder.jpg',
            type: ''
        };
        return learner;
    };
    ObjectInitializerProvider.prototype.initializeSchool = function () {
        var school = {
            profile: this.initializeUser(),
            name: '',
            address: this.initializeResidentialAddress(),
            principal: this.initializeUser(),
            emblem: 'assets/imgs/logo-placeholder.jpg',
            learners: [],
            teachers: [],
            devices: [],
            parents: [],
            id: '',
            type: ''
        };
        return school;
    };
    ObjectInitializerProvider.prototype.initializeParent = function () {
        var parent = {
            profile: this.initializeUser(),
            school_id: '',
            school_name: '',
            school_emblem: 'assets/imgs/logo-placeholder.jpg',
            children: [],
            type: ''
        };
        return parent;
    };
    ObjectInitializerProvider.prototype.initializeTeacher = function () {
        var teacher = {
            profile: this.initializeUser(),
            school_id: '',
            school_name: '',
            school_emblem: 'assets/imgs/logo-placeholder.jpg',
            classes: [],
            subjects: [],
            timetable: {},
            type: ''
        };
        return teacher;
    };
    ObjectInitializerProvider.prototype.initialDevice = function () {
        var device = {
            model: '',
            device_id: '',
            manufacturer: '',
            type: '',
            institution_assigned_to: '',
            individual_assigned_to: '',
            supplier_id: ''
        };
        return device;
    };
    ObjectInitializerProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], ObjectInitializerProvider);
    return ObjectInitializerProvider;
}());
export { ObjectInitializerProvider };
//# sourceMappingURL=object-initializer.js.map