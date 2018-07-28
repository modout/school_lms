var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ChatProvider = /** @class */ (function () {
    function ChatProvider(db) {
        this.db = db;
    }
    //-------------------------Getters------------------------------------------------------------------------------
    ChatProvider.prototype.getChannelMessages = function (channel_id) {
        return this.db.list("Channels/" + channel_id + "/messages").valueChanges();
    };
    ChatProvider.prototype.getChannel = function (channel_id) {
        return this.db.object("Channels/" + channel_id).valueChanges();
    };
    ChatProvider.prototype.getUserChannels = function (user) {
        return this.db.list('Channels').valueChanges()
            .map(function (channels) {
            return channels.filter(function (channel) { return (user.channels.indexOf(channel.id) != -1); });
        });
    };
    ChatProvider.prototype.getSupportChannel = function (uid) {
        return this.db.list("Support_Channels/" + uid).valueChanges();
    };
    ChatProvider.prototype.getAllSupportChannels = function () {
        return this.db.list('Support_Channels').valueChanges();
    };
    ChatProvider.prototype.getOneToOne = function (uid) {
        return this.db.object("One_to_One/" + uid).valueChanges();
    };
    ChatProvider.prototype.getAllChannels = function () {
        return this.db.list("Channels").valueChanges();
    };
    //--------------------------------------------------------------------------------------------------------------
    //---------------------------Setters----------------------------------------------------------------------------
    ChatProvider.prototype.createMessageInChannel = function (message) {
        return this.db.list("Channels/" + message.channel_id + "/messages").push(message);
    };
    ChatProvider.prototype.createSupportChannel = function (message) {
        return this.db.list("Support_Channels/" + message.by.uid).push(message);
    };
    ChatProvider.prototype.createChatChannel = function (channel) {
        return this.db.list('Channels').push(channel);
    };
    ChatProvider.prototype.sendOneToOne = function (message) {
        this.db.list("One_to_One/" + message.by.uid + "/" + message.to.uid).push(message);
        this.db.list("One_to_One/" + message.to.uid + "/" + message.by.uid).push(message);
    };
    ChatProvider.prototype.sendSupportMessage = function (message) {
        return this.db.list("Support_Channels/" + message.by.uid).push(message);
    };
    ChatProvider.prototype.respondToSupportMessage = function (message) {
        return this.db.list("Support_Channels/" + message.channel_id).push(message);
    };
    ChatProvider.prototype.subscribeToChannel = function (channel_id, user) {
        return this.db.list("Channels/" + channel_id + "/subscribers").push(user);
    };
    //---------------------------------------------------------------------------------------------------------------
    //---------------------------Updaters-----------------------------------------------------------------------------
    ChatProvider.prototype.updateChannel = function (channel) {
        return this.db.object("Channels/" + channel.id).set(channel);
    };
    //----------------------------------------------------------------------------------------------------------------
    ChatProvider.prototype.inviteToGroup = function (group_ids, uid, channel_id, subscribers) {
        //this.db.object(`Channels/${channel_id}/subscribers`).set(subscribers);
        return this.db.object("Users/" + uid + "/profile/channels").set(group_ids);
    };
    ChatProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireDatabase])
    ], ChatProvider);
    return ChatProvider;
}());
export { ChatProvider };
//# sourceMappingURL=chat.js.map