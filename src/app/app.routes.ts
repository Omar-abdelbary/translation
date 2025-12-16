import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';

export const routes: Routes = [




  // latouts blank 
  {path:"" , component: BlankComponent , children:[
    {path:"" , redirectTo:"translator" , pathMatch:"full" , title:"traslator"} ,
    {path:"translator" , loadComponent:()=>import('./components/traslator/traslator.component').then( (c)=>c.TraslatorComponent) , title:"translator"} ,
  ]}


];
