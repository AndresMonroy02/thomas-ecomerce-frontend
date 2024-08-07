export interface User {
    id?: number;
    email: string;
    password: string;
    [key: string]: any;
}
