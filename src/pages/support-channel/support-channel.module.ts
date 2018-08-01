import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportChannelPage } from './support-channel';
import { ChannelPageModule } from '../channel/channel.module';

@NgModule({
  declarations: [
    SupportChannelPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportChannelPage), 
    ChannelPageModule

  ],
})
export class SupportChannelPageModule {}
