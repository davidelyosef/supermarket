import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CartsService } from 'src/app/services/carts.service';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';

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
  public categories: Category[];
  public inputCategory: Category;
  public image: File;


  public constructor(private redux: NgRedux<AppState>, private cartsService: CartsService,
    private productsService: ProductsService, private router: Router, private categoriesService: CategoriesService) { }

  ngOnInit() {
    if (this.redux.getState().cart) {
      this.myCart = this.redux.getState().cart;
    }

    this.cartsService.getCartFromUser(this.user._id).subscribe(myCart => {
      this.myCart = myCart[myCart.length - 1];
    });

    this.name = this.product.name;
    this.price = this.product.price;

    this.categoriesService.getAllCategories().subscribe(c => {
      this.categories = c
    }, err => console.log(err.message));
  }

  public update(): void {
    const newProduct = this.product;
    this.product.category = this.inputCategory ? this.inputCategory : ""; 
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

  public setCategory(event) {
    const category_id = event.target.value;
    // find category name
    this.categoriesService.getOneCategory(category_id).subscribe(c => {
      const category_name = c.category;
      this.inputCategory = {
        _id: category_id,
        category: category_name
      }
    });
  }

  public updateImage(event) {
    // chosen img file
    this.image = <File>event.target.files[0];
    // server
    const fd = new FormData();
    fd.append('myImage', this.image);
    fd.append('theProduct', this.product.img_name);
    fd.append('product_id', this.product._id);
    this.productsService.patchImage(fd).subscribe(() => {
      alert('The image of that product has changed.');
    }, err => console.log());
  }

}
