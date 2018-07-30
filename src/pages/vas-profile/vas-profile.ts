import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, NavOptions } from 'ionic-angular';
import { VAS } from '../../models/vas.interface';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';
import { RegisterPage } from '../register/register';

declare var google;

@IonicPage()
@Component({
  selector: 'page-vas-profile',
  templateUrl: 'vas-profile.html',
})
export class VasProfilePage {

  image = 'assets/imgs/placeholder.png';
  vas: VAS;
  editProfile: boolean = false;
  showUser: boolean = false;
  showCompany: boolean = true;
  service = new google.maps.places.AutocompleteService();
  addPredictions: any[] = [];
  adressSearchTxt: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private local_db: LocalDbProvider,
  	private alertCtrl: AlertController, private object_init_svc: ObjectInitializerProvider, 
    private places_svc: PlacesServiceProvider){
  	this.vas = this.object_init_svc.initializeVAS();
    this.local_db.getCurrentUser().then(data =>{
      console.log('user: ', data);
      this.vas = data;
      if(data.profile.role[2])
        this.vas.company_name = data.profile.role[2];
        console.log(data);
    })
  }

  edit(){
  	this.editProfile = !this.editProfile;
  }

  toggleUser(){
    this.showCompany = false;
    this.showUser = true;
  }

  toggleCompany(){
    this.showCompany = true;
    this.showUser = false;
  }

  showAlert(topic: string, subTitle: string){
    let alert = this.alertCtrl.create({
      title:    topic,
      subTitle: subTitle,
      cssClass: 'alertCtrl',
      buttons: ['OK']
    });
    alert.present();
  }

  getPredictions(event){
      this.places_svc.getAdressPredictionsSA(event.target.value, this.service).then(data =>{
        this.addPredictions = data;
      })
      .catch(err => console.log(err))
  }

  selectAddress(pred: any){
    this.places_svc.geoGoder(pred.description).then(data =>{
        this.vas.address.street_address = data.description;
        this.vas.address.country = data.country_long;
        this.vas.address.postal_code = data.postal_code;
        this.vas.address.province = data.administrative_area_level_1_lng;
        this.vas.address.city = data.locality_lng;
        this.vas.address.lat = data.lat;
        this.vas.address.lng = data.lng;
        this.adressSearchTxt = data.description.split(' ')[0] + data.description.split(' ')[1] + data.description.split(' ')[2];
        this.addPredictions = [];
    })
    .catch(err => console.log(err))
  }

  logout(){
    this.local_db.removeCurrentUser().then(() =>{
      this.navCtrl.push(RegisterPage)
      .catch(err => console.log(err));
    })
  }

}
