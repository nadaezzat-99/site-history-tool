import { Injectable } from '@angular/core';
import { site } from '../types/site.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SiteInfoService {
  
  constructor(private http:HttpClient) { 
  }


  getAll() {
    return this.http.get('/api/sites')
      .subscribe(sites => {
        console.log(sites)
      })
  }

  getSiteData(selectedSite:string|Event):Observable<any>{
    return this.http.post("/api/sites/",{
      site_id:selectedSite
    },
    {
      headers:{
        'content-type': 'application/json',
        'Access-Control-Allow-Origin':'*',
        'Authorization':""
      }
    }
    )
    // return this.sites.filter(site =>  site.site_id === selectedSite)[0];
  }
}
