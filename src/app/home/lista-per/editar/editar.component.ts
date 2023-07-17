import { Component, Input } from '@angular/core';
import { MisPersonajesService } from 'src/app/services/mis-personajes.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent {
  @Input() personaje:any;
  @Output() persEditado:any = new EventEmitter;

  // En este caso no se usará el "model"

  // CONSTRUCTORES
  constructor(private misPersonajesService: MisPersonajesService){ };

  cerrar(){

    // Cerrar desde el componente hijo
    // this.personaje = null;

    // Cerrar desde el componente padre
    this.persEditado.emit(null);
  };

  guardar(){
    let data = {
      id: this.personaje.id,
      name: this.personaje.name,
      status: this.personaje.status,
      species: this.personaje.species,
      gender: this.personaje.gender,
      origin: this.personaje.origin,
      image: this.personaje.image
    };

    // Llama al servicio y actualiza el personaje
    this.misPersonajesService.update(this.personaje.id, data)
    .subscribe(
      response =>{
        console.log(response);
        console.log("Actualizado correctamente");
        // Avisa al componente padre que ya se ha guardado el personaje para que actualice la lista y cierre la ventana
        this.persEditado.emit(true);
      },
      error => {
        console.log(error);
      }
    );

    // Cerrar desde el componente hijo para que no se quede esperando la respuesta de la DB
    this.personaje = null;

  };
}
