import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '@/service/UserService';
import { User } from '@/types/user/types';
import UserTable from '@/components/user/UserTable';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'react-toastify';
import ModalUpdateUser from '@/components/user/ModalUpdateUser';
import ModalCreateUser from '@/components/user/ModalCreateUser'; 

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // New state for the create modal
    const [userIdToDelete, setUserIdToDelete] = useState<number | null>(null);
    const [userToUpdate, setUserToUpdate] = useState<User | null>(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await UserService.getAllUsers(token);
                setUsers(response);
                setError(null);
            }
        } catch (error) {
            setError('Error fetching users.');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = (userId: number) => {
        setUserIdToDelete(userId);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (userIdToDelete !== null) {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    await UserService.deleteUser(userIdToDelete, token);
                    toast.success('User deleted successfully');
                    fetchUsers();
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Error deleting user');
            }
            setIsDeleteDialogOpen(false);
            setUserIdToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteDialogOpen(false);
        setUserIdToDelete(null);
    };

    const handleUpdateUser = (user: User) => {
        setUserToUpdate(user);
        setIsUpdateModalOpen(true);
    };

    const handleUserUpdated = (updatedUser: User) => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    };

    const handleUserCreated = (user: User) => {
        setUsers([...users, user]);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="w-full flex flex-col items-center p-16">
            <div className="user-management-container">
                <h2>User Management Page</h2>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-200"
                    >
                        Add User
                    </button>
                </div>
                <UserTable users={users} onDelete={deleteUser} onEdit={handleUpdateUser} />
            </div>

            {/* Confirmation Dialog for Deletion */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this user? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <button
                            onClick={handleCancelDelete}
                            className="px-4 py-2 text-sm font-medium bg-gray-500 text-white rounded-full hover:bg-gray-700 transition-all duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmDelete}
                            className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200"
                        >
                            Delete
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Modals */}
            {isCreateModalOpen && (
                <ModalCreateUser
                    onClose={() => setIsCreateModalOpen(false)}
                    onUserCreated={handleUserCreated}
                />
            )}

            {userToUpdate && (
                <ModalUpdateUser
                    user={userToUpdate}
                    onClose={() => setIsUpdateModalOpen(false)}
                    onUserUpdated={handleUserUpdated}
                />
            )}
        </div>
    );
};

export default UserManagementPage;
