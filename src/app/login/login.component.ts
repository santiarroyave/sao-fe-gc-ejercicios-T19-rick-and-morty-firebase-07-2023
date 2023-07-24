import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  // ATRIBUTOS
  formLogin: FormGroup;

  // CONSTRUCTOR
  constructor(private userService: UserService, private router: Router){
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit():void{ }

  // METODOS
  onSubmit(){
    this.userService.login(this.formLogin.value)
    .then(response => {
      console.log(response);
      this.router.navigate(["home"]);
    })
    .catch(error => {
      console.log(error);
      alert("Error al iniciar sesión");
    });
  }
  
  iniciarGoogle(){
    this.userService.loginWithGoogle()
    .then(response => {
      console.log(response);
      this.router.navigate(["home"]);
    })
    .catch(error => console.log(error));
    alert("Error al iniciar sesión con Google");
  }
}
