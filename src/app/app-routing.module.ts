import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterComponent } from './components/register/register.component';
import { OrderComponent } from './components/order/order.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AboutComponent } from './components/about/about.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';

// Routing each path to a different component
const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "products", component: ProductsComponent},
  {path: "page-not-found", component: Page404Component},
  {path: "register", component: RegisterComponent},
  {path: "order", component: OrderComponent},
  {path: "addProduct", component: AddProductComponent},
  {path: "about", component: AboutComponent},
  {path: "my-orders", component: MyOrdersComponent},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "**", redirectTo: "/page-not-found", pathMatch: "full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), NgbModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
