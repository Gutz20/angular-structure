import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { Factura } from 'src/app/model/factura.model';
import { ItemFactura } from 'src/app/model/itemFactura.model';
import { FacturaService } from 'src/app/services/factura.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;
  showSuccess!: any;
  totalCarrito!: any;
  datosPago: any;
  usuario: any;
  productos!: any;
  itemFactura!: ItemFactura;
  itemsFacturas: ItemFactura[] = [];
  factura: Factura = {
    observacion: '',
    usuario: {
      id: 0,
    },
    itemFacturas: [
      {
        cantidad: 0,
        precio: 0,
        producto: {
          productoId: 0,
        },
      },
    ],
  };

  constructor(private router: Router, private facturaService: FacturaService) {}

  ngOnInit() {
    this.initConfig();
    this.totalCarrito =
      JSON.parse(localStorage.getItem('total_carrito') as any) || [];
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: `${environment.Client_ID}`,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'EUR',
                value: `${this.totalCarrito}`,
                breakdown: {
                  item_total: {
                    currency_code: 'EUR',
                    value: `${this.totalCarrito}`,
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'EUR',
                    value: `${this.totalCarrito}`,
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        if (data.status === 'COMPLETED') {
          this.datosPago = data;
          localStorage.setItem('pago', JSON.stringify(this.datosPago));
          this.crearFactura();
          this.router.navigate(['/principal/success']);
          // this.facturaService.crearFactura()
        }
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: (err) => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  crearFactura() {
    this.usuario = JSON.parse((localStorage.getItem('user') as any) || []);
    this.productos = JSON.parse(
      (localStorage.getItem('items_carrito') as any) || []
    );

    for (let i = 0; i < this.productos.length; i++) {
      this.itemFactura = {
        cantidad: this.productos[i].cantidad,
        precio: this.productos[i].precio,
        producto: {
          productoId: this.productos[i].productoId
        }
      }
      this.itemsFacturas.push(this.itemFactura);
    }
      
    this.factura.observacion = 'prueba';
    this.factura.usuario.id = this.usuario.id;
    this.factura.itemFacturas = this.itemsFacturas

    this.facturaService.crearFactura(this.factura).subscribe({
      next: (data: any) => {
        console.log(data);
      }
    })
  }
}
