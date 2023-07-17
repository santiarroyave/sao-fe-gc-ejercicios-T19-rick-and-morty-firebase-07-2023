import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pers',
  templateUrl: './pers.component.html',
  styleUrls: ['./pers.component.css']
})
export class PersComponent {
  @Input() personaje:any;

  cerrar(){
    this.personaje = null;
  }
}
