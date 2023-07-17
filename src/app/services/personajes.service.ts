import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  constructor(private http: HttpClient) { };

  getPersonajes(cantidad:number){
    // Genera la cantidad de numeros aleatorios que le hayamos pasado como argumento
    return this.http.get(`https://rickandmortyapi.com/api/character/${this.numsRandoms(cantidad)}`);
  };

  getPersonajeId(id:number){
    return this.http.get(`https://rickandmortyapi.com/api/character/${id}`);
  };

  numsRandoms(cantidad:number):string{
    let min = 0;
    let max = 800;
    let listaNums = new Array(cantidad);

    for (let i = 0; i < listaNums.length; i++) {
      listaNums[i] = Math.floor(Math.random()*(max-min+1)+min);
    }
    return String(listaNums);
  }

}
