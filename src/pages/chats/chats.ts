import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { Channel } from '../../models/channel.interface';
import { User } from '../../models/user.interface';
import { VAS } from '../../models/vas.interface';
import { Learner } from '../../models/learner.interface';
import { Teacher } from '../../models/teacher.interface';
import { Parent } from '../../models/parent.interface';
import { School } from '../../models/school.interface';
import { ChannelMessage } from '../../models/message.interface';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { ChannelPage } from '../channel/channel';
import { SupportChannelPage } from '../support-channel/support-channel';


@IonicPage()
@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {
  user: any;
  userChannels: Channel[] = [];
  userSupport: any;
  showSupport: boolean = false;
  showMessages: boolean = false;
  showChannelList: boolean = true;
  addChannel: boolean = false;
  channel: Channel;
  isNotLearner: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private messaging_svc: ChatProvider,
  	private object_init: ObjectInitializerProvider, private local_db: LocalDbProvider, 
  	private remote_sync: RemoteSyncProvider){
  		
  		this.channel ={
  			id : '',
  			date_created : 0,
  			messages : [],
  			name : '',
  			subscribers : [],
  			creator : {}
  		}
  }

  ionViewDidLoad(){
    this.getUser();
  }

  newChannel(){
  	this.addChannel = !this.addChannel;
  }

  displayChannels(){
  	this.showChannelList = true;
    this.addChannel = false;
  }

  saveChannel(){
  	this.channel.date_created = Date.now(); //set date creation
  	this.channel.creator = this.user.profile;  //set the creator of the channel
    let fbRef = this.messaging_svc.createChatChannel(this.channel); //create the channel and get a refference
  	this.user.profile.channels.push(fbRef.key); // add a refference of channel to users channel list
    this.channel.id = fbRef.key;  //update the channel key field on the remote db
    this.messaging_svc.updateChannel(this.channel);
  	this.updateUser(); //Update the user local and remote user dbs  
   
  }

  cancel(){
    this.addChannel = false;
  }

  gotoChannel(channel: Channel){
    this.navCtrl.push(ChannelPage, channel);
  }

  gotoSupport(){
    this.navCtrl.push(SupportChannelPage, this.user);
  }

  getUserChannels(user){
  	this.userChannels = [];
      this.messaging_svc.getUserChannels(user.profile).subscribe(channels =>{
        this.userChannels = channels;
    })
  	
  	this.messaging_svc.getSupportChannel(this.user.profile.uid).subscribe(support =>{
  		this.userSupport = support;
  	})
  }

  getUser(){
  	this.local_db.getCurrentUser().then(user =>{
      console.log(user);
      this.remote_sync.getUser(user.profile.uid).subscribe(fbUser =>{
        console.log(fbUser);
        if(fbUser){
          let currentUser = this.object_init.initializeUser1(fbUser.profile);
          this.user = fbUser;
          this.user.profile = currentUser;
          this.getUserChannels(fbUser);
        }else{
          let currentUser = this.object_init.initializeUser1(user.profile)
          this.user = user;
          this.user.profile = currentUser;
        }
      }) 
    })
  }

  updateUser(){
  	this.local_db.setUser(this.user).then(user =>{
      this.remote_sync.updateUser(this.user).then(() =>{  
          this.getUserChannels(this.user);
          this.addChannel = false;
       })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }



}
