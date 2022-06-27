import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './table/table.component';
 import { TableModule } from 'primeng/table';
 import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 import { HttpClientModule } from '@angular/common/http';
 import {ProductService} from './shared/product.service'
import { PaginatorModule } from 'primeng/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
// import { NgToastModule} from 'ng-angular-popup';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CrudComponent } from './crud/crud.component';
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    CrudComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     TableModule,
     FormsModule, 
     ReactiveFormsModule,
     HttpClientModule,
     PaginatorModule,
     InputTextModule,
     InputTextareaModule,
     ButtonModule,
    //  NgToastModule,
     BrowserAnimationsModule,
     BsDropdownModule.forRoot(),
     TooltipModule.forRoot(),
     ModalModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule  { }
