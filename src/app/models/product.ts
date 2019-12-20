import { Category } from './category';

export class Product {
    public constructor(
        public _id?: string,
        public name?: string,
        public category?: Category | any,
        public price?: number,
        public img_name?: string,
    ){};
}