import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/categoria/types";

export default function ProductCard({ title, description, price, imageSrc }: Product) {
    return (
        <Card className="w-full max-w-2xl overflow-hidden rounded-lg shadow-md">
            <img
                src={imageSrc}
                alt="Product Image"
                width={400}
                height={400}
                className="w-full h-48 object-cover"
                style={{ aspectRatio: "400/400", objectFit: "cover" }}
            />
            <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-muted-foreground">{description}</p>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-lg mt-1 pr-3 font-bold">{price}</span>
                    <Button 
                        className="w-full mt-1 bg-lime-500 rounded-full hover:bg-lime-600"
                    >Añadi al carrito</Button>
                </div>
            </CardContent>
        </Card>
    );
}
