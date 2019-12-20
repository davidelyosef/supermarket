import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// For http:
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HeaderComponent } from './components/navBar/navBar.component';
// 4. Two way Binding
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { Page404Component } from './components/page404/page404.component';
import { RegisterComponent } from './components/register/register.component';
import { MyCartComponent } from './components/my-cart/my-cart.component';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { NgRedux, NgReduxModule } from "ng2-redux";
import { AppState } from './redux/appState';
import { Reducer } from './redux/reducer';
import { NotConnectedComponent } from './components/not-connected/not-connected.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { OrderComponent } from './components/order/order.component';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { CategoryProductsAdminComponent } from './components/category-products-admin/category-products-admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './components/about/about.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderTableComponent } from './components/order-table/order-table.component'

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LoginComponent,
    ProductsComponent,
    Page404Component,
    RegisterComponent,
    MyCartComponent,
    CategoryProductsComponent,
    NotConnectedComponent,
    CartItemComponent,
    LoginModalComponent,
    OrderComponent,
    RecommendationsComponent,
    CategoryProductsAdminComponent,
    AddProductComponent,
    AboutComponent,
    MyOrdersComponent,
    OrderTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgReduxModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule {
  public constructor(redux: NgRedux<AppState>) {
    redux.configureStore(Reducer.reduce, new AppState());
  }
}
