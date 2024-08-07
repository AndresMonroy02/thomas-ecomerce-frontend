import React from 'react';
import { User } from '@/types/user/types';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface UserTableProps {
    users: User[];
    onDelete: (userId: number) => void;
    onEdit: (user: User) => void; // Added onEdit prop
}

const UserTable: React.FC<UserTableProps> = ({ users, onDelete, onEdit }) => {
    return (
        <Table>
            <TableCaption>Lista de usuarios</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => user.id && onDelete(user.id)}
                                        className="delete-button px-2 py-1 text-sm bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={() => onEdit(user)}
                                        className="update-button px-2 py-1 text-sm bg-indigo-700 text-white rounded-full hover:bg-indigo-900 transition-all duration-200"
                                    >
                                        Actualizar
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4}>No users found</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default UserTable;
