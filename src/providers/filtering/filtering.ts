//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VAS } from '../../models/vas.interface';

@Injectable()
export class FilteringProvider {

  constructor(){
  }

  autocomplete(value: string[], search: string): string[]{
  	if(search === ''){
  		return [];
  	}else{
  		return value.filter(v =>{
	  		if(!v){
	  			return;
	  		}else{
	  			return v.toLowerCase().indexOf(search.toLowerCase()) !== -1	
	  		}
	  	})
  	}
  }

  supplierAutocomplete(value: VAS[], search: string): VAS[]{
      if(search === ''){
      return [];
    }else{
      return value.filter(v =>{
        if(!v){
          return;
        }else{
          return v.company_name.toLowerCase().indexOf(search.toLowerCase()) !== -1  
        }
      })
    }
  }

  userAutocomplete(value: any[], search: string): any[]{
    if(search === ''){
      return [];
    }else{
      return value.filter(v =>{
        if(!v){
          return;
        }else{
          return v.profile.firstname.toLowerCase().indexOf(search.toLowerCase()) !== -1  
        }
      })
    }
  }

  filterTeacherBySubject(value: any[], search: string): any[]{
      if(search === ''){
      return [];
    }else{
      return value.filter(v =>{
        if(!v){
          return;
        }else{
          return v.subjects.toLowerCase().indexOf(search.toLowerCase()) !== -1  
        }
      })
    }
  }

}
