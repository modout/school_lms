import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupportChannelMessagesPage } from './support-channel-messages';
import { ChannelPageModule } from '../channel/channel.module';

@NgModule({
  declarations: [
    SupportChannelMessagesPage,
  ],
  imports: [
    IonicPageModule.forChild(SupportChannelMessagesPage),
    ChannelPageModule
  ],
})
export class SupportChannelMessagesPageModule {}
