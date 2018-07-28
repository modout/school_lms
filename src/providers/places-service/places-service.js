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
var PlacesServiceProvider = /** @class */ (function () {
    function PlacesServiceProvider() {
        console.log('Hello PlacesServiceProvider Provider');
    }
    PlacesServiceProvider.prototype.getAdressPredictionsSA = function (searchText, service) {
        if (searchText != undefined && searchText != null && searchText.length > 1) {
            return new Promise(function (resolve, reject) {
                service.getPlacePredictions({ input: searchText, componentRestrictions: { country: 'za' }, types: ['address'] }, function (predictions, status) {
                    if (status != google.maps.places.PlacesServiceStatus.OK) {
                        reject(new Error(status));
                    }
                    else {
                        resolve(predictions);
                    }
                });
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                resolve([]);
            });
        }
    };
    PlacesServiceProvider.prototype.getEstablishmentPredictionsSA = function (searchText, service) {
        if (searchText != undefined && searchText != null && searchText.length > 1) {
            return new Promise(function (resolve, reject) {
                service.getPlacePredictions({ input: searchText, componentRestrictions: { country: 'za' }, types: ['establishment'],
                    type: 'shool' }, function (predictions, status) {
                    if (status != google.maps.places.PlacesServiceStatus.OK) {
                        reject(new Error(status));
                    }
                    else {
                        resolve(predictions);
                    }
                });
            });
        }
        else {
            return new Promise(function (resolve, reject) {
                resolve([]);
            });
        }
    };
    PlacesServiceProvider.prototype.geoGoder = function (address) {
        var geocoder = new google.maps.Geocoder;
        return new Promise(function (resolve, reject) {
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {
                    var place = {
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng(),
                        description: results[0].formatted_address,
                        name: results[0].formatted_address,
                        vicinity: results[0].formatted_address,
                        country_long: '',
                        country_short: '',
                        place_id: results[0].place_id
                    };
                    //console.log('results: ', results);
                    results[0].address_components.forEach(function (comp) {
                        comp.types.forEach(function (type) {
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
                                case "name":
                                    place.name = comp.long_name;
                                    break;
                                case "vicinity":
                                    place.vicinity = comp.long_name;
                                    break;
                            }
                        });
                    });
                    resolve(place);
                }
                else {
                    console.log('Status: ', status);
                    reject(new Error(status));
                }
            });
        });
    };
    PlacesServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], PlacesServiceProvider);
    return PlacesServiceProvider;
}());
export { PlacesServiceProvider };
//# sourceMappingURL=places-service.js.map