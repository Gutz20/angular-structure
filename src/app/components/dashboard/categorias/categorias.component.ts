import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion','acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _categoriaService: CategoriaService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0) {
      this.paginator._intl.itemsPerPageLabel = 'Items por pagina'
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
      this.dataSource.data = categorias.content
    });
  }

  eliminarCategoria(categoriaId: number) {
    this._categoriaService.deleteCategoria(categoriaId).subscribe(() => {
      this.mensajeDeExito("eliminada");
      this.obtenerCategorias();
    });
  }

  mensajeDeExito(texto: string) {
    this._snackBar.open(`La categoria fue ${texto} con exito`,'', {
      duration: 4000,
      horizontalPosition: 'right',
    });
  }

}
