import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '@/service/UserService';

interface ProfileInfo {
    id?: number;
    name?: string;
    email?: string;
    city?: string;
    role?: string;
}

const ProfilePage: React.FC = () => {
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>({});

    useEffect(() => {
        fetchProfileInfo();
    }, []);

    const fetchProfileInfo = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await UserService.getYourProfile(token || '');
        setProfileInfo(response);
        } catch (error) {
        console.error('Error fetching profile information:', error);
        }
    };

    return (
        <div className="profile-page-container">
        <h2>Profile Information</h2>
        <p>Name: {profileInfo.name}</p>
        <p>Email: {profileInfo.email}</p>
        <p>City: {profileInfo.city}</p>
        {profileInfo.role === "ADMIN" && (
            <button>
            <Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link>
            </button>
        )}
        </div>
    );
    }

export default ProfilePage;
