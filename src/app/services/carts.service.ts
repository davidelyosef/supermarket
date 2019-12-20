import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cartItem';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private httpClient: HttpClient) { }

  public getAllCartItems(): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>("http://localhost:8080/api/cart_item");
  }

  public getCartFromUser(user_id): Observable<Cart> {
    return this.httpClient.get<Cart>("http://localhost:8080/api/carts/" + user_id);
  }

  public getCartItemsFromCart(cart_id): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>("http://localhost:8080/api/cart_item/carts/" + cart_id);
  }

  public addCartItem(cartItem, cart_id): Observable<CartItem> {
    return this.httpClient.post<CartItem>("http://localhost:8080/api/cart_item/carts/" + cart_id, cartItem);
  }

  public addCart(cart): Observable<Cart> {
    return this.httpClient.post<Cart>("http://localhost:8080/api/carts/", cart);
  }

  public deleteCartItem(cartItem_id): Observable<CartItem> {
    return this.httpClient.delete<CartItem>("http://localhost:8080/api/cart_item/" + cartItem_id);
  }

  public deleteAllCartItems(cart_id): Observable<CartItem[]> {
    return this.httpClient.delete<CartItem[]>("http://localhost:8080/api/cart_item/carts/" + cart_id);
  }

  public deleteCart(cart_id): Observable<Cart> {
    return this.httpClient.delete<Cart>("http://localhost:8080/api/cart/" + cart_id);
  }

  public updateCartItem(cartItem, cart_id): Observable<CartItem> {
    return this.httpClient.patch<CartItem>("http://localhost:8080/api/cart_item/" + cart_id, cartItem);
  }
}
