import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginData = {
    username: '',
    password: '',
  };

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  formSubmit() {
    this.loginData = {
      username: this.form.value.username,
      password: this.form.value.password,
    };

    this.loginService.generateToken(this.loginData).subscribe({
      next: (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe({
          next: (user: any) => {
            this.loginService.setUser(user);
            if (this.loginService.getUserRole() == 'ADMIN') {
              //dashboard admin
              this.router.navigate(['dashboard']);
              this._snackBar.open('Bienvenido admin', 'Aceptar', {
                duration: 3000,
              });
              this.loginService.loginStatusSubject.next(true);
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              //user principal
              this.router.navigate(['principal']);
              this._snackBar.open('Logeo exitoso', 'Aceptar', {
                duration: 3000,
              });
              this.loginService.loginStatusSubject.next(true);
            } else {
              this.router.navigate(['principal/login']);
            }
          },
          error: (e) => console.log(e),
        });
      },
      error: (e) => {
        console.log(e);
        this._snackBar.open(
          'Detalles inválidos , vuelva a intentar !!',
          'Aceptar',
          {
            duration: 3000,
          }
        );
      },
    });
  }

  error() {
    this._snackBar.open('Usuario o contraseña ingresados son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
