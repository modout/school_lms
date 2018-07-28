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
var FilteringProvider = /** @class */ (function () {
    function FilteringProvider() {
    }
    FilteringProvider.prototype.autocomplete = function (value, search) {
        if (search === '') {
            return [];
        }
        else {
            return value.filter(function (v) {
                if (!v) {
                    return;
                }
                else {
                    return v.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            });
        }
    };
    FilteringProvider.prototype.supplierAutocomplete = function (value, search) {
        if (search === '') {
            return [];
        }
        else {
            return value.filter(function (v) {
                if (!v) {
                    return;
                }
                else {
                    return v.company_name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            });
        }
    };
    FilteringProvider.prototype.userAutocomplete = function (value, search) {
        if (search === '') {
            return [];
        }
        else {
            return value.filter(function (v) {
                if (!v) {
                    return;
                }
                else {
                    return v.profile.firstname.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            });
        }
    };
    FilteringProvider.prototype.filterTeacherBySubject = function (value, search) {
        if (search === '') {
            return [];
        }
        else {
            return value.filter(function (v) {
                if (!v) {
                    return;
                }
                else {
                    return v.subjects.toLowerCase().indexOf(search.toLowerCase()) !== -1;
                }
            });
        }
    };
    FilteringProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], FilteringProvider);
    return FilteringProvider;
}());
export { FilteringProvider };
//# sourceMappingURL=filtering.js.map