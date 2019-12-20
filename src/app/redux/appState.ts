import { User } from '../models/user';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { Order } from '../models/order';

export class AppState {

    public logged: User;
    public cart: Cart;
    public cartItems: CartItem[];
    public order: Order;
    public totalPrice: number = 0;
    public orderBtn: boolean = true;

}

