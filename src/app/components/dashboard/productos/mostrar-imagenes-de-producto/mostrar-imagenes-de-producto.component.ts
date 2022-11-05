import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FileHandle } from 'src/app/model/file-handle.model';

@Component({
  selector: 'app-mostrar-imagenes-de-producto',
  templateUrl: './mostrar-imagenes-de-producto.component.html',
  styleUrls: ['./mostrar-imagenes-de-producto.component.css']
})
export class MostrarImagenesDeProductoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.recibirImagenes();
  }

  recibirImagenes() {
    console.log(this.data);
  }

}
