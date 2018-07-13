import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VasProfilePage } from './vas-profile';

@NgModule({
  declarations: [
    VasProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(VasProfilePage),
  ],
})
export class VasProfilePageModule {}
