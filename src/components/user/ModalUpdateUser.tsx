import React, { useState } from 'react';
import { User } from '@/types/user/types';
import { toast } from 'react-toastify';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import UserService from '@/service/UserService';

interface ModalUpdateUserProps {
    user: User;
    onClose: () => void;
    onUserUpdated: (user: User) => void;
}
interface UserUpdate{
    email: string;
    name: string;
    role: string;      
}

const ModalUpdateUser: React.FC<ModalUpdateUserProps> = ({ user, onClose, onUserUpdated }) => {
    const [updatedUser, setUpdatedUser] = useState<User>({ ...user });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const userUpdate: UserUpdate = {
                    email: updatedUser.email,
                    name: updatedUser.name,
                    role: updatedUser.role
                };
                await UserService.updateUser(updatedUser.id, userUpdate, token);
                toast.success('User updated successfully');
                onUserUpdated(updatedUser);
                onClose();
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Error updating user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle>Update User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Update the details of the user.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={updatedUser.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={updatedUser.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    {/* Add more fields if necessary */}
                </div>
                <AlertDialogFooter>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-4 py-2 text-sm font-medium bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all duration-200"
                    >
                        {loading ? 'Updating...' : 'Update'}
                    </button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalUpdateUser;
