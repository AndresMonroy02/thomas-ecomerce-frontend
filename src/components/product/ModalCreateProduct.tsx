import React, { useState, useEffect } from 'react';
import { Product } from '@/types/product/types';
import { Category } from '@/types/category/types';
import { toast } from 'react-toastify';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import CategoryService from '@/service/CategoryService';

interface ModalCreateProductProps {
    onClose: () => void;
    onProductCreated: (product: Product) => void; // Callback to handle the created product
}

const initialProduct: Omit<Product, 'id'> = {
    name: '',
    description: '',
    price: 0,
    img: null,
    state: true,
    categories: [],
};

const ModalCreateProduct: React.FC<ModalCreateProductProps> = ({ onClose, onProductCreated }) => {
    const [product, setProduct] = useState<Omit<Product, 'id'>>(initialProduct);
    const [query, setQuery] = useState('');
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (query.trim() !== '') {
                try {
                    console.log(`Fetching categories with query: ${query}`);
                    const response = await CategoryService.getCategoriesByNameContaining(query);
                    setFetchedCategories(response.content); // Adjust based on your API response structure
                } catch (error) {
                    console.error('Error fetching categories:', error);
                    toast.error('Error fetching categories');
                }
            } else {
                setFetchedCategories([]);
            }
        };
        fetchCategories();
    }, [query]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setProduct(prev => ({ ...prev, [name]: checked }));
    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleCategorySelect = (category: Category) => {
        setSelectedCategories(prev => {
            if (!prev.some(c => c.id === category.id)) {
                return [...prev, category];
            }
            return prev;
        });
    };

    const handleCategoryRemove = (categoryId: number) => {
        setSelectedCategories(prev => prev.filter(c => c.id !== categoryId));
    };

    const handleSubmit = () => {
        // Validate fields
        if (product.name && product.description && product.price > 0) {
            // Format product data to match the expected structure
            const productToCreate = {
                name: product.name,
                description: product.description,
                price: parseFloat(String(product.price)), 
                img: product.img || null,
                state: product.state,
                categories: selectedCategories.map(category => ({
                    id: category.id,
                    name: category.name
                })),
                id: 0, // Provide a default value for the id property
            };
    
            console.log('Product to be created:', productToCreate);
            onProductCreated(productToCreate);
            onClose();
        } else {
            toast.error('Todos los campos son obligatorios y el precio debe ser mayor a 0');
        }
    };
    

    return (
        <AlertDialog open onOpenChange={onClose}>
            <AlertDialogContent className="max-w-4xl max-h-screen overflow-auto p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle>Crear Producto</AlertDialogTitle>
                    <AlertDialogDescription>
                        Llena la información del nuevo producto.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={product.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={product.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={product.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="img"
                        placeholder="Imagen (URL)"
                        value={product.img || ''}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="state"
                            checked={product.state}
                            onChange={handleCheckboxChange}
                            className="form-checkbox"
                        />
                        <span>Activo</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Buscar categorías"
                        value={query}
                        onChange={handleQueryChange}
                        className="w-full p-2 border rounded"
                    />
                    {fetchedCategories.length > 0 && (
                        <ul className="max-h-40 overflow-auto border rounded">
                            {fetchedCategories.map(category => (
                                <li
                                    key={category.id}
                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleCategorySelect(category)}
                                >
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="space-y-2">
                        {selectedCategories.map(category => (
                            <div key={category.id} className="flex items-center justify-between p-2 bg-gray-200 rounded">
                                <span>{category.name}</span>
                                <button
                                    onClick={() => handleCategoryRemove(category.id as number)}
                                    className="px-2 py-1 text-sm font-medium text-white bg-red-500 rounded-full hover:bg-red-700 transition-all duration-200"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <AlertDialogFooter>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-all duration-200"
                    >
                        Crear
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalCreateProduct;
