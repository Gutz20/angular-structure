import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-ver-categoria',
  templateUrl: './ver-categoria.component.html',
  styleUrls: ['./ver-categoria.component.css']
})
export class VerCategoriaComponent implements OnInit {

  id!: number;
  categoria: any;

  // routeSub!: Subscription;

  constructor(private _categoriaService: CategoriaService,
    private aRoute: ActivatedRoute) { 
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerCategoria();
  }

  obtenerCategoria() {
    this._categoriaService.getCategoria(this.id).subscribe((data: any) => {
      this.categoria = data;
    })
  }

}
