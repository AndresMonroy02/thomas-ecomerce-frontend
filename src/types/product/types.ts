import { Category } from '@/types/category/types';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    img: string | null;
    state: boolean;
    categories: Category[];
}