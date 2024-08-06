
export interface Product {
    title: string;
    description: string;
    price: string;
    imageSrc: string;
}

export interface User {
    id?: number;
    email: string;
    password: string;
    [key: string]: any;
}