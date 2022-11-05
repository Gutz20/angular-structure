import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaService } from 'src/app/services/factura.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'observacion',
    'fecha',
    'usuario',
    'acciones'
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private facturaService: FacturaService) { }

  ngOnInit(): void {
    this.obtenerFacturas();
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

  obtenerFacturas() {
    this.facturaService.getFacturas().subscribe({
      next: (data: any) => {
        this.dataSource = data;
      }
    })
    // this._productoService
    //   .getProductos()
    //   .pipe(
    //     map((x: Producto[], i) => x.map((producto: Producto) => this.imageProcessingService.crearImagenes(producto)))
    //   )
    //   .subscribe((producto: any) => {
    //     this.dataSource.data = producto;
    //   });
  }


}
