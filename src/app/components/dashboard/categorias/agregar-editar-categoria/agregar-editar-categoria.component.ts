import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-agregar-editar-categoria',
  templateUrl: './agregar-editar-categoria.component.html',
  styleUrls: ['./agregar-editar-categoria.component.css']
})
export class AgregarEditarCategoriaComponent implements OnInit {
  form: FormGroup;
  id: number;

  operacion: string = "Agregar";

  constructor(private fb: FormBuilder,
    private _categoriaService: CategoriaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) { 
      this.form = this.fb.group({
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required]
      })
      this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
    }

  ngOnInit(): void {

    if (this.id != 0) {
      this.operacion = "Editar";
      this.obtenerCategoria(this.id);
    }

  }

  obtenerCategoria(id: number) {
    this._categoriaService.getCategoria(id).subscribe((data: any) => {
      this.form.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion
      })
    })
  }

  agregarEditarCategoria() {
    const categoria: any = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion
    }

    if (this.id != 0) {
      categoria.categoriaId = this.id;
      this.editarCategoria(this.id, categoria);
    } else {
      this.agregarCategoria(categoria);
    }
  }

  editarCategoria(id: number, categoria: any) {
    this._categoriaService.updateCategoria(id, categoria).subscribe(() => {
      this.mensajeDeExito('editada')
      this.router.navigate(['/dashboard/categorias'])
    })
  }

  agregarCategoria(categoria: any) {
    this._categoriaService.addCategoria(categoria).subscribe((data: any) => {
      this.mensajeDeExito('registrado');
      this.router.navigate(['/dashboard/categorias'])
    })
  }

  mensajeDeExito(texto: string) {
    this._snackBar.open(`La categoria fue ${texto} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right'
    });
  }

}
