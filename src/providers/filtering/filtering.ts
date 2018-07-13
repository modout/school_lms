//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}
