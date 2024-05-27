import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../servicios/api/api.service'
import {Router} from '@angular/router'
import {ListadoProductosInterface} from '../../modelos/listadoproductos.interface'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  productos:ListadoProductosInterface[] = [];

  constructor(private api:ApiService, private router:Router) {   }


  ngOnInit(): void {
    this.api.getAllProductos().subscribe(data => {
      this.productos = data
    })
  }


  editarProducto(id:Number){
  this.router.navigate(['editar',id]);
  }

  nuevoProducto(){
    this.router.navigate(['agregar']);
  }
}
