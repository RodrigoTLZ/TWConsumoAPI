import { HttpClient, HttpHeaders} from '@angular/common/http';
import {ListadoProductosInterface} from '../../modelos/listadoproductos.interface'
import { Injectable } from '@angular/core';
import {ProductoInterface} from '../../modelos/producto.interface';
import { Observable } from 'rxjs';
import {ResponseI} from '../../modelos/response.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

url:string = "https://fakestoreapi.com/";

  constructor(private http:HttpClient) { }



  getAllProductos():Observable<ListadoProductosInterface[]>{
    let direccion = this.url + "products";
    return this.http.get<ListadoProductosInterface[]>(direccion);
  }

  getSingleProducto(id:Number):Observable<ProductoInterface>{
    let direccion = this.url + "products/" + id;
    return this.http.get<ProductoInterface>(direccion);
  }

  putProducto(producto: ProductoInterface): Observable<ProductoInterface> {
    const direccion = `${this.url}products/${producto.id}`;
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  
    return this.http.put<ProductoInterface>(direccion, producto, httpOptions);
  }


  deleteProducto(id: number): Observable<any> {
    const direccion = `${this.url}products/${id}`;
    return this.http.delete<any>(direccion);
  }

  postProducto(form:ProductoInterface):Observable<ResponseI>{
    let direccion = this.url + "products";
    return this.http.post<ResponseI>(direccion, form);
  }

  


}
