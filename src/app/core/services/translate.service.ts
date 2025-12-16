import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  // injection service HttpClient to use apis
  private readonly _HttpClient = inject(HttpClient) ;






  // get languages from api
  getLanguages():Observable<any> {

    return this._HttpClient.get(`${environment.baseUrl}/languages` ) ;
  }


//  to translate text
  translate(translateInfo:object):Observable<any> {

    return this._HttpClient.post(`${environment.baseUrl}/translate` ,  translateInfo );
  }



}
