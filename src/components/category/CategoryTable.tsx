import React, { useState } from 'react';
import { Category } from '@/types/categoria/types';
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
import { Input } from "@/components/ui/input";

interface CategoryTableProps {
    categories: Category[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (newSize: number) => void;
    onEdit: (categoryId: number, newName: string) => void; 
    onDelete: (categoryId: number) => void; 
}

const CategoryTable: React.FC<CategoryTableProps> = ({ 
    categories, 
    currentPage, 
    pageSize, 
    totalItems, 
    onPageChange, 
    onPageSizeChange,
    onEdit,
    onDelete
}) => {
    const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, categoryId?: number) => {
        if (categoryId !== undefined) {
            setInputValue(e.target.value);
        }
    };

    const handleSave = (categoryId: number) => {
        if (inputValue.trim()) {
            onEdit(categoryId, inputValue);
            setEditingCategoryId(null);
        }
    };

    const handleEditClick = (categoryId: number, currentName: string) => {
        setEditingCategoryId(categoryId);
        setInputValue(currentName);
    };

    return (
        <Table>
            <TableCaption>Lista de categorias</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.map((category) => (
                    <TableRow 
                        key={category.id} 
                        id={`category-${category.id}`}
                    >
                        <TableCell>
                            <Input 
                                type="text" 
                                value={editingCategoryId === category.id ? inputValue : category.name} 
                                onChange={(e) => handleInputChange(e, category.id)} 
                                disabled={editingCategoryId !== category.id} 
                            />
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                {editingCategoryId === category.id ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                if (category.id !== undefined) {
                                                    handleSave(category.id);
                                                }
                                            }}
                                            className="save px-2 py-1 text-sm bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-all duration-200"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditingCategoryId(null)}
                                            className="px-2 py-1 text-sm bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                if (category.id !== undefined) {
                                                    handleEditClick(category.id, category.name);
                                                }
                                            }}
                                            className="save px-2 py-1 text-sm bg-indigo-700 text-white rounded-full hover:bg-indigo-900 transition-all duration-200"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (category.id !== undefined) {
                                                    onDelete(category.id);
                                                }
                                            }}
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
                    <TableCell colSpan={2}>
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex-1 text-center md:text-left">
                                Mostrando {(currentPage - 1) * pageSize + 1} -{" "}
                                {Math.min(currentPage * pageSize, totalItems)} de {totalItems} categorias
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

export default CategoryTable;
