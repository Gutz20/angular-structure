import { Categoria } from "./categoria.model";
import { FileHandle } from "./file-handle.model";

export interface Producto {
    productoId: number
    nombre: string,
    descripcion: string,
    precio: number,
    cantidad: number,
    categoria: Categoria,
    imagenes: FileHandle[]
}