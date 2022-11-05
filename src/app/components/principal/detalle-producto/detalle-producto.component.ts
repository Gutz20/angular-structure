import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/model/producto.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  id: number;
  producto!: Producto;
  indiceProductoSeleccionado = 0;
  subTotal!: number;

  constructor(
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private imageProcessingService: ImageProcessingService,
    private snackBar: MatSnackBar
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerProducto(this.id);
  }

  obtenerProducto(id: number) {
    this.productoService
      .getProductoById(id)
      .pipe(map((p) => this.imageProcessingService.crearImagenes(p)))
      .subscribe({
        next: (data: any) => {
          this.producto = data;
        },
        error: (e: any) => {
          console.log(e);
        },
      });
  }

  cambiarIndice(indice: number) {
    this.indiceProductoSeleccionado = indice;
  }

  addToCart(producto: any) {
    if (!this.productoService.productInCart(producto)) {
      producto.cantidad = 1;
      this.productoService.addToCart(producto);
      // this.productosCarrito = [...this.productoService.getProductsCart()];
      this.subTotal = producto.precio;
      this.mensaje('El producto se añadio al carrito', '😎');
    } else {
      this.mensaje('El producto ya fue añadido al carrito', '👀');
    }
  }

  mensaje(texto: any, icono: any) {
    this.snackBar.open(`${texto}`, `${icono}`, {
      duration: 4000,
      horizontalPosition: 'center',
    });
  }
}
