
export interface Product {
    title: string;
    description: string;
    price: string;
    imageSrc: string;
}

export interface Category {
    id?: number;
    name: string;
}

export interface Pageable {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
    };
    unpaged: boolean;
}

export interface Page<T> {
    totalPages: number;
    content: T[];
    totalElements: number;
    pageable: Pageable;
}