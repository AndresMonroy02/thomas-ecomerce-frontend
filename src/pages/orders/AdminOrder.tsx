import React, { useState, useEffect } from 'react';
import OrderService from '@/service/OrderService';
import { OrderDto } from '@/types/order/type';
import { Page } from '@/types/types';
import SearchButtonNav from '@/components/common/SearchButtonNav';
import OrderTable from '@/components/order/OrderTable'; // Assuming you have this component
import { toast } from 'react-toastify';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
// import { ModalCreateOrder } from '@/components/order/ModalCreateOrder'; // Assuming you have this component
import { sampleOrders } from '@/types/order/sampleOrders'; // Sample orders for bulk creation

const AdminOrder: React.FC = () => {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState<number | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [initialFetchEmpty, setInitialFetchEmpty] = useState<boolean | null>(null);

    const fetchData = async (page: number, pageSize: number, query: string = '') => {
        setIsLoading(true);
        setError(null);

        try {
            let fetchedOrders: Page<OrderDto>;
            // Implement search functionality if needed
            fetchedOrders = await OrderService.getAllOrders(page, pageSize);
            console.log('Fetched orders:', fetchedOrders);
            setOrders(fetchedOrders.content);
            setTotalItems(fetchedOrders.totalElements);
            if (initialFetchEmpty === null) {
                setInitialFetchEmpty(fetchedOrders.content.length === 0);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, pageSize, searchQuery);
    }, [currentPage, pageSize, searchQuery]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(1);
    };

    const handleSearch = (query: string) => {
        console.log('Searching for:', query);
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleOpenDialog = (orderId: number) => {
        setOrderIdToDelete(orderId);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (orderIdToDelete !== null) {
            try {
                // await OrderService.deleteOrder(orderIdToDelete);
                toast.success('Order deleted successfully');
                fetchData(currentPage, pageSize, searchQuery);
            } catch (error) {
                console.error('Error deleting order:', error);
                toast.error('Error deleting order');
            }
            setIsDialogOpen(false);
            setOrderIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDialogOpen(false);
        setOrderIdToDelete(null);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateOrder = async (order: OrderDto) => {
        try {
            console.log('Creating order:', order);
            await OrderService.createOrder(order);
            toast.success('Order created successfully');
            fetchData(currentPage, pageSize, searchQuery);
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Error creating order');
        }
        handleCloseCreateModal();
    };

    const handleBulkCreateOrders = async () => {
        try {
            await Promise.all(sampleOrders.map((order: OrderDto) => OrderService.createOrder(order)));
            toast.success('Orders created successfully');
            fetchData(currentPage, pageSize, searchQuery);
        } catch (error) {
            console.error('Error creating orders:', error);
        toast.error('Error creating orders');
        }
    };

    return (
        <div className="w-full flex items-center justify-center p-16">
            {isLoading ? (
                <p>Loading orders...</p>
            ) : error ? (
                <p>Error fetching orders: {error.message}</p>
            ) : (
                <div className='w-4/5'>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-4">
                        <a href="/report-orders">
                            <button
                                className="w-48 p-3 bg-lime-500 rounded-full hover:bg-lime-600"
                            >
                                Ver Reporte
                            </button>
                        </a>
                            {initialFetchEmpty && (
                                <button
                                    className="w-48 p-3 bg-blue-500 rounded-full hover:bg-blue-600"
                                    onClick={handleBulkCreateOrders}
                                >
                                    Bulk Create Orders
                                </button>
                            )}
                        </div>
                        <SearchButtonNav
                            placeholder="Search for an order..."
                            inputId="order-search"
                            onSearch={handleSearch}
                        />
                    </div>
                    <OrderTable
                        orders={orders}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalItems={totalItems}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        onDelete={handleOpenDialog}
                    />
                </div>
            )}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this order? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <button
                            onClick={handleCancelDelete}
                            className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                        >
                            Delete
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/* {isCreateModalOpen && (
                <ModalCreateOrder
                    onClose={handleCloseCreateModal}
                    onOrderCreated={handleCreateOrder}  // Ensure this is correctly passed
                />
            )} */}
        </div>
    );
};

export default AdminOrder;
