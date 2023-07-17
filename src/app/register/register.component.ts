import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // ATRIBUTOS
  email= "";
  password="";

  // CONSTRUCTOR
  constructor(private userService:UserService, private router:Router){

  }

  registrar(){
    alert("Registrando");

    let registro = [
      {
        email:this.email, 
        password:this.password
      }
    ];

    this.userService.register(registro).then(response => {
      console.log(response);
      this.router.navigate(["/login"]);
    })
    .catch(error => console.log(error));
  };
}
