import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductCard from '@/components/product/Product';
import ProductService from '@/service/ProductService'; 
import { Product } from '@/types/product/types'; 
import { Page } from '@/types/types';
import ProductFilter from '@/components/product/FilterProduct'; // Import your filter component

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [filters, setFilters] = useState<{ minPrice?: number; maxPrice?: number; categories?: string[]; name?: string; description?: string }>({});
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        loadProducts(page, filters);
    }, [page, filters]);

    const loadProducts = async (page: number, filters: any) => {
        if (loading) return; // Prevent further calls while loading
        setLoading(true); // Set loading state

        try {
            const data: Page<Product> = await ProductService.filterProducts(page, size, filters.minPrice, filters.maxPrice, filters.categories, filters.name, filters.description);
            console.log('Loaded products:', data);

            setProducts((prevProducts) => {
                // Combine previous products with new ones
                const allProducts = [...prevProducts, ...data.content];

                // Deduplicate products
                const uniqueProducts = Array.from(new Set(allProducts.map(product => product.id)))
                    .map(id => allProducts.find(product => product.id === id))
                    .filter((product): product is Product => product != null);

                return uniqueProducts;
            });

            setHasMore(data.totalPages > page);
        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    const handleFilterChange = (newFilters: { minPrice?: number; maxPrice?: number; categories?: string[]; name?: string; description?: string }) => {
        setFilters(newFilters);
        setPage(1); // Reset page to 1 when filters change
        setProducts([]); // Clear products when filters change
    };

    return (
        <div className="w-full flex flex-col items-center p-16">
            <ProductFilter onFilterChange={handleFilterChange} />
            <InfiniteScroll
                dataLength={products.length}
                next={() => setPage(page + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p className='mt-8'>No hay más Productos</p>}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id} // Ensure each product id is unique
                            name={product.name}
                            img={product.img}
                            categories={product.categories}
                            description={product.description}
                            price={product.price}
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default ProductsPage;
