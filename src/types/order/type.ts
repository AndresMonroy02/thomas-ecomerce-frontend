import { Category } from "../category/types";
// OrderItem interface
export interface OrderItem {
    productId: number;
    productName: string;
    image: string | null;
    quantity: number;
    categories: Category[];
    momentPrice: number;
    pricePay: number | null;
    discount: number;
}

// OrderDto interface
export interface OrderDto {
    id: number;
    idUser: number;
    username: string;
    name: string;
    totalAmount: number;
    startDate: string;  // ISO 8601 format date string
    endDate: string | null;  // ISO 8601 format date string or null
    state: string;  // You might want to use a union type if the state has fixed values
    items: OrderItem[];
}