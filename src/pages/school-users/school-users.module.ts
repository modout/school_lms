import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchoolUsersPage } from './school-users';

@NgModule({
  declarations: [
    SchoolUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(SchoolUsersPage),
  ],
})
export class SchoolUsersPageModule {}
