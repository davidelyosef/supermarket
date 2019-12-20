import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:8080/api/categories");
  }

  public getOneCategory(category_id): Observable<Category> {
    return this.httpClient.get<Category>("http://localhost:8080/api/categories/" + category_id);
  }
}
