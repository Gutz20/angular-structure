import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/model/producto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductoService } from 'src/app/services/producto.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Producto> | undefined;
  count = '12';
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  @Output() columnsCountChange = new EventEmitter<number>();
  sort = 'descendente';
  itemsShowCount = 12;

  panelOpenState = false;
  productos!: Producto[];
  productosCarrito: any[] = [];
  subTotal!: number;
  categorias: any[] = [];
  public page!: number;

  constructor(
    private productoService: ProductoService,
    private imageProcessingService: ImageProcessingService,
    private snackBar: MatSnackBar,
    private categoriasService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCategorias();
  }

  obtenerCategorias() {
    this.categoriasService.getCategorias().subscribe({
      next: (data: any) => {
        this.categorias = data.content;
      },
    });
  }

  obtenerProductos() {
    this.productoService
      .getProductos()
      .pipe(
        map((x: Producto[], i) =>
          x.map((producto: Producto) =>
            this.imageProcessingService.crearImagenes(producto)
          )
        )
      )
      .subscribe((producto: any) => {
        this.productos = producto;
      });
  }

  findProductsByCategoria(idCategoria: number) {
    this.productoService
      .getProductosByCategoria(idCategoria)
      .pipe(
        map((x: Producto[], i) =>
          x.map((producto: Producto) =>
            this.imageProcessingService.crearImagenes(producto)
          )
        )
      )
      .subscribe({
        next: (data: any) => {
          this.productos = data;
        },
      });
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

  //Cambiar el monto de subtotal | esto iria en carrito : borrar(optional)
  cambiarMontoDelSubtotal(producto: any, index: any) {
    const qty = producto.cantidad;
    const amt = producto.precio;

    this.subTotal = amt * qty;

    this.productoService.saveCart();
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }

  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.obtenerProductos();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.obtenerProductos();
  }

  onAddToCart(product: any): void {
    this.productoService.addToCart(product);
  }
}
