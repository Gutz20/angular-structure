import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../model/producto.model';
import { of } from 'rxjs';
import { Mail } from '../model/mail.model';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/mail';

  constructor(private http: HttpClient) {}

  sendMailSimple(mail: any, tipo: string) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(mail);

    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body, {
      headers: headers,
      params: {tipo: tipo},
    });
  }

  sendMailFactura(mail: any, tipo: string, id: number) {
    const headers = {'content-type': 'application/json'};
    const body = JSON.stringify(mail);

    console.log(id);
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}`, body, {
      headers: headers,
      params: {
        tipo: tipo,
        "ID": id
      },
    });
  }
}
