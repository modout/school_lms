import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportDashPage } from './support-dash';

@NgModule({
  declarations: [
    SupportDashPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportDashPage),
  ],
})
export class SupportDashPageModule {}
