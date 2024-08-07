import axios, { AxiosResponse } from 'axios';
import { Category, Page } from '@/types/categoria/types'; // Import shared types
import UserService from '@/service/UserService';

const BASE_URL: string = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8090";

class CategoryService {
    static BASE_URL: string = BASE_URL;

    // Get all categories with pagination
    static async getAllCategories(page: number = 1, size: number = 10): Promise<Page<Category>> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Page<Category>> = await axios.get(
                `${CategoryService.BASE_URL}/api/v1/categories`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { page, size },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get a category by ID
    static async getCategoryById(id: number): Promise<Category> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Category> = await axios.get(
                `${CategoryService.BASE_URL}/api/v1/categories/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get a category by name
    static async getCategoryByName(name: string): Promise<Category> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Category> = await axios.get(
                `${CategoryService.BASE_URL}/api/v1/categories/${name}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Add a new category
    static async addCategory(category: Category): Promise<Category> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Category> = await axios.post(
                `${CategoryService.BASE_URL}/api/v1/categories`,
                category,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Update an existing category
    static async updateCategory(id: number, category: Category): Promise<Category> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Category> = await axios.put(
                `${CategoryService.BASE_URL}/api/v1/categories/${id}`,
                category,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Delete a category
    static async deleteCategory(id: number): Promise<void> {
        const token = UserService.getToken() ?? '';
        try {
            await axios.delete(
                `${CategoryService.BASE_URL}/api/v1/categories/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (err) {
            throw err;
        }
    }

    static async getCategoriesByNameContaining(name: string = '', page: number = 1, size: number = 10): Promise<Page<Category>> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Page<Category>> = await axios.get(
                `${CategoryService.BASE_URL}/api/v1/categories/findByNameContaining`,
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
}

export default CategoryService;
