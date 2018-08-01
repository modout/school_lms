import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChannelPage } from './channel';
import { TimeAgoPipe } from 'time-ago-pipe';


@NgModule({
  declarations: [
    ChannelPage, TimeAgoPipe
  ],
  imports: [
    IonicPageModule.forChild(ChannelPage), 

  ],
  exports: [TimeAgoPipe]
})
export class ChannelPageModule {}
