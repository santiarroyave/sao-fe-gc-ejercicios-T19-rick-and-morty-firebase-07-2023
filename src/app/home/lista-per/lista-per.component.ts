import { Component, OnInit } from '@angular/core';
import { PersonajesService } from 'src/app/services/personajes.service';
import { MisPersonajesService } from 'src/app/services/mis-personajes.service';
import { MisPersonajes } from 'src/app/models/mis-personajes.model';

@Component({
  selector: 'app-lista-per',
  templateUrl: './lista-per.component.html',
  styleUrls: ['./lista-per.component.css']
})

export class ListaPerComponent implements OnInit{

  // ATRIBUTOS
  maxPersonajes:number = 12;

  personajes:any = null;
  personaje:any = null;
  // misPersonajes: any = null;
  miPersonaje:any = null;
  ventanaCrear:any = false;

  misPersonajes?: MisPersonajes[];

  // CONSTRUCTORES
  constructor(private personajesService: PersonajesService, private misPersonajesService: MisPersonajesService){ };
  
  // MÉTODOS
  ngOnInit():void{
    this.personajesService.getPersonajes(this.maxPersonajes).subscribe( result => this.personajes = result);
    this.misPersonajesService.getPersonajes().subscribe (result => this.misPersonajes = result);
  };
  
  seleccionar(id:number){
    this.personajesService.getPersonajeId(id).subscribe( result => this.personaje = result);
  };
  
  editar(id:number){
    this.misPersonajesService.getPersonajeId(id).subscribe (result => this.miPersonaje = result);
  };
  
  agregar(){
    this.ventanaCrear = true;
  }
  
  eliminar(id:any){
    this.misPersonajesService.delete(id)
    .subscribe(
      response =>{
        console.log("Eliminado correctamente");
        console.log(response);
        // Esto actualiza la lista después de eliminarlo para que lo detecte el ngFor.

        // Manera 1 de actualizar la lista
        // this.misPersonajes = this.misPersonajes?.filter((personaje) => personaje.id !== id);

        // Manera 2 de actualizar la lista
        this.actualizarLista();
      },
      error => {
        console.log("Error al eliminar");
        console.log(error);
      }
    );
  }
  
  alCrear(dato:any){
    // Resetea la variable para ocultar la ventana.
    this.ventanaCrear = false;

    // Actualiza la lista
    if(dato==true){
      this.actualizarLista();  
    } 
  };

  alEditar(dato:any){
    this.miPersonaje = null;

    // Actualiza la lista
    if(dato==true){
      this.actualizarLista();  
    } 
  }

  actualizarLista() {
    this.misPersonajesService.getPersonajes().subscribe(result => this.misPersonajes = result);
  }

}
