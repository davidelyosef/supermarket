import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { CartsService } from 'src/app/services/carts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public orders: Order[];
  public ordersFromUser: Order[] | any = [];
  public connectedUser: User;
  public isAdmin: boolean = false;
  public items: [] = [];
  public users: User[];

  constructor(private redux: NgRedux<AppState>, private ordersService: OrdersService,
    private cartsService: CartsService, private usersService: UsersService) { }

  ngOnInit() {
    // get all orders:
    this.ordersService.getAllOrders().subscribe(orders => {
      this.orders = orders;
      // get user id to get his orders: 
      const fromLocal = localStorage.getItem("myUser");
      if (fromLocal) {
        const parseLocal = JSON.parse(fromLocal);
        this.connectedUser = parseLocal;
        const user_id = parseLocal._id;
        // get the products of each order
        this.orders.map(async o => {
          await this.cartsService.getCartItemsFromCart(o.cart._id).subscribe(items => {
            o.products = items;
          });
          // get orders from specific user
          if (o.user._id === user_id) {
            this.ordersFromUser.push(o);
          }
        });
        // check if the user is the admin
        if (this.connectedUser.email === 'theAdmin@gmail.com') {
          this.isAdmin = true;
        }
      }
    });

    // get users
    this.usersService.getAllUsers().subscribe(users => this.users = users,
      err => console.log(err.message));
  }


}
