import { Injectable } from '@angular/core';
import { User } from '../../models/user.interface';
import { VAS } from '../../models/vas.interface';
import { Learner } from '../../models/learner.interface';
import { School } from '../../models/school.interface';
import { Address2 } from '../../models/address2.interface';
import { Address } from '../../models/address.interface';
import { Device } from '../../models/device.interface';
import { Parent } from '../../models/parent.interface';
import { Teacher } from '../../models/teacher.interface';
import { Child } from '../../models/child.interface';
import { ChannelMessage } from '../../models/message.interface';
import { Channel } from '../../models/channel.interface';
import { SchoolManagement } from '../../models/school_management.interface';
import { Period } from '../../models/period.interface';
import { Timetable } from '../../models/timetable.interface';
import { Day } from '../../models/day.interface';
import { Audience } from '../../models/audience.interface';
import { Support } from '../../models/support.interface';
import { Sim } from '../../models/sim.interface';

@Injectable()
export class ObjectInitializerProvider {

  constructor(){
  }

  initializeSupport(): Support{
    let support: Support = {
      type: 'support',
      profile: this.initializeUser(),
      assigned_issues: ['default']
    }
    return support;
  }

  initializeSim(): Sim{
    let sim: Sim = {
      sim_no: '',
      supplier_name: '',
      supplier_id: '',
      puk: '',
      phone_no: '',
      provider_name: '',
      plan: '',
      device_id: '1111111',
      sim_id: '1'
    }
    return sim;
  }

  initializeAudience(): Audience{
    console.log('initializeAudience');
    let audience: Audience ={
      name: 'IT1001',
      subscribers: [' '],
      id: ''
    }
    return audience;
  }

  initializePeriod(): Period{
    console.log('initializePeriod');
    let period: Period ={
      timeStart: new Date(),
      timeEnd: new Date(),
      audience: this.initializeAudience(),
      venue: '',
      description: '',
      periodNumber: 0,
      periodId: '',
      content: null,
      subject: ''
    }
    return period;
  }

  initializeDay(): Day{
    console.log('initializeDay');
    let day: Day = {
      date: new Date(),
      number: 1,
      periods: this.initializeDayPeriods()
    }
    return day;
  }

  initializeTimetable(uid?:string): Timetable{
    console.log('initializeTimetable');
    let timetable: Timetable = {
      uid: uid ? uid : '',
      days: this.initializeTimetableDays()
    }
    return timetable;
  }

  initializeTimetableDays(): Day[]{
    console.log('initializeTimetableDays');
    let days: Day[] = []
    for(var i: number = 1; i <=7 ; ++i){
      days.push(this.initializeDay())
    }
    return days;
  }

  initializeDayPeriods(): Period[]{
    console.log('initializeDayPeriods');
    let periods: Period[] = [];
    periods.push(this.initializePeriod());
    return periods;
  }

  initializeSchoolManagement(): SchoolManagement{
    let manager: SchoolManagement ={
      profile: this.initializeUser(),
      school_id: '',
      school_emblem: '',
      school_name: '',
      classes: [],
      timetable: [],
      type: '',
      subjects: []
    }
    return manager;
  }

  initializeSchoolManagement1(smanager: SchoolManagement): SchoolManagement{
    let manager: SchoolManagement ={
      profile: smanager.profile,
      school_id: smanager.school_id,
      school_emblem: smanager.school_emblem,
      school_name: smanager.school_name,
      classes: smanager.classes,
      timetable: smanager.timetable,
      type: smanager.type,
      subjects: smanager.subjects
    }
    return manager;
  }

  initializeChannel(): Channel{
    let channel: Channel = {
      creator: this.initializeUser(),
      date_created: 0,
      messages: [],
      name: '',
      subscribers: [],
      id: ''
    }
    return channel;
  }

  initializeChannel1(channell: Channel): Channel{
    let channel: Channel = {
      creator: channell.creator,
      date_created: 0,
      messages: channell.messages ? channell.messages: [],
      name: channell.name,
      subscribers: channell.subscribers,
      id: channell.id
    }
    return channel;
  }

  initializeChannelMessage(): ChannelMessage{
    let message: ChannelMessage = {
      by: this.initializeUser(),
      text: '',
      timeStamp: 0,
      topic: '',
      channel_id: '',
      comments: [],
      delivered: false,
      read: false
    }
    return message;
  }

  initializeChannelMessage1(cmessage: ChannelMessage): ChannelMessage{
    let message: ChannelMessage = {
      by: cmessage.by,
      text: cmessage.text,
      timeStamp: cmessage.timeStamp,
      topic: cmessage.topic,
      channel_id: cmessage.channel_id,
      comments: cmessage.comments,
      delivered: false,
      read: false
    }

    return message;
  }

  initializeUser(): User{
  	let user: User =
  	{
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
      proof_of_address: null,
      affidavit: null,
      residential_address: this.initializeResidentialAddress(),
      role: [],
      channels: ['-LHqBOqBzOsg2bL_PP9S']
    }
    return user;
  }

   initializeUser1(userr: User): User{
    let user: User =
    {
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
    }
    return user;
  }

  initializeResidentialAddress(): Address{
  	let address: Address = 
  	{
        street_address: '',
        city: '',
        province: '',
        country: '',
        postal_code: '',
        lat: 0,
        lng: 0
      }
      return address;
  }

  initializeChild(): Child{
    let child: Child = {
      firstname: '',
      lastname: '',
      uid: ''
    }
    return child;
  }

  initializeGoogleAddress(): Address2{
  	let adress: Address2 = {
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
  	}
  	return adress;
  }

  initializeVAS(): VAS{
  	let vas: VAS = {
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
  	}
  	return vas;
  }

  initializeLearner(): Learner{
  	let learner: Learner = {
  		profile: this.initializeUser(),
  		grade: '',
  		subjects: [],
  		devices_ids: [],
  		timetable: {},
  		school_id: '',
  		school_name: '',
  		school_emblem: 'assets/imgs/logo-placeholder.jpg',
      type: ''
  	}
  	return learner;
  }

  initializeSchool(): School{
  	let school: School = {
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
  	}
  	return school;
  }

  initializeParent(): Parent{
  	let parent: Parent = {
  		profile: this.initializeUser(),
  		school_id: '',
  		school_name: '',
  		school_emblem: 'assets/imgs/logo-placeholder.jpg',
  		children: [],
      type: ''
  	}
  	return parent
  } 

  initializeTeacher(): Teacher{
  	let teacher: Teacher = {
  		profile: this.initializeUser(),
  		school_id: '',
  		school_name: '',
  		school_emblem: 'assets/imgs/logo-placeholder.jpg',
  		classes: [],
  		subjects: [],
  		timetable: {},
      type: ''
  	}
  	return teacher;
  }

  initialDevice(): Device{
  	let device: Device = {
  		model: '',
  		device_id: '',
  		manufacturer: '',
  		type: '',
  		institution_assigned_to: '',
      individual_assigned_to: '',
  		supplier_id: '',
      sim: this.initializeSim() 
  	}
  	return device;
  }

}
