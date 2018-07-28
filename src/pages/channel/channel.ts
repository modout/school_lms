import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Channel } from '../../models/channel.interface';
import { ChatProvider } from '../../providers/chat/chat';
import { ChannelMessage } from '../../models/message.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { FilteringProvider } from '../../providers/filtering/filtering';

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {
  @ViewChild('scroller') feedContainer: ElementRef;
  channel: Channel;
  message: ChannelMessage;
  schoolUsers: any[] = [];
  predictions: any[] = [];
  addUser: boolean = false;
  userName: string = '';
  addedUsers: any[] = [];
  channelMessages: ChannelMessage[] = [];
  text: string = '';
  loading: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private chat_svc: ChatProvider,
  	private object_init: ObjectInitializerProvider, private remote_sync: RemoteSyncProvider, 
  	private local_db: LocalDbProvider, private filter_svc: FilteringProvider, private alertCtrl: AlertController){
  		this.message = this.object_init.initializeChannelMessage();//initializing the message object
  		if(this.navParams.data){
  			this.channel = this.object_init.initializeChannel1(this.navParams.data); //initializing the channel
  		}
  		this.local_db.getSchool().then(school =>{
  			this.remote_sync.getSchoolUsers(school.id).subscribe(users =>{
  				this.schoolUsers = users;
  			})
  		})
  }

  ionViewDidLoad(){
    this.chat_svc.getChannelMessages(this.channel.id).subscribe(messages =>{
      this.channelMessages = messages;
      this.scrollToBottom();
    })
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

  showAdd(){
  	this.addUser = true;
  }

  add(user: any){
    this.loading = true;
  	let group_ids = [];
    let subscribers = this.channel.subscribers ? this.channel.subscribers : [];
  	group_ids = user.profile.channels ? user.profile.channels: [];
  	group_ids.push(this.channel.id);
    subscribers.push(user.profile.uid);
  	this.chat_svc.inviteToGroup(group_ids, user.profile.uid, this.channel.id, subscribers).then(() =>{
        this.showAlert('Member added!', `${user.profile.firstname} has been successfully added to this group`);
        this.userName = '';
        this.predictions = [];
        this.addUser = false;
        this.loading = false;
    })
  	
  }

  cancel(){
  	this.addUser = false;
  }

  send(){
    this.message.text = this.text;
  	this.message.timeStamp = Date.now();
  	this.message.by = this.channel.creator;
  	this.message.channel_id = this.channel.id;
  	this.chat_svc.createMessageInChannel(this.message);
  	this.text = '';
  }

  autocomplete(){
  	this.predictions = this.filter_svc.userAutocomplete(this.schoolUsers, this.userName)
  }

  //Shows a popup alert with a custom message
  showAlert(topic: string, subTitle: string){
    let alert = this.alertCtrl.create({
      title:    topic,
      subTitle: subTitle,
      cssClass: 'alertCtrl',
      buttons: ['OK']
    });
    alert.present();
  }

}
