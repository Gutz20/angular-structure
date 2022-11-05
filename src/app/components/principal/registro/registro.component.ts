import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _usuarioService: UsuarioService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  formSubmit() {
    const usuario: any = {
      username: this.form.value.username,
      password: this.form.value.password,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      telefono: this.form.value.telefono,
    };

    this._usuarioService.añadirUsuario(usuario).subscribe((data: any) => {
      // this._snackBar.open('Se ha registrado con exito', '', {
      //   duration: 3000,
      //   horizontalPosition: 'center',
      //   verticalPosition: 'bottom',
      // });
      // Swal.fire('Registro exitoso', 'Se ha registrado en el sistema', 'success');
      this.router.navigate(['/principal']);
    });
  }
}
