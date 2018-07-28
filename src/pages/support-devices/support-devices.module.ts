import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportDevicesPage } from './support-devices';

@NgModule({
  declarations: [
    SupportDevicesPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportDevicesPage),
  ],
})
export class SupportDevicesPageModule {}
