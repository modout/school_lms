import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStepperModule } from 'ionic-stepper';
import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage'


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
import { DeviceRegisterPageModule } from '../pages/device-register/device-register.module'
import { ObjectInitializerProvider } from '../providers/object-initializer/object-initializer';
import { RemoteSyncProvider } from '../providers/remote-sync/remote-sync';
import { RegisterPageModule } from '../pages/register/register.module';
import { ChatProvider } from '../providers/chat/chat';
import { ChatsPageModule } from '../pages/chats/chats.module';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ChannelPageModule } from '../pages/channel/channel.module';
import { DashboardPageModule } from '../pages/dashboard/dashboard.module';
import { SupportChannelPageModule } from '../pages/support-channel/support-channel.module';
import {EconomyPageModule } from '../pages/economy/economy.module';
import { TimetableSettingsPageModule } from '../pages/timetable-settings/timetable-settings.module';
import { GeneralSettingsPageModule } from '../pages/general-settings/general-settings.module';
import { TimetableProvider } from '../providers/timetable/timetable';
import { SupportHomePageModule } from '../pages/support-home/support-home.module';
import { SupportDevicesPageModule } from '../pages/support-devices/support-devices.module';
import { SupportContentPageModule } from '../pages/support-content/support-content.module';
import { SupportMessagingPageModule } from '../pages/support-messaging/support-messaging.module';
import { SupportSchoolsPageModule } from '../pages/support-schools/support-schools.module';
import { SupportTimetablePageModule } from '../pages/support-timetable/support-timetable.module';
import { SupportDashPageModule } from '../pages/support-dash/support-dash.module';

export const firebaseConfig = {
    apiKey: "AIzaSyBSbZUd1sfYbTNgvctBrNdt-sPxlQy1RdM",
    authDomain: "schoollms-aab77.firebaseapp.com",
    databaseURL: "https://schoollms-aab77.firebaseio.com",
    projectId: "schoollms-aab77",
    storageBucket: "schoollms-aab77.appspot.com",
    messagingSenderId: "560050733884"
  };

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule, 
    AngularFirestoreModule,
    AngularFireStorageModule, 
    IonicStepperModule,
    IonicStorageModule.forRoot(), SchoolPageModule, SchoolDevicesPageModule, SchoolUsersPageModule, 
    TimetablePageModule, SchoolProfilePageModule, ValueAddedServicesPageModule, VasProfilePageModule,
    VasUsersPageModule, ValueAddedServicesPageModule, VasDevicesPageModule, HomePageModule, DeviceRegisterPageModule, 
    RegisterPageModule, ChatsPageModule, ProfilePageModule, ChannelPageModule, DashboardPageModule,
    SupportChannelPageModule, EconomyPageModule, GeneralSettingsPageModule, TimetableSettingsPageModule,
    SupportHomePageModule, SupportDashPageModule, SupportTimetablePageModule, SupportSchoolsPageModule, SupportContentPageModule,
    SupportMessagingPageModule, SupportDevicesPageModule
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
    PlacesServiceProvider,
    ObjectInitializerProvider,
    RemoteSyncProvider,
    ChatProvider,
    TimetableProvider
  ]
})
export class AppModule {}
