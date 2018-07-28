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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

   constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen,
   private local_db: LocalDbProvider){
    platform.ready().then(() => {
      this.local_db.getType().then(type =>{
        if(type){
          console.log('Got type: ', type);
          switch (type){
            case "user":
              this.directUsers();
              break;
              case "school":
              this.local_db.getCurrentUser().then(data =>{
                if(data){
                  this.directUsers();
                }else{
                  this.rootPage = SchoolPage;
                }
              })
              break;
            default:
              this.rootPage = RegisterPage;
              break;
          }
        }else{
          this.rootPage = RegisterPage;
        }
      })
      if(this.platform.is('cordova')){
        statusBar.styleDefault();
        splashScreen.hide();
      }
    });
  }

  directUsers(){
      this.local_db.getCurrentUser().then(user =>{
        if(user){
          console.log('Current user role: ', user);
          switch (user.type){
            case "learner":
              console.log('Learner');
              this.rootPage = HomePage;
              break;
            case "teacher":
              console.log('Teacher');
              this.rootPage = HomePage;
              break;
            case "parent":
              console.log('Parent');
              this.rootPage = HomePage;
              break;
            case "support":
               this.rootPage = SupportHomePage;
               break;
            case "VAS":
              this.rootPage = ValueAddedServicesPage;
              break;
            case "principal":
                this.rootPage = HomePage;
                break;
            case "HOD":
                this.rootPage = HomePage;
                break;
            case "SGB":
                this.rootPage = HomePage;
                break;
            case "IT Administrator":
                this.rootPage = HomePage;
                break;
              default:
              this.rootPage = RegisterPage;
          }
        }
      })
      .catch(err => console.log(err))
  }

}

