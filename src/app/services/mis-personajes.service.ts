import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MisPersonajes } from '../models/mis-personajes.model';
import { Observable } from 'rxjs';

const baseUrl = "http://localhost:3000/characters/";

@Injectable({
  providedIn: 'root'
})
export class MisPersonajesService {

  constructor(private http: HttpClient) { };

  getPersonajes():Observable<MisPersonajes[]>{
    return this.http.get<MisPersonajes[]>(baseUrl);
  };

  getPersonajeId(id:number){
    return this.http.get(baseUrl+id);
  };
  
  create(data:any):Observable<any>{
    return this.http.post(baseUrl,data);
  };
  
  update(id:any, data:any):Observable<any>{
    return this.http.put(`${baseUrl}/${id}`,data);
  };

  delete(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}/${id}`);
  };
  
  deleteAll():Observable<any>{
    return this.http.delete(baseUrl);
  };

  findByName(name:any):Observable<MisPersonajes[]>{
    return this.http.get<MisPersonajes[]>(`${baseUrl}?name=${name}`);
  };

}

// Notas
// Investigar más sobre los models