import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css'],
})
export class VerUsuarioComponent implements OnInit {
  id!: number;
  usuario: any;

  constructor(
    private _usuarioService: UsuarioService,
    private aRoute: ActivatedRoute
  ) {
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario() {
    this._usuarioService.getUsuario(this.id).subscribe((data: any) => {
      this.usuario = data;
    })
  }
}
