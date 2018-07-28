import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChannelMessage } from '../../models/message.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { Observable } from 'rxjs';
import { ChatProvider } from '../../providers/chat/chat';


@IonicPage()
@Component({
  selector: 'page-support-messaging',
  templateUrl: 'support-messaging.html',
})
export class SupportMessagingPage {

  messages: Observable<ChannelMessage[]>
  message: ChannelMessage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private chat_svc: ChatProvider){
  	this.messages = this.chat_svc.getAllSupportChannels();
  	this.chat_svc.getAllSupportChannels().subscribe(data =>{
  		console.log(data);
  	})
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportMessagingPage');
  }

}
