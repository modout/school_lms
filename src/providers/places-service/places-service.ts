//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address2 } from '../../models/address2.interface'

declare var google: any;

@Injectable()
export class PlacesServiceProvider {

  constructor() {
    console.log('Hello PlacesServiceProvider Provider');
  }

  getPlacePredictionsSA(searchText: string, service: any):Promise<any[]>{
    if(searchText != undefined && searchText != null && searchText.length > 1){
        return new Promise<any>((resolve, reject) =>{
          service.getPlacePredictions({ input: searchText, componentRestrictions: {country: 'za'} }, 
          (predictions, status) =>{
            if (status != google.maps.places.PlacesServiceStatus.OK){
              reject(new Error(status));
            }else{
              resolve(predictions);
            }
          });
        }) 
    }else{
      return new Promise<any>((resolve, reject) =>{
        resolve([]);
      })
    }
  }


  geoGoder(address: string):Promise<Address2>{
  var geocoder = new google.maps.Geocoder;
  return new Promise<Address2>((resolve, reject) =>{
    geocoder.geocode({'address': address}, (results, status) =>{
      if(status === 'OK'){
        var place: Address2 = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
          description:  results[0].formatted_address,
          name: results[0].formatted_address,
          vicinity: results[0].formatted_address,
          country_long: '',
          country_short: ''
        }
        //console.log('results: ', results);
        results[0].address_components.forEach(comp =>{
          comp.types.forEach(type =>{
            switch (type) {
              case "administrative_area_level_1":
                place.administrative_area_level_1_lng = comp.long_name;
                place.administrative_area_level_1_short = comp.short_name;
                break;
                case "administrative_area_level_2":
                place.administrative_area_level_2_lng = comp.long_name;
                place.administrative_area_level_2_short = comp.short_name;
                break;
              case "country":
                place.country_long = comp.long_name;
                place.country_short = comp.short_name;
                break;
                case "locality":
                place.locality_lng = comp.long_name;
                place.locality_short = comp.short_name;
                break;
                case "sublocality":
                place.sublocality_lng = comp.long_name;
                place.sublocality_short = comp.short_name;
                break;
                case "postal_code":
                place.postal_code = comp.long_name;
                break;
            }
          })
        })
        resolve(place);
      }
      else {
        console.log('Status: ', status);
        reject(new Error(status))
      }
    })
  }) 
}

}
