import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class JobService {
  private urlEndPoint: string = 'http://localhost:8080/odilo/tests/1';
 constructor(private http: HttpClient) { }

 getJobs(): Observable<any>{
     return this.http.get(this.urlEndPoint);
 }

 stopJobs(): Observable<string>{
     const options = {responseType: 'text' as 'json'};
     return this.http.post<string>(this.urlEndPoint,{}, options);
 }
 startJobs(): Observable<string>{
     const options = {responseType: 'text' as 'json'};
     return this.http.post<string>(`${this.urlEndPoint}/arrancarTareas`,{}, options);
 }
}
