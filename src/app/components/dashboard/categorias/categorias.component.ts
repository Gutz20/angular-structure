import { ReportesService } from './../../../services/reportes.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from 'src/app/services/categoria.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _categoriaService: CategoriaService,
    private _snackBar: MatSnackBar,
    private reporteService: ReportesService
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
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

  obtenerCategorias() {
    this._categoriaService.getCategorias().subscribe((categorias: any) => {
      this.dataSource.data = categorias.content;
    });
  }

  eliminarCategoria(categoriaId: number) {
    this._categoriaService.deleteCategoria(categoriaId).subscribe(() => {
      this.mensajeDeExito('eliminada');
      this.obtenerCategorias();
    });
  }

  mensajeDeExito(texto: string) {
    this._snackBar.open(`La categoria fue ${texto} con exito`, '', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

  generarPDF() {
    let date: Date = new Date();
    let formateado = formatDate(date, 'dd-MM-yyyy', 'en-ES');
    const archivo = 'Categorias';
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
    const archivo = 'Categorias';
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
}
