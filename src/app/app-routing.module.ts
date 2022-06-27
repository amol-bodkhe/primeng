import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import {CrudComponent} from './crud/crud.component';

const routes: Routes = [
  { path: '', redirectTo: 'crud', pathMatch: 'full' },
  { path:'table',component:TableComponent},
   { path: 'crud', component: CrudComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }