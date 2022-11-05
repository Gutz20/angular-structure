import { FacturaService } from 'src/app/services/factura.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css'],
})
export class OrdenesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'observacion', 'fecha', 'acciones'];
  dataSource = new MatTableDataSource();
  user: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private facturaService: FacturaService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as any || []);
    this.obtenerFacturaPorUsuario(this.user.id);
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

  obtenerFacturaPorUsuario(idUsuario: number) {
    this.facturaService.getFacturaByIdUser(idUsuario).subscribe({
      next: (data: any) => {
        
        this.dataSource.data = data;
        console.log(this.dataSource.data);
      }
    })
  }
}
