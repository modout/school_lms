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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { ChatProvider } from '../../providers/chat/chat';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
var SupportChannelPage = /** @class */ (function () {
    function SupportChannelPage(navCtrl, navParams, local_db, chat_svc, object_init) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.local_db = local_db;
        this.chat_svc = chat_svc;
        this.object_init = object_init;
        this.channelMessages = [];
        this.text = '';
        if (this.navParams.data) {
            this.user = this.navParams.data.profile;
        }
        this.channelMessage = this.object_init.initializeChannelMessage();
    }
    SupportChannelPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.chat_svc.getSupportChannel(this.user.uid).subscribe(function (channel) {
            _this.channelMessages = channel;
        });
    };
    SupportChannelPage.prototype.scrollToBottom = function () {
        if (this.feedContainer != undefined)
            this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
    };
    SupportChannelPage.prototype.handleSubmit = function (event) {
        if (event.keyCode === 13) {
            this.send();
            this.scrollToBottom();
        }
    };
    SupportChannelPage.prototype.send = function () {
        this.channelMessage.by = this.user;
        this.channelMessage.timeStamp = Date.now();
        this.channelMessage.text = this.text;
        this.channelMessage.channel_id = this.user.uid;
        this.chat_svc.sendSupportMessage(this.channelMessage);
        this.text = '';
    };
    __decorate([
        ViewChild('scroller'),
        __metadata("design:type", ElementRef)
    ], SupportChannelPage.prototype, "feedContainer", void 0);
    SupportChannelPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-support-channel',
            templateUrl: 'support-channel.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, LocalDbProvider,
            ChatProvider, ObjectInitializerProvider])
    ], SupportChannelPage);
    return SupportChannelPage;
}());
export { SupportChannelPage };
//# sourceMappingURL=support-channel.js.map