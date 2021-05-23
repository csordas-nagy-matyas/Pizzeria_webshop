import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { BasketComponent } from './basket/basket.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';
import { DrinksComponent } from './drinks/drinks.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    BasketComponent,
    ErrorComponent,
    LoginComponent,
    DrinksComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
