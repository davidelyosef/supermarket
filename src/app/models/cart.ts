import { User } from './user';

export class Cart {
  length: any;
    public constructor(
        public _id?: string,
        public user?: User | any,
        public date?: string
    ){};
}