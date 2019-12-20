import { User } from './user';
import { Cart } from './cart';
import { CartItem } from './cartItem';

export class Order {
  length?: number;
    public constructor(
        public _id?: string,
        public user?: User | any,
        public cart?: Cart | any,
        public final_price: number = 0,
        public delivery_city?: string,
        public delivery_street?: string,
        public delivery_house?: number,
        public delivery_date?: string,
        public cc_number?: number,
        public products?: CartItem[]
    ){};
}