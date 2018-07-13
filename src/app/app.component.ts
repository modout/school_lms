import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalDbProvider } from '../providers/local-db/local-db';
import { User } from '../models/user.interface';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:string;

   constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
   private local_db: LocalDbProvider) {
    platform.ready().then(() => {
      this.local_db.getCurrentUserProfile().then(user =>{
        if(user){
          switch (user.role[5]){
            case "58":
              this.rootPage = 'SchoolPage';
              break;
            case "63":
              this.rootPage = 'HomePage';
              break;
            case "64":
              this.rootPage = 'HomePage';
              break;
            case "65":
              this.rootPage = 'HomePage';
              break;
            case "66":
              this.rootPage = 'ValueAddedServicesPage';
              break;
            case "67":
              this.rootPage = 'ValueAddedServicesPage';
              break;
            case "68":
              this.rootPage = 'ValueAddedServicesPage';
              break;
            case "69":
              this.rootPage = 'ValueAddedServicesPage';
              break;
            case "70":
              this.rootPage = 'ValueAddedServicesPage';
              break;
            case "71":
              this.rootPage = 'ValueAddedServicesPage';
              break;
            default:
              this.rootPage = 'RegisterPage';
              break;
          }
        }else{
          this.rootPage = 'RegisterPage';
        }
      })
      .catch(err => console.log(err))
      if(this.platform.is('cordova')){
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });
  }
}

