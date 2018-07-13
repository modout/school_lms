import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValueAddedServicesPage } from './value-added-services';

@NgModule({
  declarations: [
    ValueAddedServicesPage,
  ],
  imports: [
    IonicPageModule.forChild(ValueAddedServicesPage),
  ],
})
export class ValueAddedServicesPageModule {}
