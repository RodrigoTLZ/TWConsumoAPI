import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {ProductoInterface} from '../../modelos/producto.interface'
import {ApiService} from '../../servicios/api/api.service'
import {FormGroup, FormControl, Validator} from '@angular/forms'
import {ResponseI} from '../../modelos/response.interface'
import {AlertasService} from '../../servicios/alertas/alertas.service'

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit{

constructor(private activerouter:ActivatedRoute, private router:Router, private api:ApiService, private alerta: AlertasService){}


datosProducto:ProductoInterface = {} as ProductoInterface;

editarForm = new FormGroup({
  title: new FormControl(''),
  price: new FormControl(''),
  description: new FormControl(''),
  image: new FormControl(''),
});

  ngOnInit(): void {
    let productoid = this.activerouter.snapshot.paramMap.get('id');
    let idNumber = Number(productoid);
    this.api.getSingleProducto(idNumber).subscribe((data:ProductoInterface) => {
      this.datosProducto = data;
      
      this.editarForm.setValue({
        'title':this.datosProducto.title,
        'price':this.datosProducto.price.toString(),
        'image':this.datosProducto.image,
        'description':this.datosProducto.description
      });
    });
  }

  postForm() {
    const formValue = this.editarForm.value;
  
    const formWithId: ProductoInterface = {
      id: this.datosProducto.id,
      title: formValue.title || '',
      price: formValue.price ? Number(formValue.price) : 0,
      description: formValue.description || '',
      image: formValue.image || ''
    };
  
    this.api.putProducto(formWithId).subscribe(editedProduct => {
      this.alerta.showExtioso('Producto modificado', 'Producto modificados con exito.')
    }, error => {
      this.alerta.showError('Ha ocurrido un problema', 'Verifique haber escrito los datos correctamente.')
    });
  }

  eliminar(id: number): void {
    this.api.deleteProducto(id).subscribe(response => {
      this.alerta.showExtioso('Producto eliminado', 'El producto ha sido eliminado.')
    }, error => {
      this.alerta.showExtioso('Ha ocurrido un problema', 'Consulte con un supervisor para mas detalles..')
    });
  }

  regresar(){
    this.router.navigate(['inicio']);
  }
  

}
