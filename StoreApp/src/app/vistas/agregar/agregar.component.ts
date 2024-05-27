import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validator} from '@angular/forms'
import {ResponseI} from '../../modelos/response.interface'
import {ProductoInterface} from '../../modelos/producto.interface'
import {AlertasService} from '../../servicios/alertas/alertas.service'
import {ApiService} from '../../servicios/api/api.service'
import {Router, ActivatedRoute} from '@angular/router'



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrl: './agregar.component.css'
})
export class AgregarComponent implements OnInit{

  datosProducto:ProductoInterface = {} as ProductoInterface;

agregarForm = new FormGroup({
  title: new FormControl(''),
  price: new FormControl(''),
  description: new FormControl(''),
  image: new FormControl(''),
});
constructor(private router:Router, private api:ApiService, private alerta: AlertasService){}

ngOnInit(): void {
  
}

postForm(){
const formValue = this.agregarForm.value;
const formWithId: ProductoInterface = {
  id: Math.floor(Math.random() * (200 + 1)),
  title: formValue.title || '',
  price: formValue.price ? Number(formValue.price) : 0,
  description: formValue.description || '',
  image: formValue.image || ''
};
console.log(formWithId);

 this.api.postProducto(formWithId).subscribe(editedProduct => {
   this.alerta.showExtioso('Producto agregado', 'El producto fue agregado con exito.')
 }, error => {
   this.alerta.showError('Ha ocurrido un problema', 'Verifique haber escrito los datos correctamente.')
 });
}

regresar(){
  this.router.navigate(['inicio']);
}

}
