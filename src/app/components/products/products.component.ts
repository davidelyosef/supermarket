import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { User } from 'src/app/models/user';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public products: Product[];
  public products2: Product[];
  public connectedUser: User;
  public categories: Category[];
  public category: Category;

  public displayCart: string;
  public mainClass: string;
  public isAdmin: boolean;
  public searchInput: any = "";

  public milkAndEggs_id: string = "5dbbf282192c0a588d4d5791";
  public vegtablesAndFruits_id: string = "5dbbf2a8192c0a588d4d57a1";
  public meatAndFish_id: string = "5dbbf2b8192c0a588d4d57a8";
  public alcohol_id: string = "5dbbf2cf192c0a588d4d57b1";
  public softDrinks_id: string = "5dbc7f2a192c0a588d4dc0ec";

  public constructor(private title: Title, private productsService: ProductsService, private redux: NgRedux<AppState>,
    private categoriesService: CategoriesService, private router: Router) { }

  public ngOnInit() {
    this.title.setTitle("Products");
    const fromLocal = localStorage.getItem("myUser");
    if (fromLocal) {
      this.redux.getState().logged = JSON.parse(fromLocal);
      this.connectedUser = this.redux.getState().logged;

      // get the category
      this.categoriesService.getAllCategories().subscribe(c => {
        this.categories = c
        this.categories.map(c => c.category === "milkAndEggs" ? this.category = c : this.category);
      });

      // Gettin all the products from the service
      this.productsService.getProductsFromOneCategory(this.milkAndEggs_id).subscribe(products => {
        this.products = products;
        this.products2 = products;
      },
        err => {
          console.log("Error: " + err.message);
        });

      // see if the user is the admin or not and set the right conditions
      let adminCondition = this.connectedUser.email === "theAdmin@gmail.com";
      this.displayCart = adminCondition ? "none" : "block";
      this.mainClass = adminCondition ? "adminMain" : "deafultMain";
      this.isAdmin = adminCondition ? true : false;
    }
  }

  public onSearch(): void {
    // search and find the products that contain the input text
    this.products = this.products2;
    let newProducts = [];
    this.products.filter(p => {
      this.searchInput = this.searchInput.toLowerCase();
      p.name = p.name.toLowerCase();
      p.name.indexOf(this.searchInput) > -1
      if (p.name.indexOf(this.searchInput) > -1) {
        newProducts.push(p);
      }
    });
    this.products = newProducts.length < 1 ? this.products2 : newProducts;
  }

  public getProducts(category_id): any {
    this.productsService.getProductsFromOneCategory(category_id).subscribe(products => {
      this.products = products;
      this.products2 = products;
    },
      err => {
        console.log("Error: " + err.message);
      });
  }

  public addPage(): void {
    this.router.navigate(["/addProduct"]);
  }

  public logout(): void {
    if (window.confirm('Are you sure you wish to log out?') === true) {
      localStorage.removeItem('myUser');
      localStorage.removeItem('myCart');
      this.redux.getState().logged = undefined;
      this.redux.getState().cart = undefined;
      this.router.navigate(["/login"]);
    }
  }
}