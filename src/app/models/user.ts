export class User {
    public constructor(
        public _id?: string,
        public private_name?: string,
        public last_name?: string,
        public email?: string,
        public password?: string,
        public phone?: number,
        public city?: string,
        public street?: string,
        public house_number?: number,
    ){};
}