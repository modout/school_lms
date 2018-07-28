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
var SupportMessagingPage = /** @class */ (function () {
    function SupportMessagingPage(navCtrl, navParams, chat_svc) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chat_svc = chat_svc;
        this.messages = this.chat_svc.getAllSupportChannels();
        this.chat_svc.getAllSupportChannels().subscribe(function (data) {
            console.log(data);
        });
    }
    SupportMessagingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SupportMessagingPage');
    };
    SupportMessagingPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-support-messaging',
            templateUrl: 'support-messaging.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ChatProvider])
    ], SupportMessagingPage);
    return SupportMessagingPage;
}());
export { SupportMessagingPage };
//# sourceMappingURL=support-messaging.js.map