import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { ChatProvider } from '../../providers/chat/chat';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { User } from '../../models/user.interface';
import { ChannelMessage } from '../../models/message.interface';


@IonicPage()
@Component({
  selector: 'page-support-channel',
  templateUrl: 'support-channel.html',
})
export class SupportChannelPage {
  @ViewChild('scroller') feedContainer: ElementRef;
  user: User;
  channelMessages: ChannelMessage[] = [];
  channelMessage: ChannelMessage;
  text: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider,
  	private chat_svc: ChatProvider, private object_init: ObjectInitializerProvider){
    if(this.navParams.data){
      this.user = this.navParams.data.profile;
    }
  	this.channelMessage = this.object_init.initializeChannelMessage();
  }

  ionViewDidLoad(){
    this.chat_svc.getSupportChannel(this.user.uid).subscribe(channel =>{
      this.channelMessages = channel;
    });
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

  send(){
  	this.channelMessage.by = this.user;
  	this.channelMessage.timeStamp = Date.now();
  	this.channelMessage.text = this.text;
  	this.channelMessage.channel_id = this.user.uid;
  	this.chat_svc.sendSupportMessage(this.channelMessage);
  	this.text = '';
  }

}
