import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/usuarios';

  constructor(private httpClient: HttpClient) { }

  public añadirUsuario(user: any) {
    return this.httpClient.post(`${this.myAppUrl}${this.myApiUrl}/`, user);
  }

  getUsuario(id: number) {
    return this.httpClient.get(`${this.myAppUrl}${this.myApiUrl}/id/${id}`);
  }

  getUsuarios() {
    return this.httpClient.get(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteUsuario(id: number) {
    return this.httpClient.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  updateUsuario(id: number, usuario: any) {
    return this.httpClient.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, usuario);
  }
  
}
