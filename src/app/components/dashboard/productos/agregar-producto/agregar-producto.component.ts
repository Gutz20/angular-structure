import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { FileHandle } from 'src/app/model/file-handle.model';
import { Producto } from 'src/app/model/producto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent implements OnInit {
  isNewProduct = true;

  listaCategorias: any[] = [];
  id: number;
  producto: Producto = {
    productoId: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    cantidad: 0,
    categoria: {
      nombre: '',
      descripcion: '',
    },
    imagenes: [],
  };
  form: FormGroup;
  operacion: string = 'Agregar';

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private _categoriaService: CategoriaService,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoria: ['', Validators.required],
    });
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this._categoriaService
      .getCategorias()
      .subscribe((response: any) => (this.listaCategorias = response.content));

    if (this.id != 0) {
      this.operacion = 'Editar';
      this.isNewProduct = false;
      this.obtenerProducto(this.id);
    }
  }

  obtenerProducto(id: number) {
    this.productoService.getProductoById(id)
    .pipe(
      map(p => this.imageProcessingService.crearImagenes(p)))
    .subscribe((data: any) => {
      this.form.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        cantidad: data.cantidad,
        categoria: data.categoria,
      });
      this.producto.imagenes = data.imagenes
    });
  }

  agregarEditarProducto() {
    this.producto.nombre = this.form.value.nombre;
    this.producto.descripcion = this.form.value.descripcion;
    this.producto.precio = this.form.value.precio;
    this.producto.cantidad = this.form.value.cantidad;
    this.producto.categoria = this.form.value.categoria;

    const productoFormData = this.prepareFormData(this.producto);
    console.log(productoFormData);
    if (this.isNewProduct) {

      this.agregarProducto(productoFormData);
    } else {
      this.editarProducto(this.id, productoFormData);
    }
  }

  agregarProducto(producto: FormData) {
    this.productoService.addProducto(producto).subscribe({
      next: (data: any) => {
        this.mensajeDeExito('registrado');
        this.form.setValue({
          nombre: '',
          descripcion: '',
          cantidad: '',
          precio: '',
          categoria: '',
        });
        this.producto.imagenes = [];
      },
      error: (e: any) => {
        this._snackBar.open(`Asegurese de llenar todos los campos`, '', {
          duration: 4500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
    })
  }

  editarProducto(id: number, producto: FormData) {
    this.productoService.updateProducto(id, producto).subscribe({
      next: (data: any) => {
        this.mensajeDeExito('editado');
        this.router.navigate(['/dashboard/productos']);
      },
      error: (e: any) => {
        this._snackBar.open('El producto tiene que tener todos los campos y al menos 1 imagen', '😐', {
          duration: 4500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
      }
    })

  }

  mensajeDeExito(texto: string) {
    this._snackBar.open(`El producto fue ${texto} con exito`, '', {
      duration: 4500,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };

      this.producto.imagenes.push(fileHandle);
    }
  }

  prepareFormData(producto: any): FormData {
    const formData = new FormData();
    formData.append(
      'producto',
      new Blob([JSON.stringify(producto)], { type: 'application/json' })
    );

    console.log(this.producto.imagenes);
    for (let i = 0; i < this.producto.imagenes.length; i++) {
      formData.append(
        'imageFile',
        producto.imagenes[i].file,
        producto.imagenes[i].file.name
      );
    }

    return formData;
  }

  removerImagen(i: number) {
    this.producto.imagenes.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.producto.imagenes.push(fileHandle);
  }
}
