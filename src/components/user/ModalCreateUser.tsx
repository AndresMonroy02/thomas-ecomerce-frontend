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

interface ModalCreateUserProps {
    onClose: () => void;
    onUserCreated: (user: User) => void;
}

const ModalCreateUser: React.FC<ModalCreateUserProps> = ({ onClose, onUserCreated }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER'); // Default role
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const newUser: User = { name, email, password, role };
                console.log( newUser );
                const response = await UserService.register(newUser, token);
                onUserCreated(response);
                toast.success('User created successfully');
                onClose();
            }
        } catch (error) {
            console.error('Error creating user:', error);
            toast.error('Error creating user');
            setError('Error creating user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AlertDialog open onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md p-6">
                <AlertDialogHeader>
                    <AlertDialogTitle>Create New User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Fill in the details to create a new user.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-2 border rounded"
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <AlertDialogFooter>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200"
                        >
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ModalCreateUser;
