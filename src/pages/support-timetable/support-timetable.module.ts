import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportTimetablePage } from './support-timetable';

@NgModule({
  declarations: [
    SupportTimetablePage,
  ],
  imports: [
    IonicPageModule.forChild(SupportTimetablePage),
  ],
})
export class SupportTimetablePageModule {}
