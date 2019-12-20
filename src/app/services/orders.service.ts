import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  public getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>("http://localhost:8080/api/orders");
  }

  public addOrder(order): Observable<Order> {
    return this.httpClient.post<Order>("http://localhost:8080/api/orders/", order);
  }

  public getOneOrder(user_id): Observable<Order> {
    return this.httpClient.get<Order>("http://localhost:8080/api/orders/" + user_id);
  }
}
