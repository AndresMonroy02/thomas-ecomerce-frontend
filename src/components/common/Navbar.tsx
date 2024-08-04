import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';   

import { Button } from '@/components/ui/button';
import { NavLinks } from '@/components/common/nav-links';

const Navbar: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
    const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());
    const params = useParams<{ platform: string; feature: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            setIsAuthenticated(UserService.isAuthenticated());
            setIsAdmin(UserService.isAdmin());
        };
        checkAuth();
    }, [isAuthenticated, isAdmin]);

    const handleLogout = (): void => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
            setIsAuthenticated(false);
            setIsAdmin(false);
            navigate('/');
        }
    };

    return (
        <header className="z-50 sticky top-0 flex h-[100px] border-b md:border-transparent md:h-[72px] bg-background">
            <div className="w-full grid grid-cols-[min-content_auto_min-content] grid-rows-[1fr_auto] items-center gap-x-2 md:grid-cols-[1fr_minmax(auto,500px)_1fr] lg:grid-rows-1 marge-x">
                <div className="flex items-center gap-7 pl-10">
                    <Link className="flex items-center" to="/products">
                        <span className="text-lg font-semibold">Thomas ecomerce</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-5">
                        <NavLinks />
                    </div>
                </div>

                <div className="overflow-hidden px-1 py-2">
                    {/* <SearchButtonNav /> */}
                </div>

                <div className="shrink-0 items-end pr-10">
                    <div className="flex flex-row items-center justify-end gap-3">
                        <div className="hidden lg:flex flex-row items-center gap-3">
                            {isAuthenticated && (
                                <Link
                                    to={`/${params.feature || ''}`}
                                    className={'profile' === `${params.platform}`
                                        ? "text-primary" // Adjust class names for your styling
                                        : "text-muted-foreground hover:text-primary"}
                                >
                                    Perfil
                                </Link>
                            )}
                            {isAdmin && (
                                <>
                                    <Link
                                        to={`/${params.feature || ''}`}
                                        className={'user-manage' === `${params.platform}`
                                            ? "text-primary" // Adjust class names for your styling
                                            : "text-muted-foreground hover:text-primary"}
                                    >
                                        Manejar usuarios
                                    </Link>
                                </>
                            )}
                            <Button variant="default" size="lg" asChild>
                                {isAuthenticated ? (
                                    <li>
                                        <Link to="/" onClick={handleLogout}>Logout</Link>
                                    </li>
                                ) : (
                                    <Link className="flex items-center" to="/login">
                                        <span className="text-lg font-semibold">Login</span>
                                    </Link>
                                )}
                            </Button>
                        </div>
                        {/* <NavMenu /> */}
                    </div>
                </div>

                <div className="col-span-full row-start-2 flex md:hidden">
                    <div className="flex items-center py-1 md:py-0 h-11 md:h-[unset] gap-x-4 md:gap-x-6">
                        {/* <NavLinks /> */}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
