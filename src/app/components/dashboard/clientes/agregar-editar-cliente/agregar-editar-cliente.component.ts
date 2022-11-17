import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agregar-editar-cliente',
  templateUrl: './agregar-editar-cliente.component.html',
  styleUrls: ['./agregar-editar-cliente.component.css'],
})
export class AgregarEditarClienteComponent implements OnInit {
  form: FormGroup;
  id: number;

  operacion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private _usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if (this.id != 0) {
      this.operacion = 'Editar';
      this.obtenerUsuario(this.id);
    }
  }

  obtenerUsuario(id: number) {
    this._usuarioService.getUsuario(id).subscribe((data: any) => {
      this.form.setValue({
        username: data.username,
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        password: data.password,
      });
    });
  }

  agregarEditarUsuario() {
    const usuario: any = {
      username: this.form.value.username,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      email: this.form.value.email,
      telefono: this.form.value.telefono,
      password: this.form.value.password,
    };

    if (this.id != 0) {
      usuario.usuarioId = this.id;
      this.editarUsuario(this.id, usuario);
    } else {
      this.agregarUsuario(usuario);
    }
  }

  editarUsuario(id: number, usuario: any) {
    this._usuarioService.updateUsuario(id, usuario).subscribe(() => {
      this.mensajeDeExito('editado');
      this.router.navigate(['/dashboard/clientes']);
    });
  }

  agregarUsuario(usuario: any) {
    this._usuarioService.añadirUsuario(usuario).subscribe((data: any) => {
      this.mensajeDeExito('registrado');
      this.router.navigate(['/dashboard/clientes']);
    });
  }

  mensajeDeExito(texto: string) {
    this._snackBar.open(`El usuario fue ${texto} con exito`, '', {
      duration: 4500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}
