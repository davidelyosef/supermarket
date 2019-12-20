import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public newProduct = new Product();
  public categories: Category[];
  public image: File;

  constructor(private router: Router, private categoriesService: CategoriesService,
    private productsService: ProductsService) { }

  ngOnInit() {
    // prevant regular user to enter this route
    const fromLocal = localStorage.getItem("myUser");
    if (fromLocal) {
      let connectedUser = JSON.parse(fromLocal);
      if (connectedUser.email !== 'theAdmin@gmail.com') {
        this.router.navigate(['/login'])
      }
    }
    else {
      this.router.navigate(['/login']);
    }
    // get the categorie name
    this.categoriesService.getAllCategories().subscribe(c => this.categories = c,
      err => console.log(err.message));
  }

  public setImage($event): void {
    this.image = <File>$event.target.files[0];
  }

  public addButton(): boolean {
    return (this.newProduct.category && this.newProduct.name && this.newProduct.price) ?
      true : false;
  }

  public addProduct(): void {
    this.categoriesService.getOneCategory(this.newProduct.category).subscribe(c => {
      this.newProduct.img_name = this.image.name;
      let name = c.category
      const fd = new FormData();
      fd.append("category", JSON.stringify(name));
      this.productsService.sendCategory(c).subscribe(res => res, err => console.log());
      fd.append("myImage", this.image, this.image.name);
      fd.append("newProduct", JSON.stringify(this.newProduct));
      this.productsService.postImage(fd).subscribe(p => p, err => console.log());
    });
    this.router.navigate(["/products"]);
  }

  public backToShop(): void {
    this.router.navigate(["/products"]);
  }
}
