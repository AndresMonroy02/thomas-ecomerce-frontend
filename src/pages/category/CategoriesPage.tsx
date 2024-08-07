import React, { useState, useEffect } from 'react';
import CategoryService from '@/service/CategoryService';
import { Category, Page } from '@/types/categoria/types';
import SearchButtonNav from '@/components/common/SearchButtonNav';
import CategoryTable from '@/components/category/CategoryTable';
import { toast } from 'react-toastify';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ModalCreateCategory } from '@/components/category/ModalCreateCategory'; // Import the modal component

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [categoryIdToDelete, setCategoryIdToDelete] = useState<number | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for modal visibility

    const fetchData = async (page: number, pageSize: number, query: string = '') => {
        setIsLoading(true);
        setError(null);

        try {
            let fetchedCategories: Page<Category>;
            if (query.trim() !== '') {
                console.log(`Fetching categories with query: ${query}`);
                fetchedCategories = await CategoryService.getCategoriesByNameContaining(query, page, pageSize);
            } else {
                fetchedCategories = await CategoryService.getAllCategories(page, pageSize);
            }
            console.log('Fetched categories:', fetchedCategories);
            setCategories(fetchedCategories.content);
            setTotalItems(fetchedCategories.totalElements);
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
        console.log(`Searching for: ${query}`);
        setSearchQuery(query);
        setCurrentPage(1);
    };

    const handleEdit = async (categoryId: number) => {
        const row = document.getElementById(`category-${categoryId}`);
        if (!row) return;

        const input = row.querySelector('input') as HTMLInputElement;
        const saveButton = row.querySelector('.save') as HTMLButtonElement;

        if (saveButton.textContent === 'Editar') {
            if (input) input.disabled = false;
            saveButton.textContent = 'Guardar';
        } else if (saveButton.textContent === 'Guardar') {
            if (input) {
                const categoryName = input.value;
                console.log(`Saving category with ID: ${categoryId} and name: ${categoryName}`);
                input.disabled = true;
                try {
                    await CategoryService.updateCategory(categoryId, { name: categoryName });
                    toast.success('Categoria actualizada correctamente');
                    fetchData(currentPage, pageSize, searchQuery);
                } catch (error) {
                    console.error('Error updating category:', error);
                    toast.error('Error al actualizar la categoria');
                }
                saveButton.textContent = 'Editar';
            }
        }
    };

    const handleOpenDialog = (categoryId: number) => {
        setCategoryIdToDelete(categoryId);
        setIsDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (categoryIdToDelete !== null) {
            try {
                await CategoryService.deleteCategory(categoryIdToDelete);
                toast.success('Categoria eliminada correctamente');
                fetchData(currentPage, pageSize, searchQuery);
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error('Error al eliminar la categoria');
            }
            setIsDialogOpen(false);
            setCategoryIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDialogOpen(false);
        setCategoryIdToDelete(null);
    };

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateCategory = async (name: string) => {
        try {
            await CategoryService.addCategory({ name });
            toast.success('Categoria creada correctamente');
            fetchData(currentPage, pageSize, searchQuery);
        } catch (error) {
            console.error('Error creating category:', error);
            toast.error('Error al crear la categoria');
        }
        handleCloseCreateModal();
    };

    return (
        <div className="w-full flex items-center justify-center p-16">
            {isLoading ? (
                <p>Loading categories...</p>
            ) : error ? (
                <p>Error fetching categories: {error.message}</p>
            ) : (
                <div className='w-4/5'>
                    <div className="flex items-center justify-between mb-4">
                        <button
                            className="w-48 p-3 bg-lime-500 rounded-full hover:bg-lime-600"
                            onClick={handleOpenCreateModal}
                        >
                            Crear Categorias
                        </button>
                        <SearchButtonNav
                            placeholder="Buscar una categoria..."
                            inputId="category-search"
                            onSearch={handleSearch}
                        />
                    </div>
                    <CategoryTable
                        categories={categories}
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
                            ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.
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
                <ModalCreateCategory
                    onClose={handleCloseCreateModal}
                    onCreate={handleCreateCategory}
                />
            )}
        </div>
    );
};

export default CategoriesPage;
