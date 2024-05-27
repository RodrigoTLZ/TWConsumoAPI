import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from './vistas/inicio/inicio.component';
import {AgregarComponent} from './vistas/agregar/agregar.component';
import {EditarComponent} from './vistas/editar/editar.component';

const routes: Routes = [{
  path:'', redirectTo:'inicio', pathMatch:'full'},
{path:'inicio', component:InicioComponent},
{path:'agregar', component:AgregarComponent},
{path:'editar/:id', component:EditarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InicioComponent, AgregarComponent, EditarComponent]
