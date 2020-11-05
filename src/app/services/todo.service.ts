import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';
import {Observable} from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private urlEndPoint: string = 'http://localhost:8080/odilo/tests/2';

 private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

 constructor(private http: HttpClient) { }



 create(cliente: Todo) : Observable<Todo> {
   return this.http.post<Todo>(this.urlEndPoint, cliente, {headers: this.httpHeaders})
 }

 getTodoByUserId(userId: number): Observable<Todo[]>{
   return this.http.get<Todo[]>(`${this.urlEndPoint}/user/${userId}`)
 }

 getTodos(estado ? :string): Observable<Todo[]> {
     let params = new HttpParams();

     if (estado){
         params = params.append('estado', estado);
     }

   return this.http.get(this.urlEndPoint, {params : params}).pipe(
     map(response => response as Todo[])
   );
 }

 getTitulos(): Observable<string[]>{
     return this.http.get<string[]>(`${this.urlEndPoint}/titles`)
 }

 getEstadisticas(): Observable<any>{
     return this.http.get(`${this.urlEndPoint}/stats`)
 }


}
