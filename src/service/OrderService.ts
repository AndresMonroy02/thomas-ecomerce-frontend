import axios, { AxiosResponse } from 'axios';
import { Page } from '@/types/types';
import { OrderDto } from '@/types/order/type';
import UserService from '@/service/UserService';

const BASE_URL: string = import.meta.env.VITE_BASE_URL || "http://127.0.0.1:8090";
interface TopResponse{
    message: string;
    data: ProductSalesDto[];
}
interface ProductSalesDto {
    productId: number;
    productName: string;
    totalItemsSold: number;
    totalSold: number;
}
class OrderService {
    static BASE_URL: string = BASE_URL;

    static async getAllOrders(page: number = 1, size: number = 10): Promise<Page<OrderDto>> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<Page<OrderDto>> = await axios.get(
                `${OrderService.BASE_URL}/api/v1/orders`,
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

    static async getOrderById(orderId: number): Promise<OrderDto> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<OrderDto> = await axios.get(
                `${OrderService.BASE_URL}/api/v1/orders/${orderId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async createOrder(orderDto: OrderDto): Promise<OrderDto> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<OrderDto> = await axios.post(
                `${OrderService.BASE_URL}/api/v1/orders`,
                orderDto,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getUserOrders(userId: number): Promise<OrderDto> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<OrderDto> = await axios.get(
                `${OrderService.BASE_URL}/api/v1/orders/user/${userId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getTopSellingProducts(): Promise<ProductSalesDto[]> {
        const token = UserService.getToken() ?? '';
        try {
            const response: AxiosResponse<TopResponse> = await axios.get(
                `${OrderService.BASE_URL}/api/v1/orders/top-selling-products`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            return response.data.data;
        } catch (err) {
            throw err;
        }
    }
}

export default OrderService;
