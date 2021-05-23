import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { ProductsComponent } from './products/products.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminAuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { BasketComponent } from './basket/basket.component';
import { DrinksComponent} from './drinks/drinks.component';
import { AdminComponent} from './admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductsComponent, canActivate : [AuthGuard]},
  {path: 'drinks', component: DrinksComponent, canActivate : [AuthGuard]},
  {path: 'basket', component: BasketComponent, canActivate : [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
