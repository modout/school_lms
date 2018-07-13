import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VasDevicesPage } from './vas-devices';

@NgModule({
  declarations: [
    VasDevicesPage,
  ],
  imports: [
    IonicPageModule.forChild(VasDevicesPage),
  ],
})
export class VasDevicesPageModule {}
