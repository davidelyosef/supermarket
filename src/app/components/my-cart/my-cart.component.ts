import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { User } from 'src/app/models/user';
import { Cart } from 'src/app/models/cart';
import { Order } from 'src/app/models/order';
import { ActionType } from 'src/app/redux/actionType';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {

  @Input() user: User;
  public cart: Cart;
  public cartItems: CartItem[];
  public categoryName: string;
  public overallPrice: number = 0;
  public order: Order;
  public orderBtn: boolean;

  constructor(public redux: NgRedux<AppState>, private router: Router, private cartsService: CartsService
  ) { }

  ngOnInit() {
    this.cartItems = this.redux.getState().cartItems;
    this.cart = this.redux.getState().cart;
    this.overallPrice = this.redux.getState().totalPrice ? this.redux.getState().totalPrice : 0;
    this.orderBtn = this.redux.getState().orderBtn;

    if (!this.cart || !this.cartItems) {
      // get cart id from our user
      this.cartsService.getCartFromUser(this.user._id).subscribe(async cart => {
        this.cart = cart[cart.length - 1];
        this.redux.getState().cart = this.cart;
        // get all cart items from our cart
        if (this.cart) {
          await this.cartsService.getCartItemsFromCart(this.cart._id).subscribe(cartItems => {
            this.cartItems = cartItems;
            this.redux.getState().cartItems = cartItems;
            // make the order button available if there are cart items
            this.redux.getState().orderBtn = this.cartItems.length > 0 ? false : true;
            this.orderBtn = this.cartItems.length > 0 ? false : true;
            // get the price of all the cart
            this.cartItems.forEach(c => {
              this.overallPrice += c.general_price;
              this.redux.getState().totalPrice = this.overallPrice;
            });
            setInterval(() => {          
              this.overallPrice = this.redux.getState().totalPrice;
            }, 300)
  
          });
        }
        err => {
          alert("Error: " + err.message);
        }
      });
    }
    setTimeout(() => {
      if (this.cartItems) {
        setInterval(() => {          
          this.overallPrice = this.redux.getState().totalPrice;
        }, 300)
      }
    }, 500)
    
  }

  public logout(): void {
    if (window.confirm('Are you sure you wish to log out?') === true) {
      localStorage.removeItem('myUser');
      localStorage.removeItem('myCart');
      this.redux.getState().logged = undefined;
      this.redux.getState().cart = undefined;
      this.redux.getState().cartItems = undefined;
      this.redux.getState().totalPrice = 0;
      this.router.navigate(["/login"]);
    }
  }

  public deleteAllCartItems(): void {
    if (window.confirm('Delete all the products in the cart?') === true) {
      this.cartsService.deleteAllCartItems(this.cart._id).subscribe(() => {
        const action = { type: ActionType.deleteAllItems, payload: this.cartItems };
        this.redux.dispatch(action);
        this.overallPrice = 0;
        this.redux.getState().totalPrice = 0;
        this.redux.getState().orderBtn = true;
        this.orderBtn = true;
      });
    }
  }

  public orderAction(): void {
    this.order = {
      user: this.user._id,
      cart: this.cart._id,
      final_price: this.overallPrice,
      delivery_city: this.user.city,
      delivery_street: this.user.street,
      delivery_house: this.user.house_number,
      delivery_date: new Date().toDateString(),
      cc_number: 99999
    }
    this.redux.getState().order = this.order;
    this.router.navigate(["/order"]);
  }

}
