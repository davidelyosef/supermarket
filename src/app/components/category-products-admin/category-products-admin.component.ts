import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CartsService } from 'src/app/services/carts.service';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-products-admin',
  templateUrl: './category-products-admin.component.html',
  styleUrls: ['./category-products-admin.component.scss']
})
export class CategoryProductsAdminComponent implements OnInit {

  @Input() product: Product;
  @Input() user: User;
  @Input() category: Category;
  public myCart: any;
  public name: any;
  public price: number;

  public constructor(private redux: NgRedux<AppState>, private cartsService: CartsService,
    private productsService: ProductsService, private router: Router) { }

  ngOnInit() {
    if (this.redux.getState().cart) {
      this.myCart = this.redux.getState().cart;
    }

    this.cartsService.getCartFromUser(this.user._id).subscribe(myCart => {
      this.myCart = myCart[myCart.length - 1];
    });

    this.name = this.product.name;
    this.price = this.product.price;
  }

  public update(): void {
    const newProduct = this.product;
    const product_id = this.product._id;
    this.productsService.updateProduct(product_id, newProduct).subscribe(p =>
      alert(p.name + " has been updated successfully."),
      err => console.log(err.message)
    );
  }

  public delete(): void {
    if (window.confirm('Are you sure you wish to delete this product?') === true) {
      this.productsService.deleteProduct(this.product._id).subscribe(() => {
        alert(this.product.name + " has been deleted.");
      }, err => console.log(err.message));
    }
  }

}
