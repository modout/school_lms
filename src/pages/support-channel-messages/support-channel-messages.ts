import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChannelMessage } from '../../models/message.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { Observable } from 'rxjs';
import { ChatProvider } from '../../providers/chat/chat';
import { Channel } from '../../models/channel.interface';
import { User } from '../../models/user.interface';

@IonicPage()
@Component({
  selector: 'page-support-channel-messages',
  templateUrl: 'support-channel-messages.html',
})
export class SupportChannelMessagesPage {
  @ViewChild('scroller') feedContainer: ElementRef;
  messages: Observable<ChannelMessage[]>;
  channel: Channel;
  message: ChannelMessage;
  text: string;
  user: User;
  channelId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private chat_svc: ChatProvider,
  	private object_init: ObjectInitializerProvider, private local_db: LocalDbProvider, private remote_sync: RemoteSyncProvider){
  	this.user = this.object_init.initializeUser();
  	this.channel = this.object_init.initializeChannel();
  	this.message = this.object_init.initializeChannelMessage();
  	if(this.navParams.data){
  		console.log('support channel id: ', this.navParams.data)
  		this.channelId = this.navParams.data;
  		this.messages = this.chat_svc.getSupportMesssages(this.navParams.data);
  		this.remote_sync.getUser(this.channelId).subscribe(user =>{
  			this.user = user.profile;
  		})
  	}
  }

  ionViewDidLoad(){
    
  }

   scrollToBottom(){
    if(this.feedContainer != undefined) 
      this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  handleSubmit(event){
    if(event.keyCode === 13){
      this.send();
      this.scrollToBottom();
    }
  }

  /*showAdd(){
  	this.addUser = true;
  }
*/
  send(){
    this.message.text = this.text;
  	this.message.timeStamp = Date.now();
  	this.message.by = this.user;
  	this.message.channel_id = this.channelId;
  	this.chat_svc.createMessageInChannel(this.message);
  	this.text = '';
  }

}
