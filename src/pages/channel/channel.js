var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { FilteringProvider } from '../../providers/filtering/filtering';
var ChannelPage = /** @class */ (function () {
    function ChannelPage(navCtrl, navParams, chat_svc, object_init, remote_sync, local_db, filter_svc, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chat_svc = chat_svc;
        this.object_init = object_init;
        this.remote_sync = remote_sync;
        this.local_db = local_db;
        this.filter_svc = filter_svc;
        this.alertCtrl = alertCtrl;
        this.schoolUsers = [];
        this.predictions = [];
        this.addUser = false;
        this.userName = '';
        this.addedUsers = [];
        this.channelMessages = [];
        this.text = '';
        this.loading = false;
        this.message = this.object_init.initializeChannelMessage(); //initializing the message object
        if (this.navParams.data) {
            this.channel = this.object_init.initializeChannel1(this.navParams.data); //initializing the channel
        }
        this.local_db.getSchool().then(function (school) {
            _this.remote_sync.getSchoolUsers(school.id).subscribe(function (users) {
                _this.schoolUsers = users;
            });
        });
    }
    ChannelPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.chat_svc.getChannelMessages(this.channel.id).subscribe(function (messages) {
            _this.channelMessages = messages;
            _this.scrollToBottom();
        });
    };
    ChannelPage.prototype.scrollToBottom = function () {
        if (this.feedContainer != undefined)
            this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
    };
    ChannelPage.prototype.handleSubmit = function (event) {
        if (event.keyCode === 13) {
            this.send();
            this.scrollToBottom();
        }
    };
    ChannelPage.prototype.showAdd = function () {
        this.addUser = true;
    };
    ChannelPage.prototype.add = function (user) {
        var _this = this;
        this.loading = true;
        var group_ids = [];
        var subscribers = this.channel.subscribers ? this.channel.subscribers : [];
        group_ids = user.profile.channels ? user.profile.channels : [];
        group_ids.push(this.channel.id);
        subscribers.push(user.profile.uid);
        this.chat_svc.inviteToGroup(group_ids, user.profile.uid, this.channel.id, subscribers).then(function () {
            _this.showAlert('Member added!', user.profile.firstname + " has been successfully added to this group");
            _this.userName = '';
            _this.predictions = [];
            _this.addUser = false;
            _this.loading = false;
        });
    };
    ChannelPage.prototype.cancel = function () {
        this.addUser = false;
    };
    ChannelPage.prototype.send = function () {
        this.message.text = this.text;
        this.message.timeStamp = Date.now();
        this.message.by = this.channel.creator;
        this.message.channel_id = this.channel.id;
        this.chat_svc.createMessageInChannel(this.message);
        this.text = '';
    };
    ChannelPage.prototype.autocomplete = function () {
        this.predictions = this.filter_svc.userAutocomplete(this.schoolUsers, this.userName);
    };
    //Shows a popup alert with a custom message
    ChannelPage.prototype.showAlert = function (topic, subTitle) {
        var alert = this.alertCtrl.create({
            title: topic,
            subTitle: subTitle,
            cssClass: 'alertCtrl',
            buttons: ['OK']
        });
        alert.present();
    };
    __decorate([
        ViewChild('scroller'),
        __metadata("design:type", ElementRef)
    ], ChannelPage.prototype, "feedContainer", void 0);
    ChannelPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-channel',
            templateUrl: 'channel.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ChatProvider,
            ObjectInitializerProvider, RemoteSyncProvider,
            LocalDbProvider, FilteringProvider, AlertController])
    ], ChannelPage);
    return ChannelPage;
}());
export { ChannelPage };
//# sourceMappingURL=channel.js.map