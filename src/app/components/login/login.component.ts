import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/redux/appState';
import { NgRedux } from 'ng2-redux';
import { CartsService } from 'src/app/services/carts.service';
import { Cart } from 'src/app/models/cart';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public allProducts: Product[];
  public allOrders: Order[];
  public email: string;
  public password: string;
  public allUsers: User[];
  public cart: Cart;
  public admin: Admin;
  public loginDisable: boolean = true;
  // modal
  public username: string;
  public alertStyle: string;
  public message: any;
  public continueShopping: string;
  public startShopping: string;
  public submit: any;

  public constructor(private title: Title, private productsService: ProductsService, private ordersService: OrdersService,
    private usersService: UsersService, private router: Router, private redux: NgRedux<AppState>,
    private cartsService: CartsService) { }

  public ngOnInit(): void {
    this.title.setTitle("Login");
    // get all products from the service:
    this.productsService.getAllProducts().subscribe(p => this.allProducts = p);
    // get all orders from the service:
    this.ordersService.getAllOrders().subscribe(o => {
      this.allOrders = o;
      this.loginDisable = false;
    });
    // get all users from the server: 
    this.usersService.getAllUsers().subscribe(u => this.allUsers = u);
    // get the admin from the service: 
    this.usersService.getAdmin().subscribe(a => this.admin = a);
  }

  // get the email and the password from the input fields
  public getEmail($event): void {
    this.email = $event.target.value;
  }
  public getPassword($event): void {
    this.password = $event.target.value;
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

  public login(): void {
    let connected = false;
    // check if i connected with my admin account
    if (this.email === this.admin.email && this.password === this.admin.password) {
      connected = true;
      this.submit = "submit";
      this.continueShopping = undefined;
      this.startShopping = undefined;
      this.alertStyle = "info";
      this.username = "Welcome Admin";
      this.message = "Here you can add or update the products in the website.";
      // Save the user in redux and in local storage
      this.redux.getState().logged = this.admin;
      localStorage.setItem('myUser', JSON.stringify(this.admin));
    }
    else {
      this.allUsers.map(u => {
        if (u.email === this.email && u.password === this.password) {
          // checking if i have an open cart in this user
          this.cartsService.getCartFromUser(u._id).subscribe(cart => {
            this.cart = cart[cart.length - 1];
            this.redux.getState().cart = cart;
            localStorage.setItem('myCart', JSON.stringify(cart));

            // if the user have an unfinished cart display this message
            if (this.cart) {
              this.alertStyle = "info";
              this.username = "Welcome " + u.private_name;
              this.message = `Welcome back to our site, to continue your shopping from ${this.cart.date} click the button below.`;
              this.startShopping = undefined;
              this.continueShopping = "redirectTo";
              this.submit = undefined;
            }
            // if the user does'nt have a cart send him this message and open a new cart for him
            else {
              this.alertStyle = "info";
              this.username = "Welcome " + u.private_name;
              this.message = `Welcome to our site, to start your shopping click the button below. :-)`;
              this.continueShopping = undefined;
              this.startShopping = "redirectTo";
              this.submit = undefined;

              this.openNewCart(u._id);
            }
            err => {
              alert("Error: " + err.message);
            }
          });
          // Save the user in redux and in local storage
          this.redux.getState().logged = u;
          localStorage.setItem('myUser', JSON.stringify(u));
          connected = true;
        }
      })
      if (!connected) {
        this.continueShopping = undefined;
        this.startShopping = undefined;
        this.alertStyle = "danger";
        this.username = "Hello guest";
        this.message = "You inserted wrong email or password, please try again";
        this.submit = undefined;
      }
    }
  }

}
