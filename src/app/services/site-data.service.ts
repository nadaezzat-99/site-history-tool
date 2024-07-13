import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { delay, throwError } from 'rxjs';
import { site } from '../types/site.interface';


@Injectable({
  providedIn: 'root'
})
export class SiteDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    
     const  sites =  [
        {site_id:"1723", region:"Giza",option:"C",site_type:"Roof Top", structure_type:"RT Poles", map:"https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;coord=52.70967533219885, -8.020019531250002&amp;q=1%20Grafton%20Street%2C%20Dublin%2C%20Ireland&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;&output=embed", structure_height:null},
        {site_id:"1724", region:"Giza",option:"C",site_type:"Roof Top", structure_type:"RT Poles",map:"", structure_height:"10"},
        {site_id:"1725", region:"Giza",option:"C",site_type:"Roof Top", structure_type:"RT Poles", map:"", structure_height:"10"},
        {site_id:"1726", region:"Giza",option:"C",site_type:"Roof Top", structure_type:"RT Poles", map:"", structure_height:"10"}
      ]
      const files = [
        {
          lastModified: 1720895044448,
          lastModifiedDate: "Sat Jul 13 2024 21:24:04 GMT+0300 (Eastern European Summer Time)" ,
          name: "new.xlsx",
          size: 6646,
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          webkitRelativePath: "",
          id:1
        }
      ]
     return {sites, files};
  }

  post(reqInfo: RequestInfo) {    
    if (reqInfo.collectionName === 'sites') {      
      return this.get_selected_site(reqInfo);
    }
    return undefined;
  }

  get_selected_site(reqInfo: RequestInfo){

    let response: ResponseOptions;    

    // Simulate internal server error 
    if (Math.random() < 0.1) {
          return throwError({ status: 500, error: 'Internal Server Error' }).pipe(delay(500));
      }
    else if (Math.random() < 0.2) { 
        return throwError({ status: 0, error: 'Network Error' }).pipe(delay(500));
      }
    
    const { collection, headers, url } = reqInfo;
    const body = reqInfo.utils.getJsonBody(reqInfo.req);
    const existingSite = collection.find((site_info:site) => site_info.site_id === body.site_id);
    
    if (existingSite) {
    
      let data = {
        "site_general_info":{
          "site_id": existingSite.site_id,
          "option": existingSite.option,
          "region": existingSite.region,
          "structure_type": existingSite.structure_type,
          "site_type": existingSite.site_type,
          "structure_height": existingSite.structure_height,
        },
        "map":existingSite.map
      }

      response = {
        body: { data },
        status: 200,
        headers: headers,
        url: url
      };
    } else {
      response = {
        status: 404,
        headers: headers,
        url: url,
        body: { error: 'Site not found' }
      };
    }     
    return reqInfo.utils.createResponse$(() => response);
  }


}

