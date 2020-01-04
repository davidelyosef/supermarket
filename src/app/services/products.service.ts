import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/api/products");
  }

  public getProductsFromOneCategory(category_id): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:8080/api/products/categories/" + category_id);
  }

  public updateProduct(product_id, product): Observable<Product> {
    return this.httpClient.patch<Product>("http://localhost:8080/api/products/" + product_id, product);
  }

  public addProduct(product): Observable<Product> {
    return this.httpClient.post<Product>("http://localhost:8080/api/products/", product);
  }

  public postImage(image): any {
    return this.httpClient.post("http://localhost:8080/upload-image", image);
  }

  public patchImage(image): any {
    return this.httpClient.patch("http://localhost:8080/update-image-name", image);
  }

  public deleteProduct(product_id): Observable<Product> {
    return this.httpClient.delete<Product>("http://localhost:8080/api/products/" + product_id);
  }

}
