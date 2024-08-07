import React, { useState } from 'react';
import { OrderDto } from '@/types/order/type'; // Adjust the import path based on your file structure
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

interface OrderTableProps {
    orders: OrderDto[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (newSize: number) => void;
    onEdit: (orderId: number, updatedOrder: Partial<OrderDto>) => void; 
    onDelete: (orderId: number) => void; 
}

const OrderTable: React.FC<OrderTableProps> = ({ 
    orders, 
    currentPage, 
    pageSize, 
    totalItems, 
    onPageChange, 
    onPageSizeChange,
    onEdit,
    onDelete
}) => {
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [inputValues, setInputValues] = useState<PartialOrder>({});

    interface PartialOrder extends Partial<OrderDto> {
        [key: number]: Partial<OrderDto>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, orderId: number, field: keyof OrderDto) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [orderId]: {
                ...prevValues[orderId],
                [field]: e.target.value
            }
        }));
    };

    const handleStatusChange = (value: string, orderId: number) => {
        setInputValues((prevValues) => ({
            ...prevValues,
            [orderId]: {
                ...prevValues[orderId],
                state: value
            }
        }));
    };

    const handleSave = (orderId: number) => {
        if (inputValues[orderId]) {
            onEdit(orderId, inputValues[orderId]);
            setEditingOrderId(null);
            setInputValues((prevValues) => ({
                ...prevValues,
                [orderId]: {}
            }));
        }
    };

    const handleEditClick = (orderId: number, order: OrderDto) => {
        setEditingOrderId(orderId);
        setInputValues((prevValues) => ({
            ...prevValues,
            [orderId]: order
        }));
    };

    return (
        <Table>
            <TableCaption>Lista de pedidos</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Fecha de Inicio</TableHead>
                    <TableHead>Fecha de Fin</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                    <TableRow 
                        key={order.id} 
                        id={`order-${order.id}`}
                    >
                        <TableCell>{order.username}</TableCell>
                        <TableCell>{order.name}</TableCell>
                        <TableCell>{order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>{new Date(order.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{order.endDate ? new Date(order.endDate).toLocaleDateString() : 'N/A'}</TableCell>
                        <TableCell>
                            <Select 
                                value={editingOrderId === order.id ? inputValues[order.id]?.state || order.state : order.state} 
                                onValueChange={(value) => handleStatusChange(value, order.id)} 
                                disabled={editingOrderId !== order.id}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={order.state} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="PROCESSING">Processing</SelectItem>
                                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                {editingOrderId === order.id ? (
                                    <>
                                        <button
                                            onClick={() => handleSave(order.id)}
                                            className="save px-2 py-1 text-sm bg-lime-500 text-white rounded-full hover:bg-lime-600 transition-all duration-200"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditingOrderId(null)}
                                            className="px-2 py-1 text-sm bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditClick(order.id, order)}
                                            className="save px-2 py-1 text-sm bg-indigo-700 text-white rounded-full hover:bg-indigo-900 transition-all duration-200"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => onDelete(order.id)}
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
                    <TableCell colSpan={7}>
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex-1 text-center md:text-left">
                                Mostrando {(currentPage - 1) * pageSize + 1} -{" "}
                                {Math.min(currentPage * pageSize, totalItems)} de {totalItems} pedidos
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

export default OrderTable;
