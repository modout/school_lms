import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStepperModule } from 'ionic-stepper';
import { IonicStorageModule } from '@ionic/storage'

import { MyApp } from './app.component';
import { UserRolesProvider } from '../providers/user-roles/user-roles';
import { LocalDbProvider } from '../providers/local-db/local-db';
import { FilteringProvider } from '../providers/filtering/filtering';
import { PlacesServiceProvider } from '../providers/places-service/places-service';

import { SchoolPageModule } from '../pages/school/school.module';
import { SchoolDevicesPageModule } from '../pages/school-devices/school-devices.module';
import { SchoolUsersPageModule } from '../pages/school-users/school-users.module';
import { TimetablePageModule } from '../pages/timetable/timetable.module';
import { SchoolProfilePageModule } from '../pages/school-profile/school-profile.module';
import { ValueAddedServicesPageModule } from '../pages/value-added-services/value-added-services.module';
import { VasProfilePageModule } from '../pages/vas-profile/vas-profile.module';
import { VasUsersPageModule } from '../pages/vas-users/vas-users.module';
import { VasDevicesPageModule } from '../pages/vas-devices/vas-devices.module';
import { HomePageModule } from '../pages/home/home.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    IonicStepperModule,
    IonicStorageModule.forRoot(), SchoolPageModule, SchoolDevicesPageModule, SchoolUsersPageModule, 
    TimetablePageModule, SchoolProfilePageModule, ValueAddedServicesPageModule, VasProfilePageModule,
    VasUsersPageModule, ValueAddedServicesPageModule, VasDevicesPageModule, HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserRolesProvider,
    LocalDbProvider,
    FilteringProvider,
    PlacesServiceProvider
  ]
})
export class AppModule {}
