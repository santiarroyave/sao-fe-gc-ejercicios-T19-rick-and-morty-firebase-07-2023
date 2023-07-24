import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListaPerComponent } from './home/lista-per/lista-per.component';
import { PersComponent } from './home/lista-per/pers/pers.component';
import { canActivate, redirectUnauthorizedTo } from "@angular/fire/auth-guard";

const routes: Routes = [
  {path:"home", component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(["/login"]))},
  {path:"about", component: AboutComponent, ...canActivate(() => redirectUnauthorizedTo(["/login"]))},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"lista-personajes", component: ListaPerComponent, ...canActivate(() => redirectUnauthorizedTo(["/login"]))},
  {path:"lista-personajes/personaje", component: PersComponent, ...canActivate(() => redirectUnauthorizedTo(["/login"]))},
  {path:"", redirectTo: "/home", pathMatch:"full"},
  {path:"**", component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(["/login"]))}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
