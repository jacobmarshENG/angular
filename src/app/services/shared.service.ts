import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  ROOT = 'http://localhost:3000/';
  constructor(private http : HttpClient) { }

  postDataToService(_url, _body) {
    let response = _body ;
    //console.log('post: ' + this.ROOT + _url);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    try {
      response = this.http.post(this.ROOT + _url, _body, options);
    } catch (e) {
      console.log('Exception ApiService postDataToService ' + e);
    }
    return response;
  }

 getDataToService(_url) {
    let result = '';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    try {
     return this.http.get(this.ROOT + _url,options);
    } catch (e) {
      console.log('Exception ApiService postDataToService ' + e);
    }
  }

}
