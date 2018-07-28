import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeviceRegisterPage } from './device-register';

@NgModule({
  declarations: [
    DeviceRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(DeviceRegisterPage),
  ],
})
export class DeviceRegisterPageModule {}
