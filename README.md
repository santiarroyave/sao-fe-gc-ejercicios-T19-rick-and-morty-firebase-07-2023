# T19 - Rick And Morty Firebase

## Apuntes
### Firebase
1. Crear un proyecto en la web de Firebase
2. Asignamos métodos de autentificación
3. Instalación
    - `npm install -g firebase-tools`
    - `npm install -save firebase @angular/fire`
4. Firebase login
    - `firebase login`
5. Add Firebase project
    - `ng add @angular/fire`
        - Seleccionar el proyecto que habiamos creado antes
        - Elegir solo la opcion Authentication para configurar
    - Se deberia crear automáticamente un archivo en *environments/environment.ts*
    - Si sale todo bien no hace falta configurar nada mas en angular.json

    - En **app.module.ts**:
        ```ts
        import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
        import { environment } from '../environments/environment';
        import { provideAuth, getAuth } from '@angular/fire/auth';
        import { ReactiveFormsModule } from '@angular/forms';
        ```
        ```ts
        imports: [
            // ... ,
            ReactiveFormsModule,
            provideFirebaseApp(() => initializeApp(environment.firebase)),
            provideAuth(() => getAuth())
        ],
        // ...
        ```
6. Crear los servicios y componentes
    - Componentes "login/register/home"
    - Servicio user: `ng g s services/user`
    - En **user.service.ts**
        ```ts
        import { Injectable } from '@angular/core';
        import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

        @Injectable({
        providedIn: 'root'
        })
        export class UserService {

            constructor(private auth: Auth) { };

            register({email, password}: any){
                return createUserWithEmailAndPassword(this.auth, email, password);
            };

            login({email, password}: any){
                return signInWithEmailAndPassword(this.auth, email, password);
            };

            loginWithGoogle(){
                return signInWithPopup(this.auth, new GoogleAuthProvider());
            };

            logout(){
                return signOut(this.auth);
            };
            
        }
        ```
    - En **register.component.html**

      Nota importante: Usar el **ReactiveFormsModule** como se muestra abajo, porque si se usa el *FormsModule: ([ngModel])* da errores en firebase.

      PD: Puede ser que no le haya pasado el objeto correctamente. Pendiente de revisión para confirmar.
        ```html
        <form [formGroup]="formReg" (ngSubmit)="registrar()">
            <div>
                <input type="email" formControlName="email">
            </div>
            <div>
                <input type="password"formControlName="password">
            </div>
            <div>
                <button type="submit">Registrarse</button>
            </div>
        </form>
        ```
    - En **register.component.ts**
        ```ts
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
        ```

    - En **login.component.html**
        ```html
        <form formGroup="formLogin" (ngSubmit)="onSubmit()">
            <div>
                <input type="email" formControlName="email">
            </div>
            <div>
                <input type="password" formControlName="password">
            </div>
            <div>
                <button type="submit">Iniciar sesión</button>
            </div>
        </form>
            <div>
                <button (click)="iniciarGoogle()">Iniciar sesión con Google</button>
            </div>
        ```
    - En **login.component.ts**
        ```ts
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
        ```
    - En **nav.component.html**
        ```html
            <button class="btn btn-outline-danger me-2" (click)="logout()">Logout</button>
        ```

    - En **nav.component.ts**
        ```ts
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
        ```





## Documentación de Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
