import ProductCard from "@/components/product/Product";

const ProductsPage: React.FC = () => {
    const products = [
        {
        title: "Product 1",
        description: "Description for Product 1",
        price: "$29.99",
        imageSrc: "/product1.jpg",
        },
        {
        title: "Product 2",
        description: "Description for Product 2",
        price: "$49.99",
        imageSrc: "/product2.jpg",
        },
        // Add more products as needed
    ];

    return (
        <div className="w-full flex items-center justify-center p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                <ProductCard key={product.title} {...product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;