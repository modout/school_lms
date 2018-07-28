//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ChannelMessage } from '../../models/message.interface';
import { PrivateMessage } from '../../models/private_message.interface';
import { Channel } from '../../models/channel.interface';
import { User } from '../../models/user.interface';
import { Observable } from 'rxjs';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(private db: AngularFireDatabase){ 
  }

  //-------------------------Getters------------------------------------------------------------------------------
  	getChannelMessages(channel_id: string):Observable<ChannelMessage[]>{
  		return this.db.list<ChannelMessage>(`Channels/${channel_id}/messages`).valueChanges();
  	}

  	getChannel(channel_id: string): Observable<Channel>{
  		return this.db.object<Channel>(`Channels/${channel_id}`).valueChanges();
  	}

    getUserChannels(user:User): Observable<Channel[]>{
      return this.db.list<Channel>('Channels').valueChanges()
      .map(channels =>{
          return channels.filter(channel => (user.channels.indexOf(channel.id) != -1))
      })
    }

  	getSupportChannel(uid: string): Observable<ChannelMessage[]>{
  		return this.db.list<ChannelMessage>(`Support_Channels/${uid}`).valueChanges();
  	}

    getAllSupportChannels(): Observable<ChannelMessage[]>{
      return this.db.list<ChannelMessage>('Support_Channels').valueChanges()
    }

  	getOneToOne(uid: string){
  		return this.db.object(`One_to_One/${uid}`).valueChanges();
  	}

  	getAllChannels(): Observable<Channel[]>{
  		return this.db.list<Channel>(`Channels`).valueChanges();
  	}
  //--------------------------------------------------------------------------------------------------------------

  //---------------------------Setters----------------------------------------------------------------------------
  	createMessageInChannel( message: ChannelMessage){
  		return this.db.list(`Channels/${message.channel_id}/messages`).push(message);
  	}

  	createSupportChannel(message: ChannelMessage){
  		return this.db.list(`Support_Channels/${message.by.uid}`).push(message)
  	}

  	createChatChannel(channel: Channel){
  		return this.db.list('Channels').push(channel);
  	}

  	sendOneToOne(message: PrivateMessage){
  		this.db.list(`One_to_One/${message.by.uid}/${message.to.uid}`).push(message);
  		this.db.list(`One_to_One/${message.to.uid}/${message.by.uid}`).push(message);
  	}

    sendSupportMessage(message: ChannelMessage){
      return this.db.list(`Support_Channels/${message.by.uid}`).push(message);
    }

    respondToSupportMessage(message: ChannelMessage){
      return this.db.list(`Support_Channels/${message.channel_id}`).push(message);
    }

  	subscribeToChannel(channel_id: string, user: User){
  		return this.db.list(`Channels/${channel_id}/subscribers`).push(user);
  	}
  //---------------------------------------------------------------------------------------------------------------

  //---------------------------Updaters-----------------------------------------------------------------------------
    updateChannel(channel: Channel){
      return this.db.object(`Channels/${channel.id}`).set(channel);
    }
  //----------------------------------------------------------------------------------------------------------------

    inviteToGroup(group_ids: string[], uid: string, channel_id: string, subscribers: string[]){
      //this.db.object(`Channels/${channel_id}/subscribers`).set(subscribers);
      return this.db.object(`Users/${uid}/profile/channels`).set(group_ids)
    }

}
