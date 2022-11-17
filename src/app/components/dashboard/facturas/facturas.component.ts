import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FacturaService } from 'src/app/services/factura.service';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'observacion',
    'fecha',
    'usuario',
    'acciones',
  ];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private facturaService: FacturaService,
    private reporteService: ReportesService
  ) {}

  ngOnInit(): void {
    this.obtenerFacturas();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        this.dataSource.data = data;
      },
    });
  }

  generarPDF() {
    let date: Date = new Date();
    let formateado = formatDate(date, 'dd-MM-yyyy', 'en-ES');
    const archivo = 'Ventas';
    const tipo = 'PDF';

    this.reporteService.generarReporte(archivo, tipo).subscribe({
      next: (data: any) => {
        console.log(data);
        //let fileName = data.headers.get('content-disposition')?.split(';')[1].split('=')[1]; // Obtiene el nombre del archivo de la API pero no estamos enviandolo
        let blob: Blob = data.body as Blob;
        let a = document.createElement('a');
        //a.download = fileName;
        a.download = 'Reporte ' + archivo + ' - ' + formateado;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  generarExcel() {
    let date: Date = new Date();
    let formateado = formatDate(date, 'dd-MM-yyyy', 'en-ES');
    const archivo = 'Ventas';
    const tipo = 'EXCEL';
    this.reporteService.generarReporte(archivo, tipo).subscribe({
      next: (data: any) => {
        console.log(data);
        //let fileName = data.headers.get('content-disposition')?.split(';')[1].split('=')[1]; // Obtiene el nombre del archivo de la API pero no estamos enviandolo
        let blob: Blob = data.body as Blob;
        let a = document.createElement('a');
        //a.download = fileName;
        a.download = 'Reporte ' + archivo + ' - ' + formateado;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  generarPDFDeFactura(id: number) {
    let date: Date = new Date();
    let formateado = formatDate(date, 'dd-MM-yyyy', 'en-ES');
    const archivo = 'Factura';
    const tipo = 'PDF';
    this.reporteService.generarReporteFactura(archivo, tipo, id).subscribe({
      next: (data: any) => {
        console.log(data);
        //let fileName = data.headers.get('content-disposition')?.split(';')[1].split('=')[1]; // Obtiene el nombre del archivo de la API pero no estamos enviandolo
        let blob: Blob = data.body as Blob;
        let a = document.createElement('a');
        //a.download = fileName;
        a.download = 'Reporte ' + archivo + ' - ' + formateado;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  generarExcelDeFactura(id: number) {
    let date: Date = new Date();
    let formateado = formatDate(date, 'dd-MM-yyyy', 'en-ES');
    const archivo = 'Factura';
    const tipo = 'EXCEL';
    this.reporteService.generarReporteFactura(archivo, tipo, id).subscribe({
      next: (data: any) => {
        console.log(data);
        //let fileName = data.headers.get('content-disposition')?.split(';')[1].split('=')[1]; // Obtiene el nombre del archivo de la API pero no estamos enviandolo
        let blob: Blob = data.body as Blob;
        let a = document.createElement('a');
        //a.download = fileName;
        a.download = 'Reporte ' + archivo + ' - ' + formateado;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
