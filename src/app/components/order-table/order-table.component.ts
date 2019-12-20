import { Component, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { CartsService } from 'src/app/services/carts.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent {
  @Input() orders;
  @Input() users;
  @Input() isAdmin;
  public arr: any;

  constructor(private ordersService: OrdersService, private cartsService: CartsService) { }

  public getOrdersByUser(event) {
    const user_id = event.target.value;
    this.ordersService.getOneOrder(user_id).subscribe(orders => {
      this.arr = orders
      this.arr.map(o => {
        this.cartsService.getCartItemsFromCart(o.cart).subscribe(items => {
          o.products = items;
        });
      });
      this.orders = this.arr;
    },err => console.log(err.message));
  }

}