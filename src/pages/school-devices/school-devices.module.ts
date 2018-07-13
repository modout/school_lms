import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolDevicesPage } from './school-devices';

@NgModule({
  declarations: [
    SchoolDevicesPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolDevicesPage),
  ],
})
export class SchoolDevicesPageModule {}
