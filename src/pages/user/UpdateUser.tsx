import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../../service/UserService';



interface UserData {
    name: string;
    email: string;
    role: string;
    city: string;
}

const UpdateUser: React.FC = () => {
    const navigate = useNavigate();
    const { userId } = useParams<{ userId: string }>();

    const [userData, setUserData] = useState<UserData>({
        name: '',
        email: '',
        role: '',
        city: ''
    });

    useEffect(() => {
        if (userId) {
        fetchUserDataById(userId); // Pass the userId to fetchUserDataById
        }
    }, [userId]); // Whenever there is a change in userId, run this

    const fetchUserDataById = async (userId: string) => {
        try {
        const token = localStorage.getItem('token');
            if (token) {
                const response = await UserService.getUserById(Number(userId), token); 
                const { name, email, role, city } = response;
                setUserData({ name, email, role, city });
            }
        } catch (error) {
        console.error('Error fetching user data:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this user?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                if (token) {
                const res = await UserService.updateUser(Number(userId), { ...userData, password: '' }, token);
                console.log(res);
                // Redirect to profile page or display a success message
                navigate("/admin/user-management");
                }
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
            alert('Error updating user profile');
        }
    };

    return (
        <div className="auth-container">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={userData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={userData.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                <label>Role:</label>
                <input type="text" name="role" value={userData.role} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                <label>City:</label>
                <input type="text" name="city" value={userData.city} onChange={handleInputChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateUser;
