import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "@/service/UserService";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();
    const loggedIn = UserService.isAuthenticated();
    useEffect(() => {
        if (loggedIn) {
            navigate('/products');
        }
    }, [loggedIn, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const userData = await UserService.login(email, password);
            console.log(userData);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                navigate('/products');
                window.location.reload();
            } else {
                setError(userData.message);
            }
        } catch (error: any) {
            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    };

    return (
        <div className="w-full flex items-center justify-center p-24">
            <div className="grid w-1/2 h-full grid-cols-1 bg-white box-anim">
                <div className="bg-[#c2c2c2] text-dark flex items-center justify-center flex-col p-16 rounded-md">
                    <div className="my-4">
                        <h1 className="text-3xl font-semibold ">Login</h1>
                        <p className="mt-2 text-xs text-slate-800">
                            Thomas e-comerce
                        </p>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <Label htmlFor="email">Email*</Label>
                        <Input
                            className="mt-2 mb-4 bg-transparent rounded-full"
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Label htmlFor="password">Password*</Label>
                        <Input
                            className="mt-2 bg-transparent rounded-full"
                            type="password"
                            id="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            className="w-full mt-6 bg-lime-500 rounded-full hover:bg-lime-700"
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
