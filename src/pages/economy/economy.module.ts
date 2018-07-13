import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EconomyPage } from './economy';

@NgModule({
  declarations: [
    EconomyPage,
  ],
  imports: [
    IonicPageModule.forChild(EconomyPage),
  ],
})
export class EconomyPageModule {}
