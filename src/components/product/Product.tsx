import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category } from "@/types/category/types";
import defaultProductImage from '@/assets/default-product-image.png';

interface ProductCardProps {
    name: string;
    description: string;
    price: number;
    img: string | null;
    categories: Category[];
}

export default function ProductCard({ name, description, price, img, categories }: ProductCardProps) {
    return (
        <Card className="w-full max-w-2xl overflow-hidden rounded-lg shadow-md flex flex-col">
            <img
                src={img ?? defaultProductImage} // Provide a default image if null
                alt="Product Image"
                width={400}
                height={400}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400/400", objectFit: "cover" }}
            />
            <CardContent className="flex-1 p-6 space-y-4">
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-lg mt-1 pr-3 font-bold">${price.toFixed(2)}</span>
                    <Button 
                        className="w-full mt-1 bg-lime-500 rounded-full hover:bg-lime-600"
                    >
                        Añadir al carrito
                    </Button>
                </div>
            </CardContent>
            <div className="p-6 text-sm text-gray-600 bg-gray-100">
                {categories.map((category) => (
                    <span key={category.id} className="block mb-1">{category.name}</span>
                ))}
            </div>
        </Card>
    );
}
