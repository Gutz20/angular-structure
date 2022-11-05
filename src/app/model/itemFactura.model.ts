export interface ItemFactura {
    cantidad: number,
    precio: number,
    producto: {
        productoId: number
    }
}