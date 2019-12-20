import { Component, Input, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CartsService } from 'src/app/services/carts.service';
import { User } from 'src/app/models/user';
import { ActionType } from 'src/app/redux/actionType';
import { Product } from 'src/app/models/product';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {

  @Input() product: Product;
  @Input() user: User;
  public totalPrice: number;
  public quantity: number = 1;
  public myCart: any;
  public todayDateString: string;
  public cartItems: CartItem[];
  public existInCart: boolean = false;

  public constructor(private redux: NgRedux<AppState>, private cartsService: CartsService) { }

  ngOnInit() {
    this.cartsService.getCartFromUser(this.user._id).subscribe(myCart => {
      this.myCart = myCart[myCart.length - 1];
      this.cartsService.getCartItemsFromCart(myCart[myCart.length - 1]._id).subscribe(ci => {
        this.cartItems = ci;
      });
    });

    // get today date string
    let today = new Date();
    let day = new String(today.getDate());
    let mon = new String(today.getMonth() + 1);
    let yr = today.getFullYear();

    if (day.length < 2) { day = "0" + day; }
    if (mon.length < 2) { mon = "0" + mon; }

    let date = day + '/' + mon + '/' + yr;
    this.todayDateString = date;
  }

  public calcValue($event): void {
    this.quantity = +$event.target.value;
  }

  // check if the item i add already exist in my cart
  public checkIfExistOnCart(): void {
    for (let i = 0; i < this.cartItems.length; i++) {
      // if the item exist: 
      if (this.cartItems[i].product._id === this.product._id) {
        this.existInCart = true;
        const obj = {
          amount: this.quantity + this.cartItems[i].amount,
          general_price: this.cartItems[i].general_price + (this.quantity * this.product.price)
        }
        // update the item and the values in redux
        this.cartsService.updateCartItem(obj, this.cartItems[i]._id).subscribe(() => {
          this.redux.getState().cartItems[i].amount = obj.amount;
          this.redux.getState().cartItems[i].general_price = obj.general_price;
          this.redux.getState().totalPrice += this.quantity * this.product.price;
        });
      }
    }
  }

  public addToCart() {
    this.existInCart = false;
    if (this.redux.getState().cartItems.length > 0) {
      this.cartItems = this.redux.getState().cartItems;
      this.checkIfExistOnCart();
    }

    if (this.myCart && this.existInCart === false) {
      // build an object and add it to the cart
      this.totalPrice = this.quantity * this.product.price;
      const newCartItem = {
        product: this.product._id,
        amount: this.quantity,
        general_price: this.totalPrice,
        shopping_cart: this.myCart._id
      }
      this.cartsService.addCartItem(newCartItem, this.myCart._id).subscribe(item => {
        // get the new cart item and save it in redux
        this.cartsService.getCartItemsFromCart(this.myCart._id).subscribe(ci => {
          const lastItem = ci[ci.length - 1];
          const action = { type: ActionType.addCartItem, lastItem };
          this.redux.dispatch(action);
          this.redux.getState().cartItems[ci.length - 1] = lastItem;
          this.redux.getState().totalPrice += lastItem.general_price;
          this.redux.getState().orderBtn = false;
        });
      });
    }
  }

  public increaseQuantity(): void {
    this.quantity += 1;
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

  public decreaseQuantity(): void {
    this.quantity -= 1;
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

}
