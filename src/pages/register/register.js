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
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { UserRolesProvider } from '../../providers/user-roles/user-roles';
import { LocalDbProvider } from '../../providers/local-db/local-db';
import { FilteringProvider } from '../../providers/filtering/filtering';
import { PlacesServiceProvider } from '../../providers/places-service/places-service';
import { SchoolPage } from '../school/school';
import { SchoolDetailsPage } from '../school-details/school-details';
import { ValueAddedServicesPage } from '../value-added-services/value-added-services';
import { HomePage } from '../home/home';
import { ObjectInitializerProvider } from '../../providers/object-initializer/object-initializer';
import { DeviceRegisterPage } from '../device-register/device-register';
import { RemoteSyncProvider } from '../../providers/remote-sync/remote-sync';
import { SupportHomePage } from '../support-home/support-home';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, user_role_svc, local_db, filtering_svc, schools_popup, place_svc, object_init_svc, remote_sync, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user_role_svc = user_role_svc;
        this.local_db = local_db;
        this.filtering_svc = filtering_svc;
        this.schools_popup = schools_popup;
        this.place_svc = place_svc;
        this.object_init_svc = object_init_svc;
        this.remote_sync = remote_sync;
        this.alertCtrl = alertCtrl;
        this.contractPoints = [false, false, false, false, false, false, false, false, false, false, false];
        this.schools = [];
        this.suppliers = [];
        this.learners = [];
        this.teachers = [];
        this.parents = [];
        this.role = [];
        this.roleComplete = false;
        this.roles = [];
        this.userRole = ['null', 'null', 'null', 'null', 'null', 'null'];
        this.level = 0;
        this.roleString = '';
        this.schoolPredictions = [];
        this.addPredictions = [];
        this.searchTxt = '';
        this.newSchool = false;
        this.subjects = [];
        this.grade = '';
        this.showSchoolPrompt = false;
        this.schoolSelected = false;
        this.subjectField = '';
        this.children = [];
        this.subjectsArry = [];
        this.gradesArry = [];
        this.isVAS = false;
        this.isLearner = false;
        this.isParent = false;
        this.isDevice = false;
        this.isTeacher = false;
        this.childrenNames = [];
        this.isSchoolManagement = false;
        this.isPrincipal = false;
        this.isHOD = false;
        this.isSGB = false;
        this.isIT = false;
        this.isSupport = false;
        this.service = new google.maps.places.AutocompleteService();
        this.user = this.object_init_svc.initializeUser();
        this.school = this.object_init_svc.initializeSchool();
        this.vas = this.object_init_svc.initializeVAS();
        this.learner = this.object_init_svc.initializeLearner();
        this.parent = this.object_init_svc.initializeParent();
        this.device = this.object_init_svc.initialDevice();
        this.teacher = this.object_init_svc.initializeTeacher();
        this.child = this.object_init_svc.initializeChild();
        this.schoolManagement = this.object_init_svc.initializeSchoolManagement();
        this.support = this.object_init_svc.initializeSupport();
        this.remote_sync.getAllSchools().subscribe(function (schools) {
            _this.schools = schools;
        });
        this.remote_sync.getAllVAS().subscribe(function (suppliers) {
            _this.suppliers = suppliers;
        });
        this.remote_sync.getAllParents().subscribe(function (parents) {
        });
        this.remote_sync.getAllLearners().subscribe(function (learners) {
            _this.learners = learners;
        });
        this.remote_sync.getAllTeachers().subscribe(function (teachers) {
            _this.teachers = teachers;
        });
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        this.getUniqueRolesForColumn(0); //getting an array of non repeating roles in a certain column
    };
    //Shows a popup alert with a custom message
    RegisterPage.prototype.showAlert = function (topic, subTitle) {
        var alert = this.alertCtrl.create({
            title: topic,
            subTitle: subTitle,
            cssClass: 'alertCtrl',
            buttons: ['OK']
        });
        alert.present();
    };
    //Check if all contract points have been agreed to, show a popup and stop navigation if not all points are agreed to
    RegisterPage.prototype.checkIfAgreed = function () {
        for (var i = 0; i < this.contractPoints.length; ++i) {
            if (!this.contractPoints[i]) {
                this.showAlert('Contract not complete', 'You have to agree to all contract points before you proceed');
                break;
            }
        }
    };
    //Setting the first and last name for the current child object
    RegisterPage.prototype.updateChild = function (event) {
        var names = event.target.value.split(" ");
        this.child.firstname = names[0];
        this.child.lastname = names[names.length - 1];
    };
    //load proof of residence file from device to app memory
    RegisterPage.prototype.updateproof = function (event) {
        this.proof_attach = event.target.value;
    };
    //go to the school interface, given a school object
    RegisterPage.prototype.gotoSchool = function (school) {
        var _this = this;
        this.school = school;
        this.local_db.setSchool(this.school).then(function (data) {
            _this.navCtrl.push(SchoolPage);
        })
            .catch(function (err) { return console.log(err); });
    };
    //go to the school interface, given a school object
    RegisterPage.prototype.gotoSupplier = function (supplier) {
        var _this = this;
        this.vas = supplier;
        this.local_db.setVAS(this.vas).then(function (data) {
            _this.navCtrl.push(ValueAddedServicesPage);
        })
            .catch(function (err) { return console.log(err); });
    };
    //go to the school interface, given a school object
    RegisterPage.prototype.gotoLearner = function (learner) {
        var _this = this;
        this.learner = learner;
        this.local_db.setLearner(this.learner).then(function (data) {
            _this.navCtrl.push(HomePage);
        })
            .catch(function (err) { return console.log(err); });
    };
    //go to the school interface, given a school object
    RegisterPage.prototype.gotoTeacher = function (teacher) {
        var _this = this;
        this.teacher = teacher;
        this.local_db.setTeacher(this.teacher).then(function (data) {
            _this.navCtrl.push(HomePage);
        })
            .catch(function (err) { return console.log(err); });
    };
    //go to the school interface, given a school object
    RegisterPage.prototype.gotoParent = function (parent) {
        var _this = this;
        this.parent = parent;
        this.local_db.setParent(this.parent).then(function (data) {
            _this.navCtrl.push(HomePage);
        })
            .catch(function (err) { return console.log(err); });
    };
    //Add subjects to the subject arrsy
    RegisterPage.prototype.addSubject = function (subject) {
        this.subjects.push(subject + '  ' + this.grade);
        this.subjectField = '';
        this.subjectsArry = [];
    };
    //Add a grade to the grades array, given a grade input
    RegisterPage.prototype.addGrade = function (grade) {
        this.grade = grade;
        this.gradesArry = [];
    };
    //load affidavit of residence file from device to app memory
    RegisterPage.prototype.updateaffidavitf = function (event) {
        this.affidavit_attach = event.target.value;
    };
    //Get unique strings (of roles/categories) in a certain column and update the roles array
    RegisterPage.prototype.getUniqueRolesForColumn = function (col) {
        var tempArry = [];
        for (var row = 0; row < this.user_role_svc.USER_ROLES.length; ++row) {
            if (tempArry.indexOf(this.user_role_svc.USER_ROLES[row][col]) == -1) {
                tempArry.push(this.user_role_svc.USER_ROLES[row][col]);
            }
        }
        this.roles = tempArry;
        return tempArry;
    };
    //Select a role from the displayed options and generate the next options screen
    RegisterPage.prototype.selectRole = function (role) {
        console.log('level: ', this.level);
        console.log('selecting role');
        var tempArry = [];
        if (this.roleString === '')
            this.roleString += role; //Update roleString
        else {
            this.roleString += '   >>   ' + role;
        }
        console.log(this.roleString);
        this.userRole[this.level] = role; //update userRole
        console.log('updating  userRole...', this.userRole);
        for (var row = 0; row < this.user_role_svc.USER_ROLES.length; ++row) { //update tempArry
            if (tempArry.indexOf(this.user_role_svc.USER_ROLES[row][this.level + 1]) == -1 && //check if string exists in tempArry
                this.isDecendant(this.user_role_svc.USER_ROLES[row], this.userRole) && //Check if is child of selected
                this.user_role_svc.USER_ROLES[row][this.level + 1] !== 'null' && //Check if string isn't null
                this.level < 4) {
                tempArry.push(this.user_role_svc.USER_ROLES[row][this.level + 1]);
                console.log('tempArray: ', tempArry);
            }
        }
        if (tempArry.length == 0) {
            this.searchRole(this.userRole);
            this.user.role = this.userRole;
            this.roleComplete = true;
            var roleCode = parseInt(this.userRole[5]);
            if (roleCode >= 36 && roleCode <= 57) {
                this.isSupport = true;
            }
            if (this.userRole[5] === '58') {
                this.newSchool = true;
            }
            if (this.userRole[5] === '59' || this.userRole[5] === '60' || this.userRole[5] === '73'
                || this.userRole[5] === '74') {
                this.isDevice = true;
                console.log('is device');
            }
            if (this.userRole[5] === '63') {
                this.isLearner = true;
            }
            if (this.userRole[5] === '64') {
                this.isTeacher = true;
            }
            if (this.userRole[5] === '65') {
                this.isParent = true;
            }
            if (roleCode >= 66 && roleCode <= 72) {
                this.isVAS = true;
            }
            if (roleCode <= 20 || (roleCode >= 58 && roleCode <= 60) || (roleCode >= 63 && roleCode <= 65) ||
                roleCode == 73 || roleCode == 74) {
                this.showPopUp();
            }
            if ((roleCode >= 18 && roleCode <= 20) || roleCode == 11) {
                this.isSchoolManagement = true;
                switch (roleCode) {
                    case 18:
                        this.isPrincipal = true;
                        break;
                    case 19:
                        this.isHOD = true;
                        break;
                    case 20:
                        this.isSGB = true;
                        break;
                    case 11:
                        this.isIT = true;
                        break;
                }
            }
        }
        this.roles = tempArry;
        ++this.level;
        return tempArry;
    };
    //Checking if the supplied role array matches any of the roles in the roles database and updating the userRole object
    RegisterPage.prototype.searchRole = function (arry) {
        var tempArr = this.user_role_svc.USER_ROLES;
        loop1: for (var row = 0; row < this.user_role_svc.USER_ROLES.length; ++row) {
            loop2: for (var col = 0; col < 5; ++col) {
                if (tempArr[row][col] != arry[col]) {
                    break loop2;
                }
                else if (col == 4 && tempArr[row][col] === arry[col]) {
                    this.userRole = tempArr[row];
                    break loop1;
                }
            }
        }
    };
    RegisterPage.prototype.caputureNewSchool = function () {
        this.schools_popup.create(SchoolDetailsPage).present();
    };
    //Reset the whole role system to its initial state
    RegisterPage.prototype.resetRole = function () {
        this.getUniqueRolesForColumn(0);
        this.userRole = ['null', 'null', 'null', 'null', 'null', 'null'];
        this.showSchoolPrompt = false;
        this.roleComplete = false;
        this.roleString = '';
        this.level = 0;
        this.newSchool = false;
        this.isLearner = false;
        this.isTeacher = false;
        this.isParent = false;
        this.isDevice = false;
        this.isVAS = false;
        this.isPrincipal = false;
        this.isSGB = false;
        this.isHOD = false;
        this.isSchoolManagement = false;
        this.isIT = false;
        this.isSupport = false;
        this.grade = '';
        this.subjects = [];
        this.child = this.object_init_svc.initializeChild();
        this.children = [];
    };
    //Add children to the parent object
    RegisterPage.prototype.addChild = function () {
        this.children.push(this.child);
        this.parent.children.push(this.child);
        this.childrenNames.push(this.child.firstname);
        this.child.firstname = '';
    };
    //Delete children from the parent object
    RegisterPage.prototype.deleteChild = function (nearby) {
        var index = this.childrenNames.indexOf(nearby);
        if (index !== -1) {
            this.childrenNames.splice(index, 1);
            this.children.splice(index, 1);
            this.parent.children.splice(index, 1);
        }
    };
    //Remove subject from array of current subjects
    RegisterPage.prototype.deleteSubject = function (nearby) {
        var index = this.subjects.indexOf(nearby);
        if (index !== -1) {
            this.subjects.splice(index, 1);
        }
    };
    //Upload user regristration to the online and offline database
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (this.isSupport) {
            this.support.type = 'support';
            this.support.profile = this.user;
            var fbRef = this.remote_sync.setSupport(this.support);
            this.support.profile.uid = fbRef.key;
            this.local_db.setUser(this.support)
                .then(function (support) {
                _this.remote_sync.updateUser(_this.support)
                    .then(function () {
                    _this.navCtrl.push(SupportHomePage);
                })
                    .catch(function (err) { return console.log(err); });
            })
                .catch(function (err) { return console.log(err); });
        }
        else if (this.isLearner) {
            this.learner.type = 'learner';
            this.learner.subjects = this.subjects;
            this.learner.profile = this.user;
            this.learner.grade = this.grade;
            this.learner.school_id = this.school.id;
            this.learner.school_name = this.school.name;
            this.learner.school_emblem = this.school.emblem;
            var fbRef_1 = this.remote_sync.setLearner(this.learner); //create learner on remote server and get the user id
            this.learner.profile.uid = fbRef_1.key; //update the id of the learners profile
            this.local_db.setLearner(this.learner).then(function (data) {
                _this.remote_sync.upateLearner(fbRef_1.key, _this.learner);
                _this.navCtrl.push(HomePage);
            })
                .catch(function (err) { return console.log(err); });
        }
        else if (this.isTeacher) {
            this.teacher.type = 'teacher';
            this.teacher.profile = this.user;
            this.teacher.school_id = this.school.id;
            this.teacher.school_name = this.school.name;
            this.teacher.school_emblem = this.school.emblem;
            this.teacher.subjects = this.subjects;
            var fbRef_2 = this.remote_sync.setTeacher(this.teacher);
            this.teacher.profile.uid = fbRef_2.key;
            this.local_db.setTeacher(this.teacher).then(function (data) {
                _this.remote_sync.updateTeacher(fbRef_2.key, _this.teacher);
                _this.navCtrl.push(HomePage);
            })
                .catch(function (err) { return console.log(err); });
        }
        else if (this.isSchoolManagement) {
            this.schoolManagement.profile = this.user;
            this.schoolManagement.school_id = this.school.id;
            this.schoolManagement.school_emblem = this.school.emblem;
            this.schoolManagement.school_name = this.school.name;
            if (this.isPrincipal) {
                this.schoolManagement.type = "principal";
            }
            else if (this.isHOD) {
                this.schoolManagement.type = "HOD";
            }
            else if (this.isSGB) {
                this.schoolManagement.type = "SGB";
            }
            else if (this.isIT) {
                this.schoolManagement.type = "IT Administrator";
            }
            var fbRef = this.remote_sync.setSchoolManagement(this.schoolManagement);
            this.schoolManagement.profile.uid = fbRef.key;
            this.local_db.setSchoolManagement(this.schoolManagement).then(function (data) {
                _this.remote_sync.updateSchoolManager(_this.schoolManagement.profile.uid, _this.schoolManagement);
                _this.navCtrl.push(HomePage);
            })
                .catch(function (err) { return console.log(err); });
        }
        else if (this.isParent) {
            this.parent.type = 'parent';
            this.parent.profile = this.user;
            this.parent.school_id = this.school.id;
            this.parent.school_name = this.school.name;
            this.parent.school_emblem = this.school.emblem;
            this.parent.children = this.children;
            var fbRef_3 = this.remote_sync.setParent(this.parent);
            this.parent.profile.uid = fbRef_3.key;
            this.local_db.setParent(this.parent).then(function (parent) {
                _this.remote_sync.updateParent(fbRef_3.key, _this.parent);
                _this.navCtrl.push(HomePage);
            })
                .catch(function (err) { return console.log(err); });
        }
        else if (this.newSchool) {
            this.school.profile = this.user;
            var fbRef_4 = this.remote_sync.setSchool(this.school);
            this.school.profile.uid = fbRef_4.key;
            this.local_db.setSchool(this.school).then(function (data) {
                _this.remote_sync.updateSchool(fbRef_4.key, _this.school);
                _this.navCtrl.push(SchoolPage);
            })
                .catch(function (err) { return console.log(err); });
        }
        else if (this.isVAS) {
            this.vas.type = 'VAS';
            this.vas.profile = this.user;
            this.vas.company_name = this.userRole[2];
            var fbRef_5 = this.remote_sync.setVAS(this.vas);
            this.vas.company_id = fbRef_5.key;
            this.vas.profile.uid = fbRef_5.key;
            this.local_db.setVAS(this.vas).then(function (data) {
                _this.remote_sync.updateVAS(fbRef_5.key, _this.vas);
                _this.navCtrl.push(ValueAddedServicesPage);
            })
                .catch(function (err) { return console.log(err); });
        }
        else if (this.isDevice) {
            this.navCtrl.push(DeviceRegisterPage, { school: { id: this.school.id, name: this.school.name }, user: this.user.role[1] })
                .catch(function (err) { return console.log(err); });
        }
        else {
            console.log('no role selected');
        }
        this.local_db.setSchool(this.school);
    };
    //Activate the file dialog when affidavit button is clicked
    RegisterPage.prototype.chooseAffidavit = function () {
        this.affidavitInput.nativeElement.click();
    };
    //Activate the file dialog when proof button is clicked
    RegisterPage.prototype.chooseProof = function () {
        this.proofInput.nativeElement.click();
    };
    //Show screen for entering school details (Name must be changed to avoid confusion)
    RegisterPage.prototype.showPopUp = function () {
        this.showSchoolPrompt = true;
    };
    //Check if a role is a decendant of the correct role family
    RegisterPage.prototype.isDecendant = function (arry1, arry2) {
        for (var i = 0; i <= this.level; ++i) {
            if (arry1[i] !== arry2[i])
                return false;
        }
        return true;
    };
    //Autocomplete for schools
    RegisterPage.prototype.school_autocomplete = function (event) {
        var _this = this;
        this.place_svc.getEstablishmentPredictionsSA(event.target.value, this.service).then(function (data) {
            _this.schoolPredictions = data;
        })
            .catch(function (err) { return console.log(err); });
    };
    //Select school from a list of schools 
    RegisterPage.prototype.selectSchool = function (school) {
        var _this = this;
        this.place_svc.geoGoder(school.description).then(function (data) {
            _this.searchTxt = data.description;
            _this.school.address.province = data.administrative_area_level_1_lng ? data.administrative_area_level_1_lng : _this.school.address.province;
            _this.school.address.lat = data.lat;
            _this.school.address.lng = data.lng;
            _this.school.address.postal_code = data.postal_code;
            _this.school.address.country = data.country_long;
            _this.school.id = data.place_id;
            _this.schoolPredictions = [];
            _this.schoolSelected = true;
        })
            .catch(function (err) { return console.log(err); });
    };
    //Unselect school as the name suggests
    RegisterPage.prototype.unselectSchool = function () {
        this.searchTxt = '';
        this.school.name = '';
        this.schoolPredictions = [];
        this.schoolSelected = false;
    };
    //Persist te current school details on the local database
    RegisterPage.prototype.done = function () {
        console.log('current school: ', this.school);
        return this.local_db.setSchool(this.school);
    };
    //Select an address from a  list
    RegisterPage.prototype.selectAddress = function (pred) {
        var _this = this;
        this.place_svc.geoGoder(pred.description).then(function (data) {
            _this.address = data;
            _this.user.residential_address.street_address = data.description;
            _this.user.residential_address.country = data.country_long;
            _this.user.residential_address.postal_code = data.postal_code;
            _this.user.residential_address.province = data.administrative_area_level_1_lng;
            _this.user.residential_address.city = data.locality_lng;
            _this.user.residential_address.lat = data.lat;
            _this.user.residential_address.lng = data.lng;
            _this.addPredictions = [];
        })
            .catch(function (err) { return console.log(err); });
    };
    //Get address predictions from the google places services
    RegisterPage.prototype.getPredictions = function (event) {
        var _this = this;
        this.place_svc.getAdressPredictionsSA(event.target.value, this.service).then(function (data) {
            _this.addPredictions = data;
        })
            .catch(function (err) { return console.log(err); });
    };
    //Autocomplete for subjects
    RegisterPage.prototype.subjectsAutocomplete = function () {
        this.subjectsArry = this.filtering_svc.autocomplete(this.user_role_svc.SUBJECTS, this.subjectField);
    };
    //Autocomplete for grades
    RegisterPage.prototype.gradesAutocomplete = function () {
        this.gradesArry = this.filtering_svc.autocomplete(this.user_role_svc.GRADES, this.grade);
    };
    __decorate([
        ViewChild('proof'),
        __metadata("design:type", ElementRef)
    ], RegisterPage.prototype, "proofInput", void 0);
    __decorate([
        ViewChild('affidavit'),
        __metadata("design:type", ElementRef)
    ], RegisterPage.prototype, "affidavitInput", void 0);
    __decorate([
        ViewChild('stepper'),
        __metadata("design:type", ElementRef)
    ], RegisterPage.prototype, "stepper", void 0);
    RegisterPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-register',
            templateUrl: 'register.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, UserRolesProvider,
            LocalDbProvider, FilteringProvider, ModalController,
            PlacesServiceProvider, ObjectInitializerProvider,
            RemoteSyncProvider, AlertController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.js.map