import React, { useState } from 'react';
import { Product } from '@/types/product/types'; // Adjust the import path based on your file structure
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

interface ProductTableProps {
    products: Product[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (newSize: number) => void;
    onEdit: (productId: number, updatedProduct: Partial<Product>) => void; 
    onDelete: (productId: number) => void; 
}

const ProductTable: React.FC<ProductTableProps> = ({ 
    products, 
    currentPage, 
    pageSize, 
    totalItems, 
    onPageChange, 
    onPageSizeChange,
    onEdit,
    onDelete
}) => {
    const [editingProductId, setEditingProductId] = useState<number | null>(null);
    const [inputValues, setInputValues] = useState<PartialProduct>({});
    // Add index signature to Partial<Product> type
    interface PartialProduct extends Partial<Product> {
        [key: number]: Partial<Product>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, productId: number, field: keyof Product) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [productId]: {
                ...prevValues[productId],
                [field]: e.target.value
            }
        }));
    };

    const handleCheckChange = (checked: boolean, productId: number, field: 'state') => {
        console.log(`Checkbox state: ${checked}`); // Log the state
        setInputValues(prevValues => {
            console.log('Previous Values:', prevValues); // Log previous state
            const updatedValues = {
                ...prevValues,
                [productId]: {
                    ...prevValues[productId],
                    [field]: checked
                }
            };
            console.log('Updated Values:', updatedValues); // Log updated state
            return updatedValues;
        });
    };
    
    

    const handleSave = (productId: number) => {
        if (inputValues[productId]) {
            onEdit(productId, inputValues[productId]);
            setEditingProductId(null);
            setInputValues((prevValues) => ({
                ...prevValues,
                [productId]: {}
            }));
        }
    };

    const handleEditClick = (productId: number, product: Product) => {
        setEditingProductId(productId);
        setInputValues((prevValues) => ({
            ...prevValues,
            [productId]: product
        }));
    };

    return (
        <Table>
            <TableCaption>Lista de productos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow 
                        key={product.id} 
                        id={`product-${product.id}`}
                    >
                        <TableCell>
                            <Input 
                                type="text" 
                                value={editingProductId === product.id ? inputValues[product.id]?.name || product.name : product.name} 
                                onChange={(e) => handleInputChange(e, product.id, 'name')} 
                                disabled={editingProductId !== product.id} 
                            />
                        </TableCell>
                        <TableCell>
                            <Input 
                                type="text" 
                                value={editingProductId === product.id ? inputValues[product.id]?.description || product.description : product.description} 
                                onChange={(e) => handleInputChange(e, product.id, 'description')} 
                                disabled={editingProductId !== product.id} 
                            />
                        </TableCell>
                        <TableCell>
                            <Input 
                                type="number" 
                                value={editingProductId === product.id ? inputValues[product.id]?.price || product.price : product.price} 
                                onChange={(e) => handleInputChange(e, product.id, 'price')} 
                                disabled={editingProductId !== product.id} 
                            />
                        </TableCell>
                        <TableCell>
                            <Input 
                                type="text" 
                                value={editingProductId === product.id ? (inputValues[product.id]?.img ?? product.img ?? '') : (product.img ?? '')} 
                                onChange={(e) => handleInputChange(e, product.id, 'img')} 
                                disabled={editingProductId !== product.id} 
                            />
                        </TableCell>
                        <TableCell>
                            <Checkbox 
                                id={`checkbox-${product.id}`} 
                                checked={editingProductId === product.id ? inputValues[product.id]?.state || product.state : product.state} 
                                onCheckedChange={(checked) => handleCheckChange(Boolean(checked), product.id, 'state')} 
                                disabled={editingProductId !== product.id} 
                            />
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                {editingProductId === product.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(product.id)}
                                            className="save px-2 py-1 text-sm bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-all duration-200"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditingProductId(null)}
                                            className="px-2 py-1 text-sm bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(product.id, product)}
                                            className="save px-2 py-1 text-sm bg-indigo-700 text-white rounded-full hover:bg-indigo-900 transition-all duration-200"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="delete px-2 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <tfoot>
                <TableRow>
                    <TableCell colSpan={6}>
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex-1 text-center md:text-left">
                                Mostrando {(currentPage - 1) * pageSize + 1} -{" "}
                                {Math.min(currentPage * pageSize, totalItems)} de {totalItems} productos
                            </div>
                            <div className="flex-1 flex justify-center items-center space-x-2 mt-2 md:mt-0">
                                <button
                                    onClick={() => onPageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-2 py-1 text-sm bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-all duration-200"
                                >
                                    Anterior
                                </button>
                                <button
                                    onClick={() => onPageChange(currentPage + 1)}
                                    disabled={currentPage * pageSize >= totalItems}
                                    className="px-2 py-1 text-sm bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-all duration-200"
                                >
                                    Siguiente
                                </button>
                            </div>
                            <div className="flex-1 flex justify-end mt-2 md:mt-0">
                                <div className="w-24">
                                    <Select onValueChange={(value) => onPageSizeChange(parseInt(value))}>
                                        <SelectTrigger>
                                            <SelectValue placeholder={pageSize.toString()} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="5">5</SelectItem>
                                            <SelectItem value="10">10</SelectItem>
                                            <SelectItem value="15">15</SelectItem>
                                            <SelectItem value="25">25</SelectItem>
                                            <SelectItem value="50">50</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            </tfoot>
        </Table>
    );
};

export default ProductTable;
