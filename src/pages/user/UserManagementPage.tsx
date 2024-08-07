import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '@/service/UserService';

interface User {
    id?: number;
    email: string;
    password: string;
    [key: string]: any;
}

const UserManagementPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            if (token) {
                const response = await UserService.getAllUsers(token);
                console.log('Users:', response);
                setUsers(response);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const deleteUser = async (userId: number) => {
        try {
            const confirmDelete = window.confirm('Are you sure you want to delete this user?');
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            if (confirmDelete && token) {
                await UserService.deleteUser(userId, token);
                fetchUsers();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="user-management-container">
        <h2>Users Management Page</h2>
        <button className="reg-button"><Link to="/register">Add User</Link></button>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => (
                <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <button className="delete-button" onClick={() => user.id && deleteUser(user.id)}>Delete</button>
                    <button>
                    <Link to={`/update-user/${user.id}`}>Update</Link>
                    </button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

export default UserManagementPage;
