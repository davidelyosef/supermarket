import { Product } from './product';
import { Cart } from './cart';

export class CartItem {
    public constructor(
        public _id?: string,
        public product?: Product,
        public amount?: number,
        public general_price?: number,
        public shopping_cart?: Cart,
    ){};
}