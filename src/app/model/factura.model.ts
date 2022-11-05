import { ItemFactura } from "./itemFactura.model";

export interface Factura {
  observacion: string;
  usuario: {
    id: number;
  };
  itemFacturas: ItemFactura[];
}
