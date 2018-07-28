import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportHomePage } from './support-home';

@NgModule({
  declarations: [
    SupportHomePage,
  ],
  imports: [
    IonicPageModule.forChild(SupportHomePage),
  ],
})
export class SupportHomePageModule {}
