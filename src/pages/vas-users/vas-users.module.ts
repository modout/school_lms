import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VasUsersPage } from './vas-users';

@NgModule({
  declarations: [
    VasUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(VasUsersPage),
  ],
})
export class VasUsersPageModule {}
