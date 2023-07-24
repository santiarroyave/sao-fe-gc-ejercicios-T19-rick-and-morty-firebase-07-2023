import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  // CONSTRUCTOR
  constructor(private userService: UserService, private router:Router){ }

  // METODOS
  ngOnInit(): void { };

  logout(){
    this.userService.logout()
    .then(() => {
      this.router.navigate(["/login"]);
    })
    .catch(error => console.log(error));
  }
}
