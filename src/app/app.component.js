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
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalDbProvider } from '../providers/local-db/local-db';
import { RegisterPage } from '../pages/register/register';
import { SchoolPage } from '../pages/school/school';
import { ValueAddedServicesPage } from '../pages/value-added-services/value-added-services';
import { HomePage } from '../pages/home/home';
import { SupportHomePage } from '../pages/support-home/support-home';
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, local_db) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.local_db = local_db;
        platform.ready().then(function () {
            _this.local_db.getType().then(function (type) {
                if (type) {
                    console.log('Got type: ', type);
                    switch (type) {
                        case "user":
                            _this.directUsers();
                            break;
                        case "school":
                            _this.local_db.getCurrentUser().then(function (data) {
                                if (data) {
                                    _this.directUsers();
                                }
                                else {
                                    _this.rootPage = SchoolPage;
                                }
                            });
                            break;
                        default:
                            _this.rootPage = RegisterPage;
                            break;
                    }
                }
                else {
                    _this.rootPage = RegisterPage;
                }
            });
            if (_this.platform.is('cordova')) {
                statusBar.styleDefault();
                splashScreen.hide();
            }
        });
    }
    MyApp.prototype.directUsers = function () {
        var _this = this;
        this.local_db.getCurrentUser().then(function (user) {
            if (user) {
                console.log('Current user role: ', user);
                switch (user.type) {
                    case "learner":
                        console.log('Learner');
                        _this.rootPage = HomePage;
                        break;
                    case "teacher":
                        console.log('Teacher');
                        _this.rootPage = HomePage;
                        break;
                    case "parent":
                        console.log('Parent');
                        _this.rootPage = HomePage;
                        break;
                    case "support":
                        _this.rootPage = SupportHomePage;
                        break;
                    case "VAS":
                        _this.rootPage = ValueAddedServicesPage;
                        break;
                    case "principal":
                        _this.rootPage = HomePage;
                        break;
                    case "HOD":
                        _this.rootPage = HomePage;
                        break;
                    case "SGB":
                        _this.rootPage = HomePage;
                        break;
                    case "IT Administrator":
                        _this.rootPage = HomePage;
                        break;
                    default:
                        _this.rootPage = RegisterPage;
                }
            }
        })
            .catch(function (err) { return console.log(err); });
    };
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [Platform, StatusBar, SplashScreen,
            LocalDbProvider])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map