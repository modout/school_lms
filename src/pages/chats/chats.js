var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChatProvider } from '../../providers/chat/chat';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { ChannelPage } from '../channel/channel';
import { SupportChannelPage } from '../support-channel/support-channel';
var ChatsPage = /** @class */ (function () {
    function ChatsPage(navCtrl, navParams, messaging_svc, object_init, local_db, remote_sync) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.messaging_svc = messaging_svc;
        this.object_init = object_init;
        this.local_db = local_db;
        this.remote_sync = remote_sync;
        this.userChannels = [];
        this.showSupport = false;
        this.showMessages = false;
        this.showChannelList = true;
        this.addChannel = false;
        this.isNotLearner = false;
        this.channel = {
            id: '',
            date_created: 0,
            messages: [],
            name: '',
            subscribers: [],
            creator: {}
        };
    }
    ChatsPage.prototype.ionViewDidLoad = function () {
        this.getUser();
    };
    ChatsPage.prototype.newChannel = function () {
        this.addChannel = !this.addChannel;
    };
    ChatsPage.prototype.displayChannels = function () {
        this.showChannelList = true;
        this.addChannel = false;
    };
    ChatsPage.prototype.saveChannel = function () {
        this.channel.date_created = Date.now(); //set date creation
        this.channel.creator = this.user.profile; //set the creator of the channel
        var fbRef = this.messaging_svc.createChatChannel(this.channel); //create the channel and get a refference
        this.user.profile.channels.push(fbRef.key); // add a refference of channel to users channel list
        this.channel.id = fbRef.key; //update the channel key field on the remote db
        this.messaging_svc.updateChannel(this.channel);
        this.updateUser(); //Update the user local and remote user dbs  
    };
    ChatsPage.prototype.cancel = function () {
        this.addChannel = false;
    };
    ChatsPage.prototype.gotoChannel = function (channel) {
        this.navCtrl.push(ChannelPage, channel);
    };
    ChatsPage.prototype.gotoSupport = function () {
        this.navCtrl.push(SupportChannelPage, this.user);
    };
    ChatsPage.prototype.getUserChannels = function (user) {
        var _this = this;
        this.userChannels = [];
        this.messaging_svc.getUserChannels(user.profile).subscribe(function (channels) {
            _this.userChannels = channels;
        });
        this.messaging_svc.getSupportChannel(this.user.profile.uid).subscribe(function (support) {
            _this.userSupport = support;
        });
    };
    ChatsPage.prototype.getUser = function () {
        var _this = this;
        this.local_db.getCurrentUser().then(function (user) {
            console.log(user);
            _this.remote_sync.getUser(user.profile.uid).subscribe(function (fbUser) {
                console.log(fbUser);
                if (fbUser) {
                    var currentUser = _this.object_init.initializeUser1(fbUser.profile);
                    _this.user = fbUser;
                    _this.user.profile = currentUser;
                    _this.getUserChannels(fbUser);
                }
                else {
                    var currentUser = _this.object_init.initializeUser1(user.profile);
                    _this.user = user;
                    _this.user.profile = currentUser;
                }
            });
        });
    };
    ChatsPage.prototype.updateUser = function () {
        var _this = this;
        this.local_db.setUser(this.user).then(function (user) {
            _this.remote_sync.updateUser(_this.user).then(function () {
                _this.getUserChannels(_this.user);
                _this.addChannel = false;
            })
                .catch(function (err) { return console.log(err); });
        })
            .catch(function (err) { return console.log(err); });
    };
    ChatsPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-chats',
            templateUrl: 'chats.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ChatProvider,
            ObjectInitializerProvider, LocalDbProvider,
            RemoteSyncProvider])
    ], ChatsPage);
    return ChatsPage;
}());
export { ChatsPage };
//# sourceMappingURL=chats.js.map