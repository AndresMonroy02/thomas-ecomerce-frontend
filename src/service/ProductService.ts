import axios, { AxiosResponse } from 'axios';
import { Product } from '@/types/product/types';
import { Page } from '@/types/types';
import UserService from '@/service/UserService';

const BASE_URL: string = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8090";

class ProductService {
    static BASE_URL: string = BASE_URL;

    static async getAllProducts(page: number = 1, size: number = 10): Promise<Page<Product>> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Page<Product>> = await axios.get(
                `${ProductService.BASE_URL}/api/v1/products`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page, size },
                }
            );
            return response.data;
        }
        catch (err) {
            throw err;
        }
    }

    static async addProduct(product: Product): Promise<Product> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Product> = await axios.post(
                `${ProductService.BASE_URL}/api/v1/products`,
                product,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getProductById(id: number): Promise<Product> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Product> = await axios.get(
                `${ProductService.BASE_URL}/api/v1/products/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getProductByName(name: string = '', page: number = 1, size: number = 10): Promise<Page<Product>> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Page<Product>> = await axios.get(
                `${ProductService.BASE_URL}/api/v1/products/findByName`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { name, page, size },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async deleteProduct(id: number): Promise<void> {
        const token = UserService.getToken() ?? '';
        try {
            await axios.delete(
                `${ProductService.BASE_URL}/api/v1/products/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (err) {
            throw err;
        }
    }

    static async updateProduct(id: number, product: Product): Promise<Product> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Product> = await axios.put(
                `${ProductService.BASE_URL}/api/v1/products/${id}`,
                product,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        } 
    }

    static async getProductByNameContaining(name: string = '', page: number = 1, size: number = 10): Promise<Page<Product>> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Page<Product>> = await axios.get(
                `${ProductService.BASE_URL}/api/v1/products/findByNameContaining`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { name, page, size },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async filterProducts(
        page: number = 1,
        size: number = 10,
        minPrice?: number,
        maxPrice?: number,
        categories?: string,
        name?: string,
        description?: string
    ): Promise<Page<Product>> {
        const token = UserService.getToken() ?? '';

        // Validate and set default values for minPrice and maxPrice
        const validatedMinPrice = minPrice != null && minPrice > 0 ? minPrice : 0;
        const validatedMaxPrice = maxPrice != null && maxPrice > 0 ? maxPrice : 99999999999;
        const ValidateCategories = categories != null ? categories : '';
        const ValidateName = name != null ? name : '';
        const ValidateDescription = description != null ? description : '';
        try {
            const response: AxiosResponse<Page<Product>> = await axios.get(
                `${ProductService.BASE_URL}/api/v1/products/filter`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        page,
                        size,
                        minPrice: validatedMinPrice,
                        maxPrice: validatedMaxPrice,
                        ValidateCategories,
                        ValidateName,
                        ValidateDescription
                    }
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default ProductService;
