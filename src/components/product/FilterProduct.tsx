import React, { useState, useEffect } from 'react';
import { Category } from '@/types/category/types';
import CategoryService from '@/service/CategoryService';
import { Badge } from '@/components/ui/badge';

interface ProductFilterProps {
    onFilterChange: (filters: { minPrice?: number; maxPrice?: number; categories?: string; name?: string; description?: string }) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ onFilterChange }) => {
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [query, setQuery] = useState('');
    const [fetchedCategories, setFetchedCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (query.trim() !== '') {
                try {
                    const response = await CategoryService.getCategoriesByNameContaining(query);
                    setFetchedCategories(response.content); // Adjust based on your API response structure
                } catch (error) {
                    console.error('Error fetching categories:', error);
                }
            } else {
                setFetchedCategories([]);
            }
        };
        fetchCategories();
    }, [query]);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleCategorySelect = (category: Category) => {
        setSelectedCategories(prev => [...prev, category.name || '']);
    };

    const handleCategoryRemove = (categoryName: string) => {
        setSelectedCategories(prev => prev.filter(name => name !== categoryName));
    };

    const handleFilterChange = () => {
        onFilterChange({
            minPrice,
            maxPrice,
            categories: selectedCategories.join(','), // Convert array to comma-separated string
            name,
            description,
        });
    };

    return (
        <div className="w-full flex flex-col gap-2 mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex flex-col w-full md:w-1/4">
                    <label className="mb-2 text-sm font-medium">Precio Mínimo</label>
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice ?? ''}
                        onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                        className="p-1 border rounded mb-2 text-sm"
                    />
                    <label className="mb-2 text-sm font-medium">Precio Máximo</label>
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice ?? ''}
                        onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                        className="p-1 border rounded mb-2 text-sm"
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/4">
                    <label className="mb-2 text-sm font-medium">Nombre</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-1 border rounded mb-2 text-sm"
                    />
                    <label className="mb-2 text-sm font-medium">Descripción</label>
                    <input
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-1 border rounded mb-2 text-sm"
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/4">
                    <label className="mb-2 text-sm font-medium">Buscar Categorías</label>
                    <input
                        type="text"
                        placeholder="Buscar categorías"
                        value={query}
                        onChange={handleQueryChange}
                        className="w-full p-1 border rounded mb-2 text-sm"
                    />
                    {fetchedCategories.length > 0 && (
                        <ul className="max-h-40 overflow-auto border rounded mb-2 text-sm">
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
                </div>
                <div className="flex flex-col w-full md:w-1/4">
                    <button
                        onClick={handleFilterChange}
                        className="bg-lime-500 text-white py-2 px-4 rounded hover:bg-lime-600 text-sm"
                    >
                        Filtrar
                    </button>
                </div>
            </div>

            {selectedCategories.length > 0 && (
                <div className="w-full mt-2 mb-3">
                    <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category, index) => (
                            <Badge key={index} variant="outline" className="text-sm">
                                {category}
                                <button
                                    onClick={() => handleCategoryRemove(category)}
                                    className="ml-2 text-red-500 hover:text-red-700"
                                >
                                    X
                                </button>
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilter;
