import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Producto } from 'src/app/model/producto.model';
import { ImageProcessingService } from 'src/app/services/image-processing.service';
import { ProductoService } from 'src/app/services/producto.service';
import { MostrarImagenesDeProductoComponent } from './mostrar-imagenes-de-producto/mostrar-imagenes-de-producto.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'precio',
    'cantidad',
    'categoria',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _productoService: ProductoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  obtenerProductos() {
    this._productoService
      .getProductos()
      .pipe(
        map((x: Producto[], i) => x.map((producto: Producto) => this.imageProcessingService.crearImagenes(producto)))
      )
      .subscribe((producto: any) => {
        this.dataSource.data = producto;
      });
  }

  eliminarProducto(productoId: number) {
    this._productoService.deleteProducto(productoId).subscribe(() => {
      this.mensajeDeExito('eliminado');
      this.obtenerProductos();
    });
  }

  mensajeDeExito(texto: string) {
    this._snackBar.open(`El producto fue ${texto} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

  mostrarImagenes(producto: Producto) {
    console.log(producto);
    this.dialog.open(MostrarImagenesDeProductoComponent, {
      data: {
        imagenes: producto.imagenes
      },
      height: '500px',
      width: '800px',
    });
  }

}
