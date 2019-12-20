import { Component, OnInit, Input } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CategoriesService } from 'src/app/services/categories.service';
import { CartsService } from 'src/app/services/carts.service';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { ActionType } from 'src/app/redux/actionType';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() cartItem: CartItem;
  @Input() displayX: boolean;
  public category: string;
  public imgUrl: string = "../../../assets/images/Spinner.gif";

  constructor(private categoriesService: CategoriesService, private cartsService: CartsService,
    private redux: NgRedux<AppState>) { }

  ngOnInit() {
    this.categoriesService.getOneCategory(this.cartItem.product.category).subscribe(c => {
      this.category = c.category;
      this.imgUrl = `http://localhost:8080/assets/products/${this.cartItem.product.img_name}`;
      err => console.log(err.message);
    });
    
  }

  public deleteCartItem() {
    this.cartsService.deleteCartItem(this.cartItem._id).subscribe(() => {
      const action = { type: ActionType.deleteCartItem, payload: this.cartItem };
      this.redux.dispatch(action);
      this.redux.getState().totalPrice -= this.cartItem.general_price;
      
      // disable order button if there is no items left in the cart
      let items = this.redux.getState().cartItems
      if (items.length < 1) {
        this.redux.getState().orderBtn = true;
      }
    });
  }

}
