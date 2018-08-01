import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ChannelMessage } from '../../models/message.interface';
import { Channel } from '../../models/channel.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { Observable } from 'rxjs';
import { ChatProvider } from '../../providers/chat/chat';
import { SupportChannelMessagesPage } from '../support-channel-messages/support-channel-messages'

@IonicPage()
@Component({
  selector: 'page-support-messaging',
  templateUrl: 'support-messaging.html',
})
export class SupportMessagingPage {
  messages: Observable<ChannelMessage[]>
  message: ChannelMessage;
  channels: Observable<Channel[]>;
  channel: Channel;
  shownEmptyOnce: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private chat_svc: ChatProvider, 
    private toastCtrl: ToastController){
  	this.channels = this.chat_svc.getAllSupportChannels();
  	this.chat_svc.getAllSupportChannels().subscribe(data =>{
  		if(!this.shownEmptyOnce && data.length <= 0){
        this.shownEmptyOnce = true;
        this.toastCtrl.create({
             message: `The issue list is still empty for now, you may relax a bit`,
             duration: 5000
          })
          .present();
      }
  	})
  }

  ionViewDidLoad(){
    //console.log('ionViewDidLoad SupportMessagingPage');
  }

  gotoSupport(uid: string){
    this.navCtrl.push(SupportChannelMessagesPage, uid);
  }

}
