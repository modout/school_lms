import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimInfoPage } from './sim-info';

@NgModule({
  declarations: [
    SimInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SimInfoPage),
  ],
})
export class SimInfoPageModule {}
