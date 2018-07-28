import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TimetableSettingsPage } from './timetable-settings';

@NgModule({
  declarations: [
    TimetableSettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(TimetableSettingsPage),
  ],
})
export class TimetableSettingsPageModule {}
