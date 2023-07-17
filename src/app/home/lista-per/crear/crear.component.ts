import { Component, Input } from '@angular/core';
import { MisPersonajes } from 'src/app/models/mis-personajes.model';
import { MisPersonajesService } from 'src/app/services/mis-personajes.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent{

  // ATRIBUTOS
  @Input() abierto:any;
  @Output() persCreado:any = new EventEmitter;

  personaje: MisPersonajes = {
    id: 0,
    name: "",
    status:"",
    species:"",
    gender:"",
    origin:"",
    image:"",
  };

  // CONSTRUCTORES
  constructor(private misPersonajesService: MisPersonajesService){ };

  // METODOS
  cerrar(){
    // Hay que avisar al elemento padre para que cierre la ventana. Si se hace desde aqui daria problemas para volverla a abrir.
    this.persCreado.emit(false);
  };

  crear():void{
    let data = {
      id: this.personaje.id,
      name: this.personaje.name,
      status: this.personaje.status,
      species: this.personaje.species,
      gender: this.personaje.gender,
      origin: this.personaje.origin,
      image: this.personaje.image
    };

    // Llama al servicio y crea el nuevo personaje
    this.misPersonajesService.create(data)
    .subscribe(
      response =>{
        console.log(response);
        console.log("Creado correctamente");
        // Avisar al componente padre que ya se ha creado el personaje para que actualice la lista y cierre la ventana
        this.persCreado.emit(true);
      },
      error => {
        console.log(error);
        alert("Parece que no se ha podido contactar con la base de datos");
        this.persCreado.emit(false);
      }
    );

    // Aunque la ventana se cierra desde el componente padre, se puede cerrar desde aqui para evitar esperar mientras se hace la petición a la DB
    this.abierto = false;

    // Resetear datos del formulario
    this.personaje = {
      id: "",
      name: "",
      status: "",
      species: "",
      gender: "",
      origin: "",
      image: ""
    };
  }
  
}
