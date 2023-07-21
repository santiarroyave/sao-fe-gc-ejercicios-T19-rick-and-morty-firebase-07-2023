import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Componentes
import { HomeComponent } from './home/home.component';
import { NavComponent } from './home/nav/nav.component';
import { AboutComponent } from './home/about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ListaPerComponent } from './home/lista-per/lista-per.component';
import { PersComponent } from './home/lista-per/pers/pers.component';
import { EditarComponent } from './home/lista-per/editar/editar.component';
import { CrearComponent } from './home/lista-per/crear/crear.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    ListaPerComponent,
    PersComponent,
    EditarComponent,
    CrearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
