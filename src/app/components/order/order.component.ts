import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CartItem } from 'src/app/models/cartItem';
import { Order } from 'src/app/models/order';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { User } from 'src/app/models/user';
import { Cart } from 'src/app/models/cart';
import { OrdersService } from 'src/app/services/orders.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public items: CartItem[];
  public order: Order;
  public user: User;
  public cart: Cart;
  public overallPrice: number = 0;

  // Get today date string
  public date: Function = () => {
    let today = new Date();
    let day = new String(today.getDate());
    let mon = new String(today.getMonth() + 1);
    let yr = today.getFullYear();

    if (day.length < 2) { day = "0" + day; }
    if (mon.length < 2) { mon = "0" + mon; }

    let date = new String(yr + '-' + mon + '-' + day);
    return date;
  }

  // Modal methods
  public header: any;
  public message: any;
  public submit: any;
  public alertStyle: any;

  constructor(private title: Title, private redux: NgRedux<AppState>,
    private cartsService: CartsService, private ordersService: OrdersService, private router: Router) { }

  ngOnInit() {
    this.title.setTitle("Order");
    // bring the products and the order from our cart with redux
    this.items = this.redux.getState().cartItems;
    this.order = this.redux.getState().order;

    // get the connected user
    const fromLocal = localStorage.getItem("myUser");
    if (fromLocal) {
      this.redux.getState().logged = JSON.parse(fromLocal);
    }
    else {
      // if your'e not connected go back to the login page
      this.router.navigate(["/login"]);
      return;
    }
    this.user = this.redux.getState().logged;

    // get cart id from our user
    this.user ? this.cartsService.getCartFromUser(this.user._id).subscribe(cart => {
      this.cart = cart;

      // fetch all the items if you refresh the page
      if (this.items === undefined) {

        // get all cart items from our cart
        this.cartsService.getCartItemsFromCart(this.cart[0]._id).subscribe(cartItems => {
          this.items = cartItems;
          this.redux.getState().cartItems = cartItems;

          // get the price of all the cart
          this.items.forEach(c => {
            this.overallPrice += c.general_price;
          });
          // the order from the user
          this.order = {
            user: this.user._id,
            cart: this.cart[0]._id,
            final_price: this.overallPrice,
            delivery_city: this.user.city,
            delivery_street: this.user.street,
            delivery_house: this.user.house_number,
            delivery_date: new Date().toLocaleDateString(),
            cc_number: 123456
          }
          err => {
            alert("Error: " + err.message);
          }
        });
      }
    }) : "";

    // if you'll refresh the page and this.order will be undefined
    if (!this.order) {
      this.ordersService.getOneOrder(this.user._id).subscribe(arr => {
        if (arr.length > 0) {
          this.order = arr[arr.length - 1];
        }
      }, err => console.log(err.message));
    }

  }

  public backToShop(): void {
    this.router.navigate(["/products"]);
  }

  // open a new cart
  public openNewCart(user_id): void {
    let today = new Date();
    let day = new String(today.getDate());
    let mon = new String(today.getMonth() + 1);
    let yr = today.getFullYear();

    if (day.length < 2) { day = "0" + day; }
    if (mon.length < 2) { mon = "0" + mon; }

    let date = day + '/' + mon + '/' + yr;
    const newCart = {
      user: user_id,
      date: date
    }
    this.cartsService.addCart(newCart).subscribe();
  }

  public orderAction(): void {
    // if the order you sent answered the conditions send proper data to the modal
    if (this.order.cart && this.order.delivery_city && this.order.delivery_street && this.order.delivery_house
      && this.order.delivery_date && this.order.cc_number) {
      this.header = "Your order has been successfully added";
      this.message = `Address: ${this.order.delivery_city}, ${this.order.delivery_street}, ${this.order.delivery_house}
       | Shipping Date: ${this.order.delivery_date}`;
      this.submit = "submit";
      this.alertStyle = "info";
      // Add new order and delete all the products from the cart and the cart itself
      this.ordersService.addOrder(this.order).subscribe();
      localStorage.removeItem('myCart');
      this.redux.getState().cart = undefined;
      this.openNewCart(this.user._id);
    }
    // send proper data to the modal if it doesn't suits the conditions
    else {
      this.header = "Order failed to add.";
      this.message = `Please fill all the input fields to continue.`;
      this.submit = undefined;
      this.alertStyle = "danger";
    }
  }

}
