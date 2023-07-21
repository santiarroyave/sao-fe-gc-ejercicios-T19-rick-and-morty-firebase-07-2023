import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // ATRIBUTOS
  formReg: FormGroup;

  // CONSTRUCTOR
  constructor(private userService:UserService, private router:Router){
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  // METODOS
  registrar(){
    this.userService.register(this.formReg.value)
    .then(response => {
      console.log(response);
      console.log("Registrado correctamente");
      this.router.navigate(["/login"]);
    })
    .catch(error => console.log(error));
  };
}
