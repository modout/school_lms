import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { ChatProvider } from '../../providers/chat/chat';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { User } from '../../models/user.interface';
import { ChannelMessage } from '../../models/message.interface';
import { Channel } from '../../models/channel.interface';


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
  hasSupport: boolean = false;
  channel: Channel;
  isNewChannel: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider,
  	private chat_svc: ChatProvider, private object_init: ObjectInitializerProvider){
    this.channel = this.object_init.initializeChannel();//Initialize channel with empty fields
    if(this.navParams.data){//This is a general user object
      console.log('navParams: ', this.navParams.data);
      this.user = this.navParams.data.profile;
    }
  	this.channelMessage = this.object_init.initializeChannelMessage();
  }

  ionViewDidLoad(){
    this.chat_svc.getSupportMesssages(this.navParams.data.profile.uid).subscribe(messages =>{
      if(messages && messages.length > 0){
        console.log(messages)
        this.channelMessages = messages;
        console.log('messages: ', messages);
        this.hasSupport = true;
      }else{
        this.isNewChannel = true;
      }
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

  handleNewSubmit(event){
    if(event.keyCode === 13){
      this.sendNew();
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

  sendNew(){
    this.channel.creator = this.user;
    this.channel.id = this.user.uid;
    this.channel.name = this.user.firstname + ' ~ ' + this.user.role[0];
    this.channel.date_created = Date.now();
    this.chat_svc.createSupportChannel(this.channel)
    .then(() =>{
      this.send();
    })
  }

}
