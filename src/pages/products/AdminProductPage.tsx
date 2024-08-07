import React, { useState, useEffect } from 'react';
import ProductService from '@/service/ProductService';
import { Product } from '@/types/product/types';
import { Page } from '@/types/types';
import SearchButtonNav from '@/components/common/SearchButtonNav';
import ProductTable from '@/components/product/ProductTable';
import { toast } from 'react-toastify';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { sampleProducts } from '@/types/product/sampleProducts';
import ModalCreateProduct from '@/components/product/ModalCreateProduct';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [initialFetchEmpty, setInitialFetchEmpty] = useState<boolean | null>(null);

    const fetchData = async (page: number, pageSize: number, query: string = '') => {
        setIsLoading(true);
        setError(null);

        try {
            let fetchedProducts: Page<Product>;
            if (query.trim() !== '') {
                fetchedProducts = await ProductService.getProductByNameContaining(query, page, pageSize);
            } else {
                fetchedProducts = await ProductService.getAllProducts(page, pageSize);
            }
            console.log('Fetched products:', fetchedProducts);
            setProducts(fetchedProducts.content);
            setTotalItems(fetchedProducts.totalElements);
            if (initialFetchEmpty === null) {
                setInitialFetchEmpty(fetchedProducts.content.length === 0);
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

    const handleEdit = async (productId: number, updatedProduct: Partial<Product>) => {
        try {
            const productToUpdate: Product = {
                ...updatedProduct,
                id: productId, // Provide a default value for the id property
                name: updatedProduct.name || '', // Provide a default value for the name property
                description: updatedProduct.description || '', // Provide a default value for the description property
            };
            await ProductService.updateProduct(productId, productToUpdate);
            toast.success('Producto actualizado correctamente');
            fetchData(currentPage, pageSize, searchQuery);
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error al actualizar el producto');
        }
    };

    const handleOpenDialog = (productId: number) => {
        setProductIdToDelete(productId);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (productIdToDelete !== null) {
            try {
                await ProductService.deleteProduct(productIdToDelete);
                toast.success('Producto eliminado correctamente');
                fetchData(currentPage, pageSize, searchQuery);
            } catch (error) {
                console.error('Error deleting product:', error);
                toast.error('Error al eliminar el producto');
            }
            setIsDialogOpen(false);
            setProductIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDialogOpen(false);
        setProductIdToDelete(null);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateProduct = async (product: Product) => {
        try {
            console.log('Creating product:', product);
            await ProductService.addProduct(product);
            toast.success('Producto creado correctamente');
            fetchData(currentPage, pageSize, searchQuery);
        } catch (error) {
            console.error('Error creating product:', error);
            toast.error('Error al crear el producto');
        }
        handleCloseCreateModal();
    };
    

    const handleBulkCreateProducts = async () => {
        try {
            await Promise.all(sampleProducts.map((product: Product) => ProductService.addProduct(product)));
            toast.success('Productos creados correctamente');
            fetchData(currentPage, pageSize, searchQuery);
        } catch (error) {
            console.error('Error creando productos:', error);
            toast.error('Error al crear los productos');
        }
    };

    return (
        <div className="w-full flex items-center justify-center p-16">
            {isLoading ? (
                <p>Cargando productos...</p>
            ) : error ? (
                <p>Error al obtener productos: {error.message}</p>
            ) : (
                <div className='w-4/5'>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-4">
                            <button
                                className="w-48 p-3 bg-lime-500 rounded-full hover:bg-lime-600"
                                onClick={handleOpenCreateModal}
                            >
                                Crear Producto
                            </button>
                            {initialFetchEmpty && (
                                <button
                                    className="w-48 p-3 bg-blue-500 rounded-full hover:bg-blue-600"
                                    onClick={handleBulkCreateProducts}
                                >
                                    Crear Productos en lote
                                </button>
                            )}
                        </div>
                        <SearchButtonNav
                            placeholder="Buscar un producto..."
                            inputId="product-search"
                            onSearch={handleSearch}
                        />
                    </div>
                    <ProductTable
                        products={products}
                        currentPage={currentPage}
                        pageSize={pageSize}
                        totalItems={totalItems}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                        onEdit={handleEdit}
                        onDelete={handleOpenDialog}
                    />
                </div>
            )}
            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmar Eliminación</AlertDialogTitle>
                        <AlertDialogDescription>
                            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <button
                            onClick={handleCancelDelete}
                            className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                        >
                            Eliminar
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {isCreateModalOpen && (
                <ModalCreateProduct
                    onClose={handleCloseCreateModal}
                    onProductCreated={handleCreateProduct}  // Ensure this is correctly passed
                />
            )}
        </div>
    );
};

export default ProductsPage;
