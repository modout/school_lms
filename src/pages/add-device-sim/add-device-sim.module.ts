import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDeviceSimPage } from './add-device-sim';

@NgModule({
  declarations: [
    AddDeviceSimPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDeviceSimPage),
  ],
})
export class AddDeviceSimPageModule {}
